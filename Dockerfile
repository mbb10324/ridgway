# ==================================================================================================
# Local dev image
#   Mirrors infra/cDSO/Dockerfile (the production image) stage for stage so problems show up
#   locally instead of in the cDSO pipeline: same Alpine release and Node package (musl, not glibc),
#   same OpenSSL 3.1.2 FIPS provider enforced at startup, no shell or package manager at runtime,
#   UID 1001 with only the standalone app writable, and the same start.mjs entrypoint.
#
#   Differences from production, all for speed or because dev does not need them:
#     - Public alpine base instead of the cDSO approved-base (same Alpine release).
#     - BuildKit cache mounts for npm and the Next.js build cache (Kaniko in cDSO can't use them).
#     - npm comes from npm's registry via npm itself instead of a verified tarball.
#     - NEXT_PUBLIC_PROVIDER_ID defaults to keycloak to match docker-compose.
#
#   When infra/cDSO/Dockerfile changes, make the same change here. The helper files
#   (start.mjs, openssl-fips.cnf, prisma-cli-lock.cjs) are used straight from infra/cDSO.
# ==================================================================================================

# Keep the Alpine release in step with the BASE_IMAGE tag in infra/cDSO/Dockerfile.
ARG BASE_IMAGE=alpine:3.24
ARG NPM_VERSION=12.0.1
ARG OPENSSL_FIPS_VERSION=3.1.2
ARG OPENSSL_FIPS_SHA256=a0ce69b8b97ea6a35b96875235aa453b966ba3cba8af2de23657d8b6767d6539


# ==================================================================================================
# Stage 1: fips
#   Builds the same OpenSSL FIPS provider as production. Slow the first time only; Docker caches
#   this stage until the version changes.
# ==================================================================================================
FROM ${BASE_IMAGE} AS fips

ARG OPENSSL_FIPS_VERSION
ARG OPENSSL_FIPS_SHA256
SHELL ["/bin/ash", "-o", "pipefail", "-c"]
WORKDIR /tmp
RUN apk add --no-cache build-base linux-headers perl && \
    wget -qO openssl.tar.gz "https://github.com/openssl/openssl/releases/download/openssl-${OPENSSL_FIPS_VERSION}/openssl-${OPENSSL_FIPS_VERSION}.tar.gz" && \
    echo "${OPENSSL_FIPS_SHA256}  openssl.tar.gz" | sha256sum -c - && \
    tar -xzf openssl.tar.gz
WORKDIR /tmp/openssl-${OPENSSL_FIPS_VERSION}
RUN ./Configure enable-fips && \
    make -s -j"$(nproc)" && \
    cp providers/fips.so /tmp/fips.so


# ==================================================================================================
# Stage 2: build-base
#   Node from Alpine (same package as the runtime) plus the pinned npm.
# ==================================================================================================
FROM ${BASE_IMAGE} AS build-base

ARG NPM_VERSION
# Install the pinned npm into /usr/local (same place production puts it), then drop Alpine's npm.
RUN apk add --no-cache nodejs npm && \
    npm install -g --prefix /usr/local --no-audit --no-fund "npm@${NPM_VERSION}" && \
    apk del --no-cache npm && hash -r && \
    node --version > /node-version && \
    npm --version

ENV NEXT_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1


# ==================================================================================================
# Stage 3: builder
# ==================================================================================================
FROM build-base AS builder

WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund
COPY . .

ARG SKIP_SERVER_VALIDATION="true"
ENV SKIP_SERVER_VALIDATION=${SKIP_SERVER_VALIDATION}
ARG NEXT_PUBLIC_PROVIDER_ID="keycloak"
ENV NEXT_PUBLIC_PROVIDER_ID=${NEXT_PUBLIC_PROVIDER_ID}
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

RUN --mount=type=cache,target=/app/.next/cache \
    npm run db:generate && \
    npm run build


# ==================================================================================================
# Stage 4: prisma-cli
#   Same isolated Prisma CLI install as production, including the lockfile check, so a lockfile
#   that production would reject fails here too.
# ==================================================================================================
FROM build-base AS prisma-cli

WORKDIR /opt/prisma-cli
COPY package.json package-lock.json /tmp/application/
COPY infra/cDSO/prisma-cli-lock.cjs /tmp/prisma-cli-lock.cjs
RUN --mount=type=cache,target=/root/.npm \
    node /tmp/prisma-cli-lock.cjs prepare /tmp/application . && \
    npm install --package-lock-only --ignore-scripts --omit=dev --no-audit --no-fund && \
    node /tmp/prisma-cli-lock.cjs verify /tmp/application . && \
    npm ci --omit=dev --no-audit --no-fund && \
    rm -f package-lock.json node_modules/.package-lock.json


