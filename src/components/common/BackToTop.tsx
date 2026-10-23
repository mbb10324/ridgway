import { useEffect, useState } from 'react';
import Svg from '../svg/Svg';

export default function BackToTop() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 150) {
				setShow(true);
			} else {
				setShow(false);
			}
		});
	}, []);

	return (
		<div
			className={`fixed bottom-4 right-4 transition-all duration-300 ease-in-out ${show ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
		>
			<button
				onClick={() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				className='bg-zinc-700 text-white rounded-full p-2 hover:bg-zinc-600 transition-all duration-300 ease-in-out'
			>
				<Svg.TbArrowUp size={32} />
			</button>
		</div>
	);
}
