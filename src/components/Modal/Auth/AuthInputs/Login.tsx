import { authModalState } from "@/atoms/authModalAtom";

import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { FIREBASE_ERRORS } from "@/firebase/errors";

import { auth } from "@/firebase/clientApp";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import LoadingSpinner from "public/svg/loading-spinner.svg";

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeAuth = () => {
		setAuthModal((prev) => ({
			...prev,
			view: "signup",
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
			{/* <p className="text-left text-xs mt-4 mb-2">Forgot your username or password?</p> */}
			<div className="w-full mb-4 mt-6 flex flex-col">
				{!loading ? (
					<button
						type="submit"
						title="Login"
						className="auth-button-modal bg-brand-100 border-brand-100 hover:bg-transparent hover:text-brand-100 focus:bg-transparent focus:text-brand-100"
					>
						Login
					</button>
				) : (
					<div className="w-full h-max flex flex-col items-center justify-center my-1">
						<LoadingSpinner className="aspect-square h-[32px] w-[32px] animate-spin [&>path]:stroke-blue-500" />
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
			<p className="text-center text-xs">
				New to Reddit?{" "}
				<button
					type="button"
					title="Sign Up"
					className="auth-modal-link font-bold underline"
					tabIndex={0}
					onClick={() => handleChangeAuth()}
				>
					Sign Up
				</button>
			</p>
		</form>
	);
};

export default Login;
