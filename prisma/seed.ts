import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// We would like this seed file to be able to be called multiple times, but to
	// only insert data if there is none. This is just a nicety for things like
	// the docker-compose.yml file and the like.
	if ((await prisma.sample.count()) > 0) {
		return;
	}

	const initialWeight = 350;
	let currentWeight = initialWeight;

	const days = 30; // Number of entries to add
	const seedData = [];

	for (let i = 0; i < days; i++) {
		const date = new Date();
		date.setDate(date.getDate() - (days - 1 - i)); // Get prior date each time

		// eslint-disable-next-line sonarjs/pseudo-random
		const weightChange = Math.random() * (2.5 + 2.5) - 2.5; // Random weight change between -2.5 and 2.5
		currentWeight += weightChange;

		// Round the current weight to one decimal place
		currentWeight = parseFloat(currentWeight.toFixed(1));

		seedData.push({
			date: date,
			weight: currentWeight
		});
	}

	for (const data of seedData) {
		await prisma.sample.create({
			data: {
				date: data.date,
				weight: data.weight,
				notes: null
			}
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect().catch((e) => {
			console.error(e);
		});
	});
