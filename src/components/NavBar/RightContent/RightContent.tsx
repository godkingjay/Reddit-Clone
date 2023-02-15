import React from "react";

import AuthButtons from "./AuthButtons";

import AuthModal from "@/components/Modal/Auth/AuthModal";

import DropdownUserMenu from "./Icons/DropdownUserMenu";
import { User } from "firebase/auth";
import Icons from "./Icons";

type RightContentProps = {
	user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
	return (
		<>
			<AuthModal />
			<div className="flex flex-row items-center space-x-2">
				{user ? <Icons user={user} /> : <AuthButtons />}
			</div>
		</>
	);
};

export default RightContent;
