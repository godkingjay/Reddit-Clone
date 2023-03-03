import Image from "next/image";

import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth, firestore } from "@/firebase/clientApp";

import LoadingSpinner from "public/svg/loading-spinner.svg";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

type OAuthProps = {};

const OAuthButtons: React.FC<OAuthProps> = () => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);

	/**
	 *
	 *
	 * @param {User} user
	 */
	const createUserDoc = async (user: User) => {
		const userDocRef = doc(firestore, "users", user.uid);
		const userDoc = await getDoc(userDocRef);
		if (userDoc.exists()) {
			await updateDoc(userDocRef, JSON.parse(JSON.stringify(user)));
		} else {
			await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
		}
	};

	useEffect(() => {
		if (userCred) {
			createUserDoc(userCred.user);
		}
	}, [userCred]);

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
