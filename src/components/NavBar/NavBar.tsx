import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";

const NavBar: React.FC = () => {
	const [user, loading, error] = useAuthState(auth);

	return (
		<div className="flex bg-hsl(0, 0%, 100%) px-[16px] py-[8px] gap-x-2 items-center">
			<div className="flex">
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
			</div>
			{ user && <Directory /> }
			<SearchInput />
			<RightContent user={user} />
		</div>
	);
};

export default NavBar;
