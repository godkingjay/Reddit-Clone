import React from "react";

import AuthButtons from "./AuthButtons";

import AuthModal from "@/components/Modal/Auth/AuthModal";

import { User } from "firebase/auth";
import Icons from "./Icons";

type RightContentProps = {
	user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
	return (
		<>
			<div className="flex flex-row z-30 items-center space-x-2 h-full">
				{user ? <Icons user={user} /> : <AuthButtons />}
			</div>
			<AuthModal />
		</>
	);
};

export default RightContent;