# ==================================================================================================
# Stage 5: rootfs-build
#   Same as production: Node, CA bundle, FIPS turned on and tested, busybox removed.
# ==================================================================================================
FROM ${BASE_IMAGE} AS rootfs-build

SHELL ["/bin/ash", "-o", "pipefail", "-c"]
COPY --from=build-base /node-version /tmp/node-version
RUN apk upgrade --no-cache && \
    apk add --no-cache nodejs && \
    test "$(node --version)" = "$(cat /tmp/node-version)" && \
    rm /tmp/node-version

COPY --from=fips /tmp/fips.so /usr/lib/ossl-modules/fips.so
COPY infra/cDSO/openssl-fips.cnf /tmp/openssl-fips.cnf
RUN apk add --no-cache openssl && \
    openssl fipsinstall -pedantic -module /usr/lib/ossl-modules/fips.so -out /etc/ssl/fipsmodule.cnf && \
    sed -i 's/^openssl_conf = openssl_init$/openssl_conf = fips_init\nnodejs_conf = fips_init/' /etc/ssl/openssl.cnf && \
    grep -q '^openssl_conf = fips_init$' /etc/ssl/openssl.cnf && \
    grep -q '^nodejs_conf = fips_init$' /etc/ssl/openssl.cnf && \
    cat /tmp/openssl-fips.cnf >> /etc/ssl/openssl.cnf && \
    echo test | openssl sha256 -propquery provider=fips && \
    if echo test | openssl md5 > /dev/null 2>&1; then echo 'md5 must fail in FIPS mode' >&2; exit 1; fi && \
    apk del --no-cache openssl && \
    rm /tmp/openssl-fips.cnf

COPY --from=prisma-cli /opt/prisma-cli /rootfs/opt/prisma-cli
RUN apk add --no-cache --root /rootfs --initdb --no-scripts --keys-dir /etc/apk/keys --repositories-file /etc/apk/repositories nodejs libssl3 ca-certificates-bundle && \
    for pkg in busybox busybox-binsh ssl_client ca-certificates; do \
        apk info --root /rootfs -L "$pkg" | tail -n +2 | grep . | sed 's|^|/rootfs/|' | xargs rm -f; \
    done && \
    awk -v RS= -v ORS='\n\n' '$0 !~ /(^|\n)P:(busybox|busybox-binsh|ssl_client|ca-certificates)\n/' /rootfs/lib/apk/db/installed > /tmp/installed && \
    mv /tmp/installed /rootfs/lib/apk/db/installed && \
    find /rootfs -type d -empty -delete && \
    rm -rf /rootfs/etc/apk /rootfs/lib/apk/db/scripts.tar.gz /rootfs/lib/apk/db/triggers && \
    cp /usr/lib/ossl-modules/fips.so /rootfs/usr/lib/ossl-modules/ && \
    cp /etc/ssl/openssl.cnf /etc/ssl/fipsmodule.cnf /rootfs/etc/ssl/ && \
    cp /etc/os-release /etc/alpine-release /rootfs/etc/ && \
    printf 'root:x:0:0:root:/root:/sbin/nologin\nappuser:x:1001:1001:appuser:/app:/sbin/nologin\n' > /rootfs/etc/passwd && \
    printf 'root:x:0:\nappgroup:x:1001:\n' > /rootfs/etc/group && \
    mkdir -m 1777 /rootfs/tmp && \
    mkdir /rootfs/app && chown 1001:0 /rootfs/app

RUN chroot /rootfs /usr/bin/node --enable-fips -e "\
        const { execFileSync } = require('node:child_process'); \
        const dir = '/opt/prisma-cli/node_modules/@prisma/engines/'; \
        if (require('node:crypto').getFips() !== 1) process.exit(1); \
        for (const f of require('node:fs').readdirSync(dir)) { \
            if (f.endsWith('.so.node')) process.dlopen({ exports: {} }, dir + f); \
            if (f.startsWith('schema-engine')) execFileSync(dir + f, ['--version'], { stdio: 'inherit' }); \
        }"


# ==================================================================================================
# Stage 6: runtime
#   No shell, no curl, no package manager, same as production. To check the app from outside, use
#   node itself, e.g.  docker exec <container> node -e "fetch('http://localhost:3000')..."
# ==================================================================================================
FROM scratch AS runtime

COPY --from=rootfs-build /rootfs /

WORKDIR /app

COPY --from=builder --chown=1001:0 /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY infra/eamsa/cacerts/full-chain.pem ./full-chain.pem
COPY infra/cDSO/start.mjs ./start.mjs

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    NODE_EXTRA_CA_CERTS=/app/full-chain.pem \
    NEXT_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1 \
    OPENSSL_MODULES=/usr/lib/ossl-modules \
    PATH=/opt/prisma-cli/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    NODE_OPTIONS="--enable-fips"

USER 1001
EXPOSE 3000

CMD ["node", "/app/start.mjs"]
