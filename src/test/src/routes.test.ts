import fs from 'fs';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { routes } from '@/routes';

const ignorePaths = ['/api/auth/[...nextauth]'];

describe('API Routes', () => {
	const apiDir = path.join(__dirname, '../../app/api');

	function findRouteTsFiles(dir: string): string[] {
		const files = fs.readdirSync(dir);
		let routeTsFiles: string[] = [];

		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			// Skip slugged folders
			if (stat.isDirectory() && file.startsWith('[') && file.endsWith(']')) {
				continue;
			}

			if (stat.isDirectory()) {
				routeTsFiles = routeTsFiles.concat(findRouteTsFiles(filePath));
			} else if (file === 'route.ts') {
				routeTsFiles.push(filePath);
			}
		}

		return routeTsFiles;
	}

	test('All src/app/api/**/route.ts files have a corresponding entry in routes constant', () => {
		const routeTsFiles = findRouteTsFiles(apiDir);
		const routePaths = Object.values(routes);

		for (const file of routeTsFiles) {
			const relativePath = path.relative(apiDir, file);
			const routePath = '/api/' + path.dirname(relativePath).replace(/\\/g, '/');

			if (ignorePaths.includes(routePath)) {
				continue;
			}

			expect(routePaths).toContain(routePath);
		}
	});
});
