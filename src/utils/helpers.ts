/* eslint-disable sonarjs/pseudo-random */
export function shuffleArray(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}

export const worksPageItems = [
	{
		title: 'Duro',
		category: 'Health & Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'Cheetos',
		category: 'Entertainment',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'Circa 1800',
		category: 'Entertainment',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'Pyxis',
		category: 'Food & Beverage',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'react-figura',
		category: 'Open Source',
		description: `I am the creator of react-figura, a TypeScript-based npm library that 
        streamlines form handling in React applications. Designed to provide a comprehensive,
        performant, and lightweight solution, the library has garnered over 20,000 installs 
        as of the time of this writing. react-figura offers a suite of 33 fully customizable 
        components that cover an extensive range of input types, thus eliminating 
        the need for boilerplate code and accelerating development cycles. This project 
        showcases my commitment as a developer to write efficient code, understand 
        the nuances of front-end development, and establishes a proven track record 
         of delivering widely-used solutions.`,
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'just the tip',
		category: 'Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},

	{
		title: 'react-arca',
		category: 'Health & Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'Calorie Tracker',
		category: 'Food & Beverage',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'react-scroll-animation',
		category: 'Open Source',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'react-onus',
		category: 'Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},

	{
		title: 'Miles Breman',
		category: 'Health & Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	},
	{
		title: 'Pizza Palace',
		category: 'Health & Fitness',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		mobileImg: '/srpMobileLeaderboard.png',
		desktopImg: '/srpDesktopOverview.jpeg',
		link: 'https://example.com'
	}
];
