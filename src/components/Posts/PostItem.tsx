import { Post } from "@/atoms/postAtom";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { BiMessageSquare, BiMessageSquareDetail } from "react-icons/bi";
import { FaRegShareSquare, FaRegSquare } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
	IoArrowDownCircle,
	IoArrowDownCircleOutline,
	IoArrowUp,
	IoArrowUpCircle,
	IoArrowUpCircleOutline,
	IoArrowUpOutline,
} from "react-icons/io5";

type PostItemProps = {
	post: Post;
	userIsCreator: boolean;
	userVoteValue: number | undefined;
	onVote: () => {};
	onDeletePost: () => {};
	onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
	onDeletePost,
	onSelectPost,
	onVote,
	post,
	userIsCreator,
	userVoteValue,
}) => {
	const [currentImageAndVideoIndex, setCurrentImageAndVideoIndex] = useState(0);

	return (
		<div
			className="bordered-box-1 bg-white rounded-md cursor-pointer w-full hover:border-gray-500 focus:border-gray-500"
			tabIndex={0}
			onClick={onSelectPost}
		>
			<div className="post-card-wrapper w-full flex flex-row">
				<div className="post-card-container flex flex-col bg-gray-100 p-2 items-center rounded-l-md gap-y-1">
					<button
						type="button"
						title="Upvote"
						className="h-7 w-7 aspect-square hover:text-brand-100 focus:text-brand-100"
						onClick={onVote}
					>
						{userVoteValue === 1 ? (
							<IoArrowUpCircle className="h-full w-full text-brand-100" />
						) : (
							<IoArrowUpCircleOutline className="h-full w-full" />
						)}
					</button>
					<p className="font-bold">{post.voteStatus}</p>
					<button
						type="button"
						title="Downvote"
						className="h-7 w-7 aspect-square hover:text-blue-500 focus:text-blue-500"
						onClick={onVote}
					>
						{userVoteValue === -1 ? (
							<IoArrowDownCircle className="h-full w-full text-blue-500" />
						) : (
							<IoArrowDownCircleOutline className="h-full w-full" />
						)}
					</button>
				</div>
				<div className="flex flex-col p-2 gap-y-2 w-full">
					<div className="flex flex-row gap-x-1 items-center text-xs text-gray-500">
						<p>
							<span>Posted by </span>u/<span>{post.creatorDisplayName} </span>
							<span>
								{moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
							</span>
						</p>
					</div>
					<h2 className="text-sm font-bold">{post.title}</h2>
					<div className="w-full">
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
					{post.imagesAndVideos && (
						<div className="post-iv-wrapper w-full aspect-[3/2] mt-4">
							<div className="relative post-iv-container w-full h-full p-4 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-300 focus-within:bg-gray-300">
								{currentImageAndVideoIndex > 0 && (
									<button
										type="button"
										title="Previous Image"
										className="bg-white h-10 w-10 rounded-full border-2 border-solid absolute top-[50%] left-0 translate-x-[-4px] translate-y-[-50%] shadow-md border-transparent text-gray-500 flex items-center justify-center hover:border-brand-100 hover:text-brand-100 focus:border-brand-100 focus:text-brand-100"
										onClick={() =>
											setCurrentImageAndVideoIndex((prev) => prev - 1)
										}
									>
										<HiChevronLeft className="h-full w-full" />
									</button>
								)}
								<Image
									src={post.imagesAndVideos[currentImageAndVideoIndex].url}
									alt={post.imagesAndVideos[currentImageAndVideoIndex].name}
									width={720}
									height={460}
									className="h-full w-full object-contain"
									loading="lazy"
								/>
								{currentImageAndVideoIndex <
									post.imagesAndVideos.length - 1 && (
									<button
										type="button"
										title="Previous Image"
										className="bg-white h-10 w-10 rounded-full border-2 border-solid absolute top-[50%] right-0 translate-x-[4px] translate-y-[-50%] shadow-md border-transparent text-gray-500 flex items-center justify-center hover:border-brand-100 hover:text-brand-100 focus:border-brand-100 focus:text-brand-100"
										onClick={() =>
											setCurrentImageAndVideoIndex((prev) => prev + 1)
										}
									>
										<HiChevronRight className="h-full w-full" />
									</button>
								)}
							</div>
						</div>
					)}
					<div className="post-footer-buttons bg-white flex flex-row items-center gap-x-2">
						<button
							type="button"
							title="Comments"
							className="p-2 flex flex-row items-center text-gray-500 gap-x-1 rounded-md hover:bg-gray-200 focus:bg-gray-200"
						>
							<div className="aspect-square h-6 w-6">
								<BiMessageSquareDetail className="h-full w-full" />
							</div>
							<p className="font-semibold text-sm">
								{post.numberOfComments} Comments
							</p>
						</button>
						<button
							type="button"
							title="Comments"
							className="p-2 flex flex-row items-center text-gray-500 gap-x-1 rounded-md hover:bg-gray-200 focus:bg-gray-200"
						>
							<div className="aspect-square h-6 w-6">
								<FaRegShareSquare className="h-full w-full" />
							</div>
							<p className="font-semibold text-sm">Share</p>
						</button>
						<button
							type="button"
							title="Comments"
							className="p-2 flex flex-row items-center text-gray-500 gap-x-1 rounded-md hover:bg-gray-200 focus:bg-gray-200"
						>
							<div className="aspect-square h-6 w-6">
								<BiMessageSquareDetail className="h-full w-full" />
							</div>
							<p className="font-semibold text-sm">Comments</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
