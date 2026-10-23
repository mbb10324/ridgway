type ModalProps = {
	showModal: boolean;
	children: React.ReactNode;
};

export default function Modal(props: Readonly<ModalProps>) {
	const { showModal, children } = props;
	return (
		<div
			className={`fixed overflow-auto mx-auto top-1/2 -translate-y-1/2 inset-x-0 z-50 h-fit max-w-90-percent lg:max-w-lg-breakpoint max-h-90-percent transition-all duration-500 ease-in-out ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
			title='modal'
		>
			{ showModal && children }
		</div>
	);
}
