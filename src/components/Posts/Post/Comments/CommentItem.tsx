import { Comment } from "@/atoms/commentAtom";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BsReddit, BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import {
	IoArrowDownCircleOutline,
	IoArrowUpCircleOutline,
} from "react-icons/io5";

import LoadingSpinner from "public/svg/loading-spinner.svg";

type CommentItemProps = {
	comment: Comment;
	onDeleteComment: (comment: Comment) => void;
	userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	onDeleteComment,
	userId,
}) => {
	const [deletingComment, setDeletingComment] = useState(false);
	const commentMenuRef = useRef<HTMLDetailsElement>(null);

	const handleDeleteComment = async (comment: Comment) => {
		setDeletingComment(true);
		try {
			await onDeleteComment(comment);
		} catch (error: any) {
			console.log("Deleting Comment Error:", error.message);
		}
		setDeletingComment(false);
	};

	useEffect(() => {
		if (deletingComment) {
			commentMenuRef.current?.removeAttribute("open");
		}
	}, [deletingComment]);

	return (
		<div className="grid grid-rows-[48px_1fr] grid-cols-[48px_1fr] relative">
			<div className="col-start-1 col-end-2 row-start-1 row-end-2 w-full h-full grid place-items-center">
				<div className="h-full w-full p-2 text-red-300">
					<BsReddit className="w-full h-full" />
				</div>
			</div>
			<div className="col-start-2 col-end-3 row-start-1 row-end-2 h-full flex flex-row items-center gap-x-1 text-xs text-gray-500">
				<p className="text-black">{comment.creatorDisplayName}</p>
				<p>•</p>
				<p>{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</p>
			</div>
			<div className="col-start-1 col-end-2 row-start-2 row-end-3 w-full h-full relative flex flex-col items-center">
				<div className="w-[1px] h-full bg-gray-300"></div>
			</div>
			<div className="col-start-2 col-end-3 row-start-2 row-end-3 h-max block">
				<div className="flex flex-col">
					<div className="whitespace-normal block">
						<p className="break-all text-sm">{comment.text}</p>
					</div>
					<div className="h-max w-auto relative">
						<div className="flex flex-row text-gray-500 py-2 items-center gap-x-1 text-sm">
							<div
								className="h-6 w-6 hover:text-brand-100 cursor-pointer focus:to-brand-100"
								tabIndex={0}
							>
								<IoArrowUpCircleOutline className="h-full w-full" />
							</div>
							<p className="hover:font-bold hover:text-black">0</p>
							<div
								className="h-6 w-6 hover:text-blue-500 cursor-pointer focus:to-blue-500"
								tabIndex={0}
							>
								<IoArrowDownCircleOutline className="h-full w-full" />
							</div>
							<details
								className="flex flex-row items-center [&[open]>summary]:bg-gray-200 relative"
								ref={commentMenuRef}
							>
								<summary
									className="list-none aspect-square h-6 w-6 p-1 text-gray-500 rounded-full hover:bg-gray-200 focus:bg-gray-200 cursor-pointer"
									onClick={(e) => e.stopPropagation()}
								>
									<BsThreeDots className="h-full w-full" />
								</summary>
								<div className="absolute h-max w-max min-w-[160px] bg-white left-0 bottom-[125%] shadow-[_0_0_8px_#0002] overflow-hidden rounded-md">
									<ul className="comment-others-menu py-1">
										{userId === comment.creatorId && (
											<li className="item">
												<button
													type="button"
													title="Delete Post"
													className="button delete h-8"
													onClick={() => handleDeleteComment(comment)}
												>
													<FaRegTrashAlt className="icon !h-5 !w-5" />
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
			</div>
			{deletingComment && (
				<div className="absolute h-full w-full bg-red-800 bg-opacity-30 rounded-md border grid place-items-center">
					<div className="h-full flex flex-col justify-center items-center gap-y-2">
						<div className="h-8 w-8 aspect-square">
							<LoadingSpinner className="loading-spinner-brand animate-spin" />
						</div>
						<h2 className="text-xs font-bold text-white">Deleting Comment</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentItem;
