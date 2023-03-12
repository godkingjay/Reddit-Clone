import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoCommunityImage from "public/svg/community-no-image.svg";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import Link from "next/link";
import useDirectory from "@/hooks/useDirectory";
import { useSetRecoilState } from "recoil";
import { communityModalState } from "@/atoms/communityModalAtom";

type RecommendationsProps = {};

const Recommendations: React.FC<RecommendationsProps> = () => {
	const [communities, setCommunities] = useState<Community[]>();
	const [loadingCommunities, setLoadingCommunities] = useState(false);
	const { onJoinOrLeaveCommunity, communityStateValue } = useCommunityData();
	const [memberLoading, setMemberLoading] = useState(false);
	const { setDirectoryOpen } = useDirectory();
	const setCommunityModal = useSetRecoilState(communityModalState);

	const getCommunityRecommendations = async () => {
		setLoadingCommunities(true);
		try {
			const communityQuery = query(
				collection(firestore, "communities"),
				orderBy("members", "desc")
			);

			const communityDocs = await getDocs(communityQuery);

			const communities = communityDocs.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setCommunities(communities as Community[]);
		} catch (error: any) {
			console.log("Error getting community recommendations: ", error.message);
		}
		setLoadingCommunities(false);
	};

	const handleJoinOrLeave = async (
		communityData: Community,
		isJoined: boolean
	) => {
		onJoinOrLeaveCommunity(communityData, isJoined);
	};

	const handleCreatePost = () => {
		setDirectoryOpen((prev) => ({
			...prev,
			open: true,
		}));
	};

	const handleCreateCommunity = () => {
		setCommunityModal((prev) => ({
			...prev,
			open: true,
			view: "create",
		}));
	};

	useEffect(() => {
		getCommunityRecommendations();
	}, []);

	return (
		<div className="w-full flex flex-col gap-y-4">
			<div className="flex flex-col w-full bordered-box-1 bg-white rounded-md">
				<div className="w-full z-10 relative h-20 overflow-hidden rounded-t-md flex flex-col justify-end p-2">
					<Image
						src={"/images/recCommsArt.png"}
						alt="Recommendations"
						height={256}
						width={256}
						loading="lazy"
						className="w-full -z-10 absolute right-0 top-[50%] translate-y-[-50%]"
					/>
					<div className="w-full h-full -z-10 absolute right-0 top-[50%] translate-y-[-50%] bg-gradient-to-t from-[#000a] to-[#0000]"></div>
					<p className="text-white font-bold">Top Communities</p>
				</div>
				<div className="flex flex-col w-full py-2">
					{communities?.map((community, index) => {
						const isJoined = !!communityStateValue.userCommunities?.find(
							(userCommunity) =>
								userCommunity.communityId === community.id ? true : false
						);

						return (
							<div
								key={community.id}
								className="flex flex-col w-full"
							>
								<div className="flex flex-row w-full items-center p-2">
									<div className="h-8 w-8 grid place-items-center">
										<p>{index + 1}</p>
									</div>
									<Link
										href={`/r/${community.id}`}
										className="flex-1 h-full flex flex-row items-center gap-x-2 truncate hover:underline"
									>
										<div className="h-8 w-8 aspect-square rounded-full bg-gray-100 overflow-hidden">
											{community.imageURL ? (
												<Image
													src={community.imageURL}
													alt={`${community.id} image`}
													width={256}
													height={256}
													loading="lazy"
													className="w-full h-full rounded-full bg-contain bg-center"
												/>
											) : (
												<NoCommunityImage className="w-full h-full rounder-full fill-blue-500" />
											)}
										</div>
										<p className="font-semibold text-sm truncate flex-1">
											r/{community.id}
										</p>
									</Link>
									<div className="w-max">
										<button
											type="button"
											title={isJoined ? "Leave" : "Join"}
											className={`
                        page-button outline-offset-0 ${
													isJoined
														? "text-blue-500 bg-transparent hover:bg-blue-500 hover:bg-opacity-10 focus-within:bg-blue-500 focus-within:bg-opacity-10"
														: "hover:bg-blue-600 hover:border-blue-600 focus-within:bg-blue-600 focus-within:border-blue-600"
												}
                        w-[108px] py-1.5 group flex flex-row justify-center items-center gap-x-1.5
                      `}
											onClick={async (e) => {
												e.stopPropagation();
												handleJoinOrLeave(community, isJoined);
											}}
											disabled={memberLoading || loadingCommunities}
										>
											{!memberLoading ? (
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
                            ${
															isJoined
																? "[&>path]:stroke-blue-500"
																: "[&>path]:stroke-white"
														}
                          `}
												/>
											)}
										</button>
									</div>
								</div>
								<div className="h-[1px] w-full bg-gray-100"></div>
							</div>
						);
					})}
					<div className="w-full p-4">
						<button
							type="button"
							title="View All"
							className="page-button max-w-none min-w-0 w-full hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
						>
							View All
						</button>
					</div>
				</div>
			</div>
			<div className="w-full bordered-box-1 rounded-md bg-white">
				<div className="w-full flex flex-col">
					<div className="w-full h-12 rounded-t-md overflow-hidden">
						<Image
							src={"/images/redditPersonalHome.png"}
							alt="Reddit Personal Home"
							height={256}
							width={256}
							loading="lazy"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex flex-row items-center w-full gap-x-4 px-4">
						<div className="h-12 w-12 aspect-square translate-y-[-20%]">
							<Image
								src={"/images/redditFace.svg"}
								alt="Reddit Personal Home"
								height={256}
								width={256}
								loading="lazy"
								className="w-full h-full object-cover"
							/>
						</div>
						<p className="font-bold">Home</p>
					</div>
					<div className="flex flex-col p-4 pt-0 gap-y-2">
						<p className="text-sm">
							Your personal Reddit frontpage. Come here to check in with your
							favorite communities.
						</p>
						<div className="divider h-[1px] bg-gray-100"></div>
						<button
							type="button"
							title="Create Post"
							className="page-button max-w-none min-w-0 w-full hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
							onClick={handleCreatePost}
						>
							Create Post
						</button>
						<button
							type="button"
							title="Create Community"
							className="page-button max-w-none min-w-0 w-full bg-brand-100 border-brand-100 hover:bg-brand-200 hover:border-brand-200 focus:bg-brand-200 focus:border-brand-200"
							onClick={handleCreateCommunity}
						>
							Create Community
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recommendations;
