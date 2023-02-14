import Image from "next/image";
import ResetPassword from "./AuthInputs/ResetPassword";

type AuthResetPasswordProps = {};

const AuthResetPassword: React.FC<AuthResetPasswordProps> = () => {
	return (
		<section className="flex flex-col items-center w-full">
			<ResetPassword />
		</section>
	);
};

export default AuthResetPassword;
