import { Community } from "@/atoms/communitiesAtom";
import React from "react";
import AboutCommunity from "./Sidebar/AboutCommunity";
import { User } from "firebase/auth";

type SidebarProps = {
	communityData: Community;
	user?: User | null;
	loading: boolean;
	error?: any;
};

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const Sidebar: React.FC<SidebarProps> = ({
	communityData,
	user,
	loading,
	error,
}) => {
	return (
		<div className="w-full flex flex-col gap-y-4">
			<AboutCommunity
				communityData={communityData}
				user={user}
			/>
		</div>
	);
};

export default Sidebar;
