// This line forces the Next.js application to always run in dynamic mode, which may not be optimal for performance.
// However, it is currently necessary to support a nonce-based Content Security Policy (CSP)
// See: https://nextjs.org/docs/pages/guides/content-security-policy#adding-a-nonce-with-middleware
// @stig V-222602 | The application must protect from Cross-Site Scripting (XSS) vulnerabilities.
export const dynamic = 'force-dynamic';

import ReactQueryClientProvider from '@/components/common/ReactQueryClientProvider';
import ToastContainerWrapper from '@/components/common/ToastContainerWrapper';
import SessionWrapper from '@/context/SessionWrapper';
import Splash from '@/components/splash/Splash';
import type { Metadata } from 'next';
import './globals.css';
import ClassificationMarking from '@/components/common/ClassificationMarking';

export const metadata: Metadata = {
	title: 'Operational Data Section - XVIII ABC',
	description: 'XVIII ABC Starter App'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<SessionWrapper unauthenticatedElement={<Splash />}>
					<ReactQueryClientProvider>
						<ClassificationMarking />
						<div className='app'>{children}</div>
						<ToastContainerWrapper />
					</ReactQueryClientProvider>
				</SessionWrapper>
			</body>
		</html>
	);
}
