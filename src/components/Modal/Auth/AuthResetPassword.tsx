import Image from "next/image";
import ResetPassword from "./AuthInputs/ResetPassword";

type AuthResetPasswordProps = {};

const AuthResetPassword: React.FC<AuthResetPasswordProps> = () => {
	return (
		<section className="flex flex-col items-center w-full">
			<div className="w-full flex flex-col items-center mb-6 mt-8 gap-y-1">
				<Image
					src={"/images/redditFace.svg"}
					alt="reddit"
					height={128}
					width={128}
					loading="lazy"
					className="aspect-square h-[64px] w-[64px]"
				/>
				<h2 className="font-bold mt-2">Recover Your Account</h2>
				<p className="text-center text-sm">
					Tell us the email address associated with your Reddit account, and
					we’ll send you an email with your username.
				</p>
			</div>
			<ResetPassword />
		</section>
	);
};

export default AuthResetPassword;
