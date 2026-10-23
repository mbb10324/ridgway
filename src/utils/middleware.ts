import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/env/server';

/**
 * This function comes from the Next.js docs: https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy
 * It sets the Content-Security-Policy header to restrict the sources of scripts, styles, images, fonts, and forms and only allows them from the same origin.
 * If you want to allow other origins, you can modify the cspHeader variable or generate a nonce and add it to the script-src directive.
 * You can find out more above leveraging a nonce in the Next.js docs.
 *
 * The content security policy restrictions in place here are not a silver bullet solution for protecting against XSS.
 * XSS protection involves a plethora of security measures, including but not limited to:
 * - Input validation (We validate all user-provided data on the client at the form, and again on the server)
 * - Output encoding (We encode all user-provided data before displaying it on the page)
 * - Avoiding Inline Scripts (Inline scripts are a common way for attackers to inject malicious code into a web page, we do not allow them in our application)
 * - Utilizing secure dependencies (We perform regular audits to scan for any vulnerabilities in our dependencies)
 * - Performing regular security scans (We perform regular security scans through SonarQube as another layer of defense)
 * - Utilizing a Content Security Policy (CSP) (As addressed here)
 *
 * With all of the above measures in place, we can be confident that our application is more secure against XSS attacks.
 * @stig V-222602 | The application must protect from Cross-Site Scripting (XSS) vulnerabilities.
 */
export function setContentSecurityPolicy(request: NextRequest): NextResponse {
	// In development mode, Next.js injects certain inline scripts directly into your HTML, such as hot-reloading
	// scripts, error overlays, or other debugging tools. For this reason - we must relax our CSP in development.
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
	/* eslint-disable */
	const cspHeader = `
  default-src 'self'; 
  script-src 'strict-dynamic' 'nonce-${nonce}' ${env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`}; 
  style-src 'self' ${env.NODE_ENV === 'production' ? '' : `'unsafe-inline'`}; 
  img-src 'self' data:; 
  font-src 'self'; 
  object-src 'none'; 
  base-uri 'self'; 
  form-action 'self'; 
  frame-ancestors 'none'; 
  upgrade-insecure-requests; 
  `;
	/* eslint-enable */

	const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-nonce', nonce);
	requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders
		}
	});
	response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

	return response;
}
