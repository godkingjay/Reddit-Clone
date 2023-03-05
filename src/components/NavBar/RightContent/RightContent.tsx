import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import Icons from "./Icons";
import { UserAuth } from "@/pages/_app";

type RightContentProps = {
	user?: UserAuth["user"] | null;
};

/**
 *
 *
 * @param {*} { user }
 * @return {*}
 */
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
