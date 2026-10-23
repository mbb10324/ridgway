import { useState } from 'react';
import './menu-btn.css';

type MenuBtnProps = {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
};

export default function MenuBtn(props: Readonly<MenuBtnProps>) {
	const { menuOpen, setMenuOpen } = props;
	const [hovered, setHovered] = useState(false);
	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<>
			<div
				className={`menu-btn ${menuOpen ? 'menu-open' : ''}`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={toggleMenu}
			>
				<span
					className={`menu-btn-line one ${hovered && !menuOpen ? 'rotate' : ''} ${menuOpen ? 'invert-menu' : ''}`}
				></span>
				<span
					className={`menu-btn-line two ${hovered && !menuOpen ? 'rotate' : ''} ${menuOpen ? 'invert-menu' : ''}`}
				></span>
				<span
					className={`menu-btn-line three ${hovered && !menuOpen ? 'rotate' : ''} ${menuOpen ? 'invert-menu' : ''}`}
				></span>
			</div>
		</>
	);
}
