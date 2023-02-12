import { authModalState } from "@/atoms/authModalAtom";

import React from "react";

import { useRecoilValue } from "recoil";

import Login from "./AuthInputs/Login";
import SignUp from "./AuthInputs/SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
	const authModal = useRecoilValue(authModalState);

	return (
		<div className="flex flex-col items-center w-full">
			{authModal.view === "login" && <Login />}
			{authModal.view === "signup" && <SignUp />}
		</div>
	);
};

export default AuthInputs;
