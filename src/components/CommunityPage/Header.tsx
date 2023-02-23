import { Community } from "@/atoms/communitiesAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoCommunityImage from "public/svg/community-no-image.svg";

type HeaderProps = {
	communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
	return (
		<div className="bg-white w-full flex flex-col items-center">
			{communityData.imageURL ? (
				<Link
					href={communityData.imageURL}
					target="_blank"
					className="w-full h-max"
				>
					<div className="w-full h-24 bg-blue-400"></div>
				</Link>
			) : (
				<div className="w-full h-max">
					<div className="w-full h-24 bg-blue-400"></div>
				</div>
			)}
			<div className="max-w-6xl w-full flex flex-col px-6">
				<div className="relative w-full flex flex-row gap-x-4">
					<div className="border-4 border-solid border-white aspect-square w-24 h-24 rounded-full bg-white translate-y-[-25%]">
						{communityData.imageURL ? (
							<Image
								src={communityData.imageURL}
								alt={`${communityData.name} image`}
								width={256}
								height={256}
								loading="lazy"
								className="w-full h-full rounded-full bg-contain bg-center"
							/>
						) : (
							<NoCommunityImage className="w-full h-full rounder-full fill-blue-600" />
						)}
					</div>
					<div className="my-2 flex flex-col gap-y-1 flex-1">
						<h1 className="text-2xl font-bold break-words">
							{communityData.name}
						</h1>
						<p className="text-sm font-semibold text-gray-500 truncate">
							r/{communityData.id}
						</p>
					</div>
				</div>
				{/* <nav>
					<ul>
						<li>

						</li>
					</ul>
				</nav> */}
			</div>
		</div>
	);
};

export default Header;
