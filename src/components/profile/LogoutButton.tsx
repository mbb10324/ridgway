import { signOut } from '@/utils/auth';
import Svg from '../svg/Svg';

export default function LogoutButton() {
	return (
		<button
			className='bg-custom-transparent-medium-gray w-full rounded-lg py-2 text-white text-lg flex pl-8 justify-start items-center gap-7 font-semibold hover:bg-custom-transparent-gray transition-all duration-300 ease-in-out'
			type='button'
			title='logout-btn'
			onClick={() => signOut({ callbackUrl: '/?message=logged-out' })}
		>
			<Svg.TbLogout size={20} />
			Logout
		</button>
	);
}
