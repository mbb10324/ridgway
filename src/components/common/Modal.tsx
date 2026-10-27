import './modal.css';

type ModalProps = {
	showModal: boolean;
	children: React.ReactNode;
};

export default function Modal(props: Readonly<ModalProps>) {
	const { showModal, children } = props;
	return (
		<div className={`modal ${showModal ? 'modal--visible' : 'modal--hidden'}`} title='modal'>
			{showModal && children}
		</div>
	);
}
