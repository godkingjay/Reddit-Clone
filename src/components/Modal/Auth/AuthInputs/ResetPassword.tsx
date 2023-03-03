import React, { useEffect, useState } from "react";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [userError, setUserError] = useState<typeof error | null>(null);
	const [emailSent, setEmailSent] = useState(false);
	const [resetForm, setResetForm] = useState({
		username: "",
		email: "",
	});

	const [sendPasswordResetEmail, sending, error] =
		useSendPasswordResetEmail(auth);

	const setAuthModal = useSetRecoilState(authModalState);

	/**
	 *
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await sendPasswordResetEmail(resetForm.email);
		setEmailSent(true);
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
		setResetForm((prev) => ({
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

	useEffect(() => {
		if (error) {
			setUserError((prev: any) => {
				if (error.message === "Firebase: Error (auth/user-not-found).") {
					return {
						...prev,
						message: "A user with that email does not exist.",
					};
				} else {
					return error;
				}
			});
		}
	}, [error]);

	return (
		<>
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
				{!emailSent || error || sending ? (
					<p className="text-center text-sm">
						Tell us the email address associated with your Reddit account, and
						we’ll send you an email with your username.
					</p>
				) : (
					<p className="text-center text-sm">
						An email has been sent out to your email address. Check your inbox
						to reset your password.
					</p>
				)}
			</div>
			{!emailSent || sending || error ? (
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
					</div>
					<div className="w-full mb-4 mt-6 flex flex-col">
						{!sending ? (
							<button
								type="submit"
								title="Reset Password"
								className="auth-button-modal bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 focus:bg-red-600 focus:border-red-600"
							>
								Reset Password
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
								? FIREBASE_ERRORS[
										userError.message as keyof typeof FIREBASE_ERRORS
								  ]
								: userError.message}
						</p>
					)}
				</form>
			) : (
				<div className="flex flex-row items-center justify-center w-full bg-[rgb(20,220,120)] py-2 px-4 rounded-lg mb-4">
					<FiMail className="aspect-square h-6 w-6 stroke-white" />
					<p className="font-bold text-lg text-white flex-1 text-center">
						Email Sent
					</p>
				</div>
			)}
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
		</>
	);
};

export default ResetPassword;
