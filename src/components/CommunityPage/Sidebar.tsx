import { Community } from "@/atoms/communitiesAtom";
import React from "react";

type SidebarProps = {
	communityData: Community;
};

const Sidebar: React.FC<SidebarProps> = ({ communityData }) => {
	return (
		<div className="w-full flex flex-col gap-y-4">
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
			<div>Sidebar</div>
		</div>
	);
};

export default Sidebar;
