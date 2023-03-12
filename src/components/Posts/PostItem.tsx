import { Post } from "@/atoms/postAtom";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegBookmark, FaRegShareSquare, FaRegTrashAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
	IoArrowDownCircle,
	IoArrowDownCircleOutline,
	IoArrowUpCircle,
	IoArrowUpCircleOutline,
} from "react-icons/io5";
import ImageAndVideoLoading from "../Skeletons/ImageAndVideoLoading";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import ErrorBanner from "../Banner/ErrorBanner";
import { FiCopy } from "react-icons/fi";
import { useRouter } from "next/router";
import CommentSection from "./Post/CommentSection";
import { UserAuth } from "@/pages/_app";
import Link from "next/link";
import NoCommunityImage from "public/svg/community-no-image.svg";

type PostItemProps = {
	post: Post;
	userIsCreator: boolean;
	userVoteValue: number | undefined;
	onVote: (post: Post, vote: number, communityId: string) => void;
	onDeletePost: (post: Post) => Promise<boolean>;
	onSelectPost?: (post: Post) => void;
	user?: UserAuth["user"] | null;
	loadingPostComments?: boolean;
	homePage?: boolean;
};

/**
 *
 *
 * @param {*} {
 * 	onDeletePost,
 * 	onSelectPost,
 * 	onVote,
 * 	post,
 * 	userIsCreator,
 * 	userVoteValue,
 * }
 * @return {*}
 */
