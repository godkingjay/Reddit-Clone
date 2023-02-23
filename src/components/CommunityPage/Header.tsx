import { Community } from "@/atoms/communitiesAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoCommunityImage from "public/svg/community-no-image.svg";

type HeaderProps = {
	communityData: Community;
	isJoined: boolean;
};

const Header: React.FC<HeaderProps> = ({ communityData, isJoined }) => {
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
					<div className="border-4 border-solid border-white aspect-square w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-white translate-y-[-20%]">
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
							<NoCommunityImage className="w-full h-full rounder-full fill-blue-500" />
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
					<div className="my-2">
						<button
							type="button"
							title={isJoined ? "Leave" : "Join"}
							className={`
								page-button outline-offset-0  ${
									isJoined
										? "text-blue-500 bg-transparent hover:bg-blue-500 hover:bg-opacity-10 focus-within:bg-blue-500 focus-within:bg-opacity-10"
										: "hover:bg-blue-600 hover:border-blue-600 focus-within:bg-blue-600 focus-within:border-blue-600"
								}
								w-[108px]
							`}
						>
							{isJoined ? "Leave" : "Join"}
						</button>
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
