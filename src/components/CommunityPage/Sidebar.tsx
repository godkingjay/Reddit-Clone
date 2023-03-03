import { Community } from "@/atoms/communitiesAtom";
import React from "react";
import AboutCommunity from "./Sidebar/AboutCommunity";
import useCommunityData from "@/hooks/useCommunityData";

type SidebarProps = {
	communityData: Community;
};

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const Sidebar: React.FC<SidebarProps> = ({ communityData }) => {
	const { loading } = useCommunityData();
	return (
		<div className="w-full flex flex-col gap-y-4">
			<AboutCommunity communityData={communityData} />
		</div>
	);
};

export default Sidebar;
