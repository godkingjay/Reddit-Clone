import { AuthModalState, authModalState } from "@/atoms/authModalAtom";

import React, { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth, firestore } from "@/firebase/clientApp";

import LoadingSpinner from "public/svg/loading-spinner.svg";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { User } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
	const [signUpForm, setSignUpForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const setAuthModal = useSetRecoilState(authModalState);

	const [createUserWithEmailAndPassword, userCred, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const [formError, setFormError] = useState(false);
	const [userError, setUserError] = useState<typeof error | null>(null);

	/**
	 *
	 *
	 * @param {React.FormEvent} e
	 * @return {*}
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formError) setFormError(false);
		if (signUpForm.password !== signUpForm.confirmPassword) {
			setFormError(true);
			return;
		}
		await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
	};

	/**
	 *
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} {
	 * 		target: { name, value },
	 * 	}
	 */
	const handleChange = ({
		target: { name, value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSignUpForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/**
	 *
	 *
	 * @param {AuthModalState["view"]} view
	 */
	const handleChangeAuth = (view: AuthModalState["view"]) => {
		setAuthModal((prev) => ({
			...prev,
			view: view,
		}));
	};

	/**
	 *
	 *
	 * @param {User} user
	 */
	const createUserDoc = async (user: User) => {
		const userDocRef = doc(firestore, "users", user.uid);
		await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
	};

	useEffect(() => {
		setUserError(error);
	}, [error]);

	useEffect(() => {
		if (userCred) {
			createUserDoc(userCred.user);
		}
	}, [userCred]);

	return (
		<form
			className="w-full flex flex-col"
			onSubmit={handleSubmit}
		>
			<div className="w-full flex flex-col mt-1 gap-y-4">
				<input
					required
					title="Email"
					type="email"
					name="email"
					placeholder="Email"
					className="auth-input"
					onChange={(e) => {
						handleChange(e);
						setUserError(null);
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
						handleChange(e);
						setFormError(false);
					}}
				/>
				<input
					required
					title="Confirm Password"
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					className="auth-input"
					onChange={(e) => {
						handleChange(e);
						setFormError(false);
					}}
				/>
			</div>
			{formError && (
				<p className="w-full break-words text-sm text-center text-red-500 mt-2">
					Password does not match.
				</p>
			)}
			<div className="w-full mb-4 mt-6 flex flex-col">
				{!loading ? (
					<button
						type="submit"
						title="Sign Up"
						className="auth-button-modal bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
						disabled={formError || userError ? true : false}
					>
						Sign Up
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
			<p className="text-xs text-center">
				Already a redditor?{" "}
				<button
					type="button"
					title="Log In"
					className="auth-modal-link underline font-bold"
					tabIndex={0}
					onClick={() => handleChangeAuth("login")}
				>
					Log In
				</button>
			</p>
		</form>
	);
};

export default SignUp;
