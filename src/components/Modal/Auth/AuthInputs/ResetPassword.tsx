import React, { useState } from "react";

import LoadingSpinner from "public/svg/loading-spinner.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilState } from "recoil";
import { AuthModalState, authModalState } from "@/atoms/authModalAtom";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [resetForm, setResetForm] = useState({
		username: "",
		email: "",
	});

	const [authModal, setAuthModal] = useRecoilState(authModalState);

	const [user, loading, error] = useAuthState(auth);

	const [userError, setUserError] = useState<typeof error | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Reset Password");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setResetForm((prev) => ({
			...prev,
			[e.target.name]: [e.target.value],
		}));
	};

	const handleChangeAuth = (view: AuthModalState["view"]) => {
		setAuthModal((prev) => ({
			...prev,
			view: view,
		}));
	};

	return (
		<form
			className="w-full flex flex-col"
			onSubmit={handleSubmit}
		>
			<div className="w-full flex flex-col gap-y-4 mt-1">
				<input
					required
					title="Username"
					type="text"
					name="username"
					placeholder="Username"
					className="auth-input"
					onChange={(e) => {
						setUserError(null);
						handleChange(e);
					}}
				/>
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
			</div>
			<div className="w-full mb-4 mt-6 flex flex-col">
				{!loading ? (
					<button
						type="submit"
						title="Reset Password"
						className="auth-button-modal bg-red-500 border-red-500 hover:bg-transparent hover:text-red-500 focus:bg-transparent focus:text-red-500"
					>
						Reset Password
					</button>
				) : (
					<div className="auth-modal-loading-spinner-container">
						<LoadingSpinner className="auth-modal-loading-spinner" />
					</div>
				)}
			</div>
			<p className="text-center text-xs text-gray-400">
				<button
					type="button"
					title="Login"
					className="auth-modal-link font-semibold"
					onClick={() => handleChangeAuth("login")}
				>
					Login
				</button>{" "}
				|{" "}
				<button
					type="button"
					title="Sign Up"
					className="auth-modal-link font-semibold"
					onClick={() => handleChangeAuth("signup")}
				>
					Sign Up
				</button>
			</p>
		</form>
	);
};

export default ResetPassword;
