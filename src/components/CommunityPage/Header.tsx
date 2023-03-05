import { Community, CommunityState } from "@/atoms/communitiesAtom";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import NoCommunityImage from "public/svg/community-no-image.svg";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import useCommunityData from "@/hooks/useCommunityData";
import { User } from "firebase/auth";

type HeaderProps = {
	communityData: Community;
	communityStateValue: CommunityState;
	user?: User | null;
	loading?: boolean;
	error?: any;
};

/**
 *
 *
 * @param {*} {
 * 	communityData,
 * 	communityStateValue,
 * 	user,
 * }
 * @return {*}
 */
const Header: React.FC<HeaderProps> = ({
	communityData,
	communityStateValue,
	user,
	loading,
	error,
}) => {
	const {
		onJoinOrLeaveCommunity,
		loading: communityLoading,
		setLoading: setCommunityLoading,
	} = useCommunityData();
	const isJoined = !!communityStateValue.userCommunities.find(
		(item) => item.communityId === communityData.id
	);

	/**
	 *
	 *
	 */
	const handleJoinOrLeave = () => {
		onJoinOrLeaveCommunity(communityData, isJoined);
	};

	useEffect(() => {
		if (!user) setCommunityLoading(false);
	}, [user]);

	return (
		<div className="bg-white w-full flex flex-col items-center">
			{communityStateValue.currentCommunity.imageURL ? (
				<Link
					href={communityStateValue.currentCommunity.imageURL}
					target="_blank"
					className="w-full h-max"
				>
					<div className="w-full h-24 bg-blue-400 overflow-hidden flex flex-col items-center justify-center">
						<Image
							src={communityStateValue.currentCommunity.imageURL}
							alt={`${communityData.name} image`}
							width={256}
							height={256}
							loading="lazy"
							className="w-full rounded-full bg-auto bg-center"
						/>
					</div>
				</Link>
			) : (
				<div className="w-full h-max">
					<div className="w-full h-24 bg-blue-400"></div>
				</div>
			)}
			<div className="max-w-6xl w-full flex flex-col px-6">
				<div className="relative w-full flex flex-row gap-x-4">
					<div className="border-4 border-solid border-white aspect-square w-20 h-20 rounded-full bg-white translate-y-[-20%]">
						{communityStateValue.currentCommunity.imageURL ? (
							<Image
								src={communityStateValue.currentCommunity.imageURL}
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
			</div>
		</div>
	);
};

export default Header;
