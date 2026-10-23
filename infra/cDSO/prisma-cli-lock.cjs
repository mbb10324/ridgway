// Keep the isolated migration CLI within the application's reviewed dependencies.
// The container runs prisma migrate deploy on startup, but the Next.js standalone output doesn't include the Prisma CLI. This installs it into /opt/prisma-cli and puts it on PATH.
// It also verifies against the app's package-lock.json, so no versions or integrity hashes differ from what's already reviewed.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const [mode, source, destination] = process.argv.slice(2);
assert.ok(source && destination, 'Usage: prisma-cli-lock.cjs prepare|verify source destination');
const read = (directory, name) => JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
const original = read(source, 'package-lock.json');
const prisma = original.packages['node_modules/prisma'];
assert.ok(prisma?.version, 'Application lockfile must pin Prisma');

if (mode === 'prepare') {
	const application = read(source, 'package.json');
	fs.mkdirSync(destination, { recursive: true });
	fs.writeFileSync(
		path.join(destination, 'package.json'),
		JSON.stringify(
			{
				name: 'primus-prisma-cli',
				private: true,
				dependencies: { prisma: prisma.version },
				overrides: application.overrides,
				allowScripts: application.allowScripts
			},
			null,
			2
		) + '\n'
	);
	fs.copyFileSync(path.join(source, 'package-lock.json'), path.join(destination, 'package-lock.json'));
} else if (mode === 'verify') {
	const focused = read(destination, 'package-lock.json');
	assert.equal(focused.packages[''].dependencies.prisma, prisma.version, 'Prisma version changed');
	assert.equal(focused.packages['node_modules/prisma']?.version, prisma.version, 'Prisma package missing or changed');
	for (const [location, entry] of Object.entries(focused.packages)) {
		if (!location) {
			continue;
		}
		const expected = original.packages[location];
		assert.ok(expected, `Dependency absent from application lockfile: ${location}`);
		assert.equal(entry.version, expected.version, `Dependency version changed: ${location}`);
		assert.equal(entry.resolved, expected.resolved, `Dependency source changed: ${location}`);
		assert.equal(entry.integrity, expected.integrity, `Dependency integrity changed: ${location}`);
	}
} else {
	throw new Error(`Unknown mode: ${mode}`);
}