const PostItem: React.FC<PostItemProps> = ({
	onDeletePost,
	onSelectPost,
	onVote,
	post,
	userIsCreator,
	userVoteValue,
	user,
	loadingPostComments,
	homePage,
}) => {
	const router = useRouter();
	const [currentImageAndVideoIndex, setCurrentImageAndVideoIndex] = useState(0);
	const [loadingImageAndVideo, setLoadingImageAndVideo] = useState(true);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [deletionError, setDeletionError] = useState("");
	const singlePostPage = !onSelectPost;

	const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setDeletionError("");
		setLoadingDelete(true);
		try {
			const success = await onDeletePost(post);
			if (!success) {
				throw new Error("Post Deletion Failed");
			}
		} catch (error: any) {
			console.log("Post Deletion Error:", error.message);
			setDeletionError(error.message);
		}
		setLoadingDelete(false);
	};

	const handlePostVote = (
		e: React.MouseEvent<HTMLButtonElement>,
		vote: number
	) => {
		e.stopPropagation();
		onVote(post, vote, post.communityId);
	};

	const handleImageAndVideoNavigation = (
		e: React.MouseEvent<HTMLButtonElement>,
		change: number
	) => {
		e.stopPropagation();
		setCurrentImageAndVideoIndex((prev) => prev + change);
		setLoadingImageAndVideo(true);
	};

	const handleCopyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const origin = typeof window !== "undefined" ? window.location.origin : "";
		const URL = `${origin}/r/${post.communityId}/comments/${post.id}`;
		navigator.clipboard.writeText(URL);
		alert("Link Copied to Clipboard");
	};

	const handleClickCommunity = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		router.push(`/r/${post.communityId}`);
	};

	return (
		<div className="flex flex-col w-full gap-y-4">
			<div
				className={`bordered-box-1 bg-white rounded-md flex flex-col relative
				${!loadingDelete && !singlePostPage && "cursor-pointer"}
				${!singlePostPage && "hover:border-gray-500 focus:border-gray-500"}
				${singlePostPage ? "" : ""}
				`}
				tabIndex={!singlePostPage ? 0 : -1}
				onClick={() => !loadingDelete && !singlePostPage && onSelectPost(post)}
			>
				<div
					className={`post-card-wrapper flex flex-row ${
						loadingDelete && "blur-xs"
					}`}
				>
					<div
						className={`post-card-container flex flex-col p-2 items-center rounded-l-md gap-y-1 w-10 ${
							!singlePostPage ? "bg-gray-100" : "bg-none"
						}`}
					>
						<button
							type="button"
							title="Upvote"
							className="h-7 w-7 aspect-square text-gray-400 hover:text-brand-100 focus:text-brand-100"
							onClick={(e) => handlePostVote(e, 1)}
						>
							{userVoteValue === 1 ? (
								<IoArrowUpCircle className="h-full w-full text-brand-100" />
							) : (
								<IoArrowUpCircleOutline className="h-full w-full" />
							)}
						</button>
						<p
							className={`font-bold ${
								userVoteValue === 1
									? "text-brand-100"
									: userVoteValue === -1
									? "text-blue-500"
									: "text-gray-800"
							}`}
						>
							{post.voteStatus}
						</p>
						<button
							type="button"
							title="Downvote"
							className="h-7 w-7 aspect-square text-gray-400 hover:text-blue-500 focus:text-blue-500"
							onClick={(e) => handlePostVote(e, -1)}
						>
							{userVoteValue === -1 ? (
								<IoArrowDownCircle className="h-full w-full text-blue-500" />
							) : (
								<IoArrowDownCircleOutline className="h-full w-full" />
							)}
						</button>
					</div>
					<div className="flex flex-col p-2 gap-y-2 flex-1">
						<div className="flex flex-row items-center text-xs text-gray-500">
							{homePage && (
								<>
									<button
										type="button"
										title={`Go to r/${post.communityId} community`}
										className="h-full flex flex-row items-center gap-x-1 font-bold text-black hover:underline focus:underline"
										onClick={handleClickCommunity}
									>
										<div className="aspect-square w-4 h-4 rounded-full bg-gray-100">
											{post.communityImageURL ? (
												<Image
													src={post.communityImageURL}
													alt={`${post.id} image`}
													width={256}
													height={256}
													loading="lazy"
													className="w-full h-full rounded-full bg-contain bg-center"
												/>
											) : (
												<NoCommunityImage className="w-full h-full rounder-full fill-blue-500" />
											)}
										</div>
										<p>r/{post.communityId}</p>
									</button>
									<div className="h-4 w-4 aspect-square">
										<BsDot className="h-full w-full" />
									</div>
								</>
							)}
							<p>
								<span>Posted by </span>u/<span>{post.creatorDisplayName} </span>
								<span>
									{moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
								</span>
							</p>
						</div>
						<h2 className="text-sm font-bold">{post.title}</h2>
						{post.body && (
							<div>
								<p
									className="text-xs break-all text-left"
									style={{
										hyphens: "auto",
										msHyphens: "auto",
										MozHyphens: "auto",
										WebkitHyphens: "auto",
									}}
								>
									{post.body}
								</p>
							</div>
						)}
						{post.imagesAndVideos && (
							<div className="post-iv-wrapper w-full h-[480px] mt-4">
								<div className="relative post-iv-container w-full h-full p-4 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-300 focus-within:bg-gray-300">
									{currentImageAndVideoIndex > 0 && (
										<button
											type="button"
											title="Previous Image"
											className="bg-white h-10 w-10 rounded-full border-2 border-solid absolute top-[50%] left-0 translate-x-[-4px] translate-y-[-50%] shadow-md border-transparent text-gray-500 flex items-center justify-center hover:border-brand-100 hover:text-brand-100 focus:border-brand-100 focus:text-brand-100"
											onClick={(e) => {
												handleImageAndVideoNavigation(e, -1);
											}}
										>
											<HiChevronLeft className="h-full w-full" />
										</button>
									)}
									{loadingImageAndVideo && <ImageAndVideoLoading />}
									<Image
										src={post.imagesAndVideos[currentImageAndVideoIndex].url}
										alt={post.imagesAndVideos[currentImageAndVideoIndex].name}
										width={720}
										height={460}
										className="h-full w-full object-contain"
										loading="lazy"
										onLoad={() => setLoadingImageAndVideo(false)}
									/>
									{currentImageAndVideoIndex <
										post.imagesAndVideos.length - 1 && (
										<button
											type="button"
											title="Previous Image"
											className="bg-white h-10 w-10 rounded-full border-2 border-solid absolute top-[50%] right-0 translate-x-[4px] translate-y-[-50%] shadow-md border-transparent text-gray-500 flex items-center justify-center hover:border-brand-100 hover:text-brand-100 focus:border-brand-100 focus:text-brand-100"
											onClick={(e) => {
												handleImageAndVideoNavigation(e, 1);
											}}
										>
											<HiChevronRight className="h-full w-full" />
										</button>
									)}
								</div>
							</div>
						)}
						<div className="post-footer-buttons bg-white flex flex-row items-center gap-x-2 relative">
							<button
								type="button"
								title="Comments"
								className="p-2 flex flex-row items-center text-gray-500 gap-x-2 rounded-md hover:bg-gray-200 focus:bg-gray-200"
							>
								<div className="aspect-square h-6 w-6">
									<BiMessageSquareDetail className="h-full w-full" />
								</div>
								<p className="font-semibold text-sm">
									{post.numberOfComments}
									<span className="hidden xs:inline"> Comments</span>
								</p>
							</button>
							<details className="[&[open]>summary]:bg-gray-200 relative" onClick={(e) => e.stopPropagation()}>
								<summary
									title="Comments"
									className="list-none p-2 flex flex-row items-center text-gray-500 gap-x-2 rounded-md hover:bg-gray-200 focus:bg-gray-200 cursor-pointer"
								>
									<div className="aspect-square h-6 w-6">
										<FaRegShareSquare className="h-full w-full" />
									</div>
									<p className="font-semibold text-sm hidden xs:inline">
										Share
									</p>
								</summary>
								<div className="absolute h-max w-max min-w-[160px] bg-white left-0 bottom-[110%] shadow-[_0_0_8px_#0004] overflow-hidden rounded-md">
									<ul className="post-others-menu py-1">
										<li className="item">
											<button
												type="button"
												title="Copy Link"
												className="button"
												onClick={handleCopyLink}
											>
												<FiCopy className="icon" />
												<p className="label">Copy Link</p>
											</button>
										</li>
									</ul>
								</div>
							</details>
							<button
								type="button"
								title="Comments"
								className="p-2 flex flex-row items-center text-gray-500 gap-x-2 rounded-md hover:bg-gray-200 focus:bg-gray-200"
							>
								<div className="aspect-square h-6 w-6">
									<FaRegBookmark className="h-full w-full" />
								</div>
								<p className="font-semibold text-sm hidden xs:inline">
									Bookmark
								</p>
							</button>
							<details className="ml-auto flex flex-row items-center [&[open]>summary]:bg-gray-200">
								<summary
									className="list-none aspect-square h-8 w-8 p-1 text-gray-500 rounded-md hover:bg-gray-200 focus:bg-gray-200"
									onClick={(e) => e.stopPropagation()}
								>
									<BsThreeDots className="h-full w-full" />
								</summary>
								<div className="absolute h-max w-max min-w-[160px] bg-white right-0 bottom-[110%] shadow-[_0_0_8px_#0002] overflow-hidden rounded-md">
									<ul className="post-others-menu py-1">
										{userIsCreator && (
											<li className="item">
												<button
													type="button"
													title="Delete Post"
													className="button delete"
													onClick={handleDeletePost}
												>
													<FaRegTrashAlt className="icon" />
													<p className="label">Delete</p>
												</button>
											</li>
										)}
									</ul>
								</div>
							</details>
						</div>
					</div>
				</div>
				{loadingDelete && (
					<div className="absolute h-full w-full bg-red-500 bg-opacity-10 rounded-md border grid place-items-center">
						<div className="h-full flex flex-col justify-center items-center gap-y-2">
							<div className="h-8 w-8 aspect-square">
								<LoadingSpinner className="loading-spinner-brand animate-spin" />
							</div>
							<h2 className="text-sm font-bold text-gray-700">Deleting Post</h2>
						</div>
					</div>
				)}
				{deletionError && (
					<div className="overflow-hidden rounded-b-md">
						<ErrorBanner
							title="Error Deleting Post"
							setError={setDeletionError}
						/>
					</div>
				)}
			</div>
			{singlePostPage && (
				<CommentSection
					user={user}
					selectedPost={post}
					communityId={post.communityId}
					loadingPostComments={loadingPostComments}
				/>
			)}
		</div>
	);
};

export default PostItem;
