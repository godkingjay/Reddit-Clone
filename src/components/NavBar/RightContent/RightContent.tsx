import React from "react";

import AuthButtons from "./AuthButtons";

import AuthModal from "@/components/Modal/Auth/AuthModal";

import DropdownUserMenu from "./DropdownUserMenu";

type RightContentProps = {
	user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
	return (
		<>
			<AuthModal />
			<div className="flex flex-row items-center space-x-2">
				{user ? <DropdownUserMenu /> : <AuthButtons />}
			</div>
		</>
	);
};

export default RightContent;
