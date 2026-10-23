# ==================================================================================================
# Build arguments
#   Set versions here
# ==================================================================================================

ARG BASE_IMAGE=registry.levelup.cce.af.mil/cdsov2/containers/approved-base/alpine:3.24
ARG NPM_VERSION=12.0.1

# To update, change OPENSSL_FIPS_VERSION and replace this hash with the contents of
#   https://github.com/openssl/openssl/releases/download/openssl-<version>/openssl-<version>.tar.gz.sha256
# (the checksum file published on the OpenSSL release page). Only use a version that has a
# validated FIPS provider; the module is only validated when built from that exact source.
ARG OPENSSL_FIPS_VERSION=3.1.2
ARG OPENSSL_FIPS_SHA256=a0ce69b8b97ea6a35b96875235aa453b966ba3cba8af2de23657d8b6767d6539


# ==================================================================================================
# Stage 1: fips
#   Downloads OpenSSL, verifies it, and builds the FIPS crypto module (fips.so).
#   Only fips.so file is kept; the compiler and source are thrown away.
# ==================================================================================================
FROM ${BASE_IMAGE} AS fips

ARG OPENSSL_FIPS_VERSION
ARG OPENSSL_FIPS_SHA256
# Make the build fail if the checksum fails 
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
#   Installs Node and npm so the later stages can build the app.
#   Used only for building; none of it reaches the final image.
# ==================================================================================================
FROM ${BASE_IMAGE} AS build-base

ARG NPM_VERSION
SHELL ["/bin/ash", "-o", "pipefail", "-c"]
# Verify the npm tarball against the registry's sha512 integrity before installing it.
RUN apk add --no-cache nodejs && \
    wget -qO /tmp/npm.json "https://registry.npmjs.org/npm/${NPM_VERSION}" && \
    wget -qO /tmp/npm.tgz "https://registry.npmjs.org/npm/-/npm-${NPM_VERSION}.tgz" && \
    node -e "const fs = require('node:fs'); const expected = JSON.parse(fs.readFileSync('/tmp/npm.json', 'utf8')).dist.integrity; const actual = 'sha512-' + require('node:crypto').createHash('sha512').update(fs.readFileSync('/tmp/npm.tgz')).digest('base64'); if (actual !== expected) { console.error('npm integrity mismatch', actual, expected); process.exit(1); }" && \
    mkdir -p /usr/local/lib/node_modules && \
    tar -xzf /tmp/npm.tgz -C /tmp && \
    mv /tmp/package /usr/local/lib/node_modules/npm && \
    ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx && \
    rm -f /tmp/npm.json /tmp/npm.tgz && \
    node --version > /node-version && \
    npm --version

# Disable prisma and nextjs from reaching out to the internet for updates or data sharing
ENV NEXT_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1


# ==================================================================================================
# Stage 3: builder
#   Installs the app's dependencies and builds the Next.js app.
#   Only the build output is copied to the final image.
# ==================================================================================================
FROM build-base AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Skip runtime envar validation; defaults to true as Kaniko has trouble setting build-args :/
ARG SKIP_SERVER_VALIDATION="true"
ENV SKIP_SERVER_VALIDATION=${SKIP_SERVER_VALIDATION}
ARG NEXT_PUBLIC_PROVIDER_ID="eams-a"
ENV NEXT_PUBLIC_PROVIDER_ID=${NEXT_PUBLIC_PROVIDER_ID}
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

RUN npm run db:generate && \
    npm run build


# ==================================================================================================
# Stage 4: prisma-cli
#   Installs the Prisma CLI so the final image can run database migrations.
#   Only the installed CLI is copied to the final image.
# ==================================================================================================
FROM build-base AS prisma-cli

# Prepare a Prisma-only install while preserving application dependency overrides.
# Check every retained version and integrity hash before installing from its lockfile.
WORKDIR /opt/prisma-cli
COPY package.json package-lock.json /tmp/application/
COPY infra/cDSO/prisma-cli-lock.cjs /tmp/prisma-cli-lock.cjs
RUN node /tmp/prisma-cli-lock.cjs prepare /tmp/application . && \
    npm install --package-lock-only --ignore-scripts --omit=dev --no-audit --no-fund && \
    node /tmp/prisma-cli-lock.cjs verify /tmp/application . && \
    npm ci --omit=dev --no-audit --no-fund && \
    rm -f package-lock.json node_modules/.package-lock.json


# ==================================================================================================
# Stage 5: rootfs-build
#   Assembles the final image's filesystem: Node, CA certificates, and the FIPS module
#   turned on and tested. Only /rootfs is copied to the final image.
# ==================================================================================================
FROM ${BASE_IMAGE} AS rootfs-build

SHELL ["/bin/ash", "-o", "pipefail", "-c"]
# Patch OS packages and install the same Node as the build stages.
COPY --from=build-base /node-version /tmp/node-version
RUN apk upgrade --no-cache && \
    apk add --no-cache nodejs && \
    test "$(node --version)" = "$(cat /tmp/node-version)" && \
    rm /tmp/node-version

# Install the FIPS provider, generate its config, and enable it as the default for OpenSSL
# and Node. Fails the build if FIPS is not enforced. The openssl CLI is only needed here.
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

# Assemble /rootfs: install Node and the CA bundle into an empty directory with apk, which also
# writes the package database Syft and Grype read. nodejs depends on a shell and the full
# ca-certificates package; both pull in busybox, so those packages are removed again along with
# their database entries.
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

# Smoke test inside the finished rootfs: Node starts in FIPS mode (so every library is present) and
# both Prisma engines load. A missing library fails the build.
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
#   The final image. Starts from empty (no shell, no package manager) and adds the
#   filesystem from stage 5 and the built app.
# ==================================================================================================
FROM scratch AS runtime

COPY --from=rootfs-build /rootfs /

WORKDIR /app

# Only the standalone application is writable by UID 1001, including its Next.js cache.
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
    PATH=/opt/prisma-cli/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Node reads nodejs_conf = fips_init from /etc/ssl/openssl.cnf; --enable-fips makes startup
# fail if the fips provider cannot be loaded.
# @stig V-222571 | The application must utilize FIPS-validated cryptographic modules when generating cryptographic hashes.
# @stig V-222572 | The application must utilize FIPS-validated cryptographic modules when protecting unclassified information that requires cryptographic protection.
ENV NODE_OPTIONS="--enable-fips"

USER 1001
EXPOSE 3000

# start.mjs requires FIPS mode, logs it, runs prisma migrate deploy, then loads the server in this
# process (no shell in the image).
CMD ["node", "/app/start.mjs"]
