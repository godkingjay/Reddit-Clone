import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import Directory from "./Directory/Directory";
import Link from "next/link";
import { UserAuth } from "@/pages/_app";

type NavBarProps = {
	user?: UserAuth["user"] | null;
	loading: UserAuth["loading"];
	error?: UserAuth["error"];
};

/**
 *
 *
 * @return {*}
 */
const NavBar: React.FC<NavBarProps> = ({ user, loading, error }) => {
	return (
		<div className="flex bg-hsl(0, 0%, 100%) px-[16px] py-[8px] gap-x-2 items-center shadow-sm w-full border-b border-solid border-b-gray-500 border-opacity-10">
			<Link
				href={"/"}
				className="flex"
			>
				<Image
					src={"/images/redditFace.svg"}
					alt="Reddit Face"
					height={38}
					width={38}
				/>
				<Image
					src={"/images/redditText.svg"}
					alt="Reddit Text"
					height={38}
					width={56}
					className="hidden sm:block"
				/>
			</Link>
			<div className="flex flex-row h-full flex-1 items-center justify-between gap-x-2">
				{user && <Directory />}
				<SearchInput user={user} />
				<RightContent user={user} />
			</div>
		</div>
	);
};

export default NavBar;
