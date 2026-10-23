'use client';

import Backdrop from './Backdrop';
import { useState } from 'react';
import Modal from './Modal';

// @stig V-222436 | The publicly accessible application must display the Standard Mandatory DoD Notice and Consent Banner before granting access to the application.
// @stig V-222435 | The application must retain the Standard Mandatory DoD Notice and Consent Banner on the screen until users acknowledge the usage conditions and take explicit actions to log on for further access.
// @stig V-222434 | The application must display the Standard Mandatory DoD Notice and Consent Banner before granting access to the application.
export default function DodConsentBanner({ isLogoutMessage }: Readonly<{ isLogoutMessage: boolean }>) {
	const [showBanner, setShowBanner] = useState(!isLogoutMessage);

	return (
		<>
			<Modal showModal={showBanner}>
				<div className='flex justify-between flex-col rounded-3xl items-center main-background gap-6 p-8'>
					<h1 className='text-lg lg:text-3xl font-bold text-center'>STANDARD MANDATORY DOD NOTICE AND CONSENT</h1>
					<h2 className='text-sm font-semibold text-center'>
						YOU ARE ACCESSING A U.S. GOVERNMENT (USG) INFORMATION SYSTEM (IS) THAT IS PROVIDED FOR USG-AUTHORIZED USE ONLY. BY
						USING THIS IS (WHICH INCLUDES ANY DEVICE ATTACHED TO THIS IS), YOU CONSENT TO THE FOLLOWING CONDITIONS:
					</h2>
					<ul className='text-xs list-disc ml-4'>
						<li>
							The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to,
							penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law
							enforcement (LE), and counterintelligence (CI) investigations.
						</li>
						<li>At any time, the USG may inspect and seize data stored on this IS.</li>
						<li>
							Communications using, or data stored on, this IS are not private, are subject to routine monitoring,
							interception, and search, and may be disclosed or used for any USG-authorized purpose.
						</li>
						<li>
							This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for
							your personal benefit or privacy.
						</li>
						<li>
							Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or
							monitoring of the content of privileged communications, or work product, related to personal representation or
							services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product
							are private and confidential. See User Agreement for details.
						</li>
					</ul>
					<button
						className='bg-custom-primary hover:bg-emerald-300 transition-all duration-300 ease-in-out text-custom-dark-gray text-sm font-bold rounded-md px-10 py-3'
						onClick={() => setShowBanner(false)}
					>
						I Consent
					</button>
				</div>
			</Modal>
			<Backdrop show={showBanner} zIndex='z-40' />
		</>
	);
}
