import Layout from '../../layout/RidgwayLayout';
import './contact.css';

export default function Contact() {
	return (
		<Layout>
			<div className='contact-wrapper'>
				<div className='contact-form'>
					<form>
						<h1>Contact</h1>
						<input type='text' placeholder='Name' />
						<input type='email' placeholder='Email' />
						<textarea placeholder='Message' />
						<button>Send</button>
						<p>
							You can also get in touch with us by phone or through our socials which can be found at the bottom of every page
							&darr;
						</p>
					</form>
				</div>
				<div className='contact-background'>
					<div />
					<div className='contact-background-block-1' />
					<div className='contact-background-block-2' />
					<div className='contact-background-block-3' />
					<div className='contact-background-block-4' />
				</div>
			</div>
		</Layout>
	);
}
