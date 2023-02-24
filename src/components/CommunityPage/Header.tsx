import { Community, CommunityState } from "@/atoms/communitiesAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoCommunityImage from "public/svg/community-no-image.svg";
import { CommunityModalState } from "@/atoms/communityModal";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import useCommunityData from "@/hooks/useCommunityData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type HeaderProps = {
	communityData: Community;
	communityStateValue: CommunityState;
};

const Header: React.FC<HeaderProps> = ({
	communityData,
	communityStateValue,
}) => {
	const [user] = useAuthState(auth);
	const setAuthModal = useSetRecoilState(authModalState);
	const { onJoinOrLeaveCommunity, loading: communityLoading } =
		useCommunityData();
	const isJoined = !!communityStateValue.userCommunities.find(
		(item) => item.communityId === communityData.id
	);

	const handleJoinOrLeave = () => {
		if (!user) {
			setAuthModal((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
		} else {
			onJoinOrLeaveCommunity(communityData, isJoined);
		}
	};

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
					<div className="border-4 border-solid border-white aspect-square w-20 h-20 rounded-full bg-white translate-y-[-20%]">
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
					<div className="my-2 flex flex-col gap-y-1">
						<h1 className="text-2xl font-bold break-words">
							{communityData.name}
						</h1>
						<p className="text-sm font-semibold text-gray-500 truncate">
							r/{communityData.id}
						</p>
					</div>
					<div className="my-2 ml-4">
						<button
							type="button"
							title={isJoined ? "Leave" : "Join"}
							className={`
								page-button outline-offset-0  ${
									isJoined
										? "text-blue-500 bg-transparent hover:bg-blue-500 hover:bg-opacity-10 focus-within:bg-blue-500 focus-within:bg-opacity-10"
										: "hover:bg-blue-600 hover:border-blue-600 focus-within:bg-blue-600 focus-within:border-blue-600"
								}
								w-[108px] py-1.5 group flex flex-row justify-center items-center gap-x-1.5
							`}
							onClick={() => handleJoinOrLeave()}
							disabled={communityLoading}
						>
							{!communityLoading ? (
								<>
									{isJoined ? (
										<>
											<span className="joined-1 group-hover:hidden group-focus:hidden">
												Joined
											</span>
											<span className="joined-2 hidden group-hover:inline group-focus:inline">
												Leave
											</span>
										</>
									) : (
										<span>Join</span>
									)}
								</>
							) : (
								<LoadingSpinner
									className={`w-5 h-5 animate-spin 
									${isJoined ? "[&>path]:stroke-blue-500" : "[&>path]:stroke-white"}
								`}
								/>
							)}
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
