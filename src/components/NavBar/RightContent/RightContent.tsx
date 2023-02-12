import React from "react";

import AuthButtons from "./AuthButtons";

import AuthModal from "@/components/Modal/Auth/AuthModal";

import { auth } from "@/firebase/clientApp";

import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

type RightContentProps = {
	user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
	return (
		<>
			<AuthModal />
			<div className="flex flex-row items-center space-x-2">
				{user ? (
					<button
						title="Sign Out"
						type="button"
						onClick={() => signOut(auth)}
					>
						Sign out
					</button>
				) : (
					<AuthButtons />
				)}
			</div>
		</>
	);
};

export default RightContent;
