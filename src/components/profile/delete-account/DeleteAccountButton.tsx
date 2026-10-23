import { DeleteAccountContext } from './DeleteAccountContext';
import Svg from '@/components/svg/Svg';
import { useContext } from 'react';

type DeleteAccountButtonProps = {
	onClick: () => void;
};

export default function DeleteAccountButton(props: Readonly<DeleteAccountButtonProps>) {
	const { onClick } = props;
	const deleteAccount = useContext(DeleteAccountContext);

	return (
		<button
			className='bg-red-500/20 rounded-lg py-2 text-red-300 w-full text-lg flex pl-8 justify-start items-center gap-7 font-semibold hover:bg-red-400/20 transition-all duration-300 ease-in-out'
			type='button'
			title='delete-account-btn'
			onClick={() => {
				deleteAccount.setShowDeleteAccount(true);
				onClick();
			}}
		>
			<Svg.TbTrash size={20} />
			Delete Account
		</button>
	);
}
