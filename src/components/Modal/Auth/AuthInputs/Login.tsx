import { AuthModalState, authModalState } from "@/atoms/authModalAtom";

import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { FIREBASE_ERRORS } from "@/firebase/errors";

import { auth, firestore } from "@/firebase/clientApp";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import LoadingSpinner from "public/svg/loading-spinner.svg";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const setAuthModal = useSetRecoilState(authModalState);

	const [userError, setUserError] = useState<typeof error | null | undefined>(
		null
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await signInWithEmailAndPassword(loginForm.email, loginForm.password)
			.then(async (user) => {
				if (user) {
					try {
						const userDocRef = doc(firestore, "users", user.user.uid);
						const userDoc = await getDoc(userDocRef);
						if (userDoc.exists()) {
							await updateDoc(userDocRef, JSON.parse(JSON.stringify(user)));
						} else {
							throw new Error("User Doc Does Not Exist!");
						}
					} catch (error: any) {
						console.log("Updating Docs Error:", error.message);
					}
				} else {
					console.log("Login Failed!");
				}
			})
			.catch((error: any) => console.log("Login Failed!"));
	};

	const handleChange = ({
		target: { name, value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeAuth = (view: AuthModalState["view"]) => {
		setAuthModal((prev) => ({
			...prev,
			view: view,
		}));
	};

	useEffect(() => {
		setUserError(error);
	}, [error]);

	return (
		<form
			className="w-full flex flex-col"
			onSubmit={handleSubmit}
		>
			<div className="w-full flex flex-col gap-y-4 mt-1">
				<input
					required
					title="Email"
					type="email"
					name="email"
					placeholder="Email"
					className="auth-input"
					onChange={(e) => {
						setUserError(null);
						handleChange(e);
					}}
				/>
				<input
					required
					title="Password"
					type="password"
					name="password"
					placeholder="Password"
					className="auth-input"
					onChange={(e) => {
						setUserError(null);
						handleChange(e);
					}}
				/>
			</div>
			<div className="w-full mb-4 mt-6 flex flex-col">
				{!loading ? (
					<button
						type="submit"
						title="Login"
						className="auth-button-modal bg-brand-100 border-brand-100 hover:bg-brand-200 hover:border-brand-200 focus:bg-brand-200 focus:border-brand-200"
					>
						Login
					</button>
				) : (
					<div className="auth-modal-loading-spinner-container">
						<LoadingSpinner className="auth-modal-loading-spinner" />
					</div>
				)}
			</div>
			{error && userError && (
				<p className="w-full break-words text-sm text-center text-red-500 mb-4">
					{error &&
					FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]
						? FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]
						: userError.message}
				</p>
			)}
			<p className="text-center text-xs mb-4">
				Forgot your{" "}
				{/* <button
					type="button"
					title="Forgot Username"
					className="auth-modal-link"
					onClick={() => handleChangeAuth("resetPassword")}
				>
					username
				</button>{" "}
				or{" "} */}
				<button
					type="button"
					title="Forgot Password"
					className="auth-modal-link"
					onClick={() => handleChangeAuth("resetPassword")}
				>
					password
				</button>
				?
			</p>
			<p className="text-center text-xs">
				New to Reddit?{" "}
				<button
					type="button"
					title="Sign Up"
					className="auth-modal-link font-bold underline"
					tabIndex={0}
					onClick={() => handleChangeAuth("signup")}
				>
					Sign Up
				</button>
			</p>
		</form>
	);
};

export default Login;
