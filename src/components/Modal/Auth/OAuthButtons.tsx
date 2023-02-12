import Image from "next/image";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { FIREBASE_ERRORS } from "@/firebase/errors";

import { auth } from "@/firebase/clientApp";

import LoadingSpinner from "public/svg/loading-spinner.svg";

type OAuthProps = {};

const OAuthButtons: React.FC<OAuthProps> = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	return (
		<section className="w-full flex flex-col py-1 mt-6">
			{!loading ? (
				<button
					type="button"
					title="Continue with Google"
					className="o-auth-buttons"
					onClick={() => {
						signInWithGoogle();
					}}
				>
					<Image
						src={"/images/googlelogo.png"}
						height={128}
						width={128}
						className="o-auth-button-img"
						alt="Google Logo"
						loading="lazy"
					/>
					<label className="o-auth-button-label">Continue with Google</label>
				</button>
			) : (
				<div className="w-full flex flex-col items-center justify-center my-1">
					<LoadingSpinner className="aspect-square h-[32px] w-[32px] animate-spin [&>path]:stroke-blue-500" />
				</div>
			)}
		</section>
	);
};

export default OAuthButtons;
