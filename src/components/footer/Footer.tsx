'use client';

import Button from '../button/Button';
import './footer.css';
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram } from 'react-icons/fa6';

export default function Footer() {
	return (
		<div className='footer'>
			<div className='footer-info'>
				<div className='footer-btn-wrapper'>
					<Button primary='var(--orange)' secondary='var(--tan)' onClick={() => console.log('phone')}>
						(281) 806 - 1314
					</Button>
				</div>
				<div className='footer-legals'>
					<p>Terms</p>
					<span>|</span>
					<p className='footer-no-hover'>© 2024 Revel</p>
					<span>|</span>
					<p>Privacy</p>
				</div>
				<div className='footer-socials'>
					<div className='footer-socials-icons'>
						<FaSquareFacebook />
					</div>
					<div className='footer-socials-icons'>
						<FaSquareXTwitter />
					</div>
					<div className='footer-socials-icons'>
						<FaSquareInstagram />
					</div>
				</div>
			</div>
		</div>
	);
}
