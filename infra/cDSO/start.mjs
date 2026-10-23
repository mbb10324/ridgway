// Runs prisma migrate, then the Node server, in one Node script because the runtime image only has Node.
// .mjs = a JavaScript file Node treats as an ES module (allows import and top-level await).
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import crypto from 'node:crypto';

if (crypto.getFips() !== 1) {
	console.error('FIPS mode is required');
	process.exit(1);
}
console.log(`FIPS mode: ${crypto.getFips()}, OpenSSL ${process.versions.openssl}`);

// Node is PID 1 and gets no default signal handling, so exit promptly on SIGTERM/SIGINT.
// Next's standalone server installs its own graceful handlers once it is loaded.
let migration;
for (const signal of ['SIGTERM', 'SIGINT']) {
	process.once(signal, () => {
		migration?.kill(signal);
		process.exit(signal === 'SIGINT' ? 130 : 143);
	});
}

// Prisma resolves its temporary directory during CLI initialization.
// /app is writable by UID 1001 even when the runtime image has no /tmp.
mkdirSync('/app/.tmp', { recursive: true, mode: 0o700 });
process.env.TMPDIR = '/app/.tmp';

const prismaDir = '/opt/prisma-cli/node_modules/prisma';
const { bin } = JSON.parse(readFileSync(`${prismaDir}/package.json`, 'utf8'));
const prismaCli = `${prismaDir}/${typeof bin === 'string' ? bin : bin.prisma}`;

const status = await new Promise((resolve) => {
	migration = spawn(process.execPath, [prismaCli, 'migrate', 'deploy'], { stdio: 'inherit' });
	migration.on('error', (error) => {
		console.error(`Failed to run prisma migrate deploy: ${error.message}`);
		resolve(1);
	});
	migration.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
});
if (status !== 0) {
	console.error(`prisma migrate deploy failed (${status})`);
	process.exit(status);
}
migration = undefined;

await import('/app/server.js');
