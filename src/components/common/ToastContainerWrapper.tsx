'use client';

// Note: We need to import the unstyled version of ToastContainer to avoid CSP errors. 
import { ToastContainer, Zoom } from 'react-toastify/unstyled';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerWrapper() {
	return <ToastContainer transition={Zoom} position='bottom-center' theme='dark' data-testid='toast-wrapper' />;
}
