import { Community } from "@/atoms/communitiesAtom";
import React from "react";

type SidebarProps = {
	communityData: Community;
};

const Sidebar: React.FC<SidebarProps> = ({ communityData }) => {
	return <div>Sidebar</div>;
};

export default Sidebar;
