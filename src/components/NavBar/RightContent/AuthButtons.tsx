import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

type AuthButtonsProps = {};

const AuthButtons: React.FC<AuthButtonsProps> = () => {
	const setAuthModalOpen = useSetRecoilState(authModalState);

	/**
	 *
	 *
	 * @param {boolean} state
	 * @param {AuthModalState["view"]} view
	 */
	const handleClick = (state: boolean, view: AuthModalState["view"]) => {
		setAuthModalOpen({
			open: state,
			view: view,
		});
	};

	return (
		<>
			<button
				className="auth-button border-brand-100 text-brand-100 hover:bg-brand-100 hover:text-white active:bg-brand-100 active:text-white focus:bg-brand-100 focus:text-white"
				type="button"
				title="Log In"
				onClick={() => handleClick(true, "login")}
			>
				Log In
			</button>
			<button
				className="auth-button  border-blue-500 bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600 focus:border-blue-600 focus:bg-blue-600"
				type="button"
				title="Sign Up"
				onClick={() => handleClick(true, "signup")}
			>
				Sign Up
			</button>
		</>
	);
};

export default AuthButtons;
