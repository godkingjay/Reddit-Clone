import React from "react";
import { CommentInput } from "./CommentSection";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import ErrorBanner from "@/components/Banner/ErrorBanner";
import { AiFillWarning } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";

type SinglePostCommentInputProps = {
	commentInput: CommentInput;
	commentingError: string;
	isCreatingComment: boolean;
	handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onCreateComment: (e: React.FormEvent<HTMLFormElement>) => void;
	loadingPostComments?: boolean;
};

const SinglePostCommentInput: React.FC<SinglePostCommentInputProps> = ({
	commentInput,
	commentingError,
	isCreatingComment,
	handleTextChange,
	onCreateComment,
	loadingPostComments,
}) => {
	return (
		<form
			className="w-full border rounded-md relative"
			onSubmit={onCreateComment}
		>
			<textarea
				required
				name="text"
				title="Comment Text"
				placeholder="What are your thoughts?"
				className="flex-1 min-w-0 outline-none text-sm bg-transparent break-words resize-none p-2 min-h-[160px] w-full"
				minLength={1}
				maxLength={40000}
				onChange={(e) => {
					handleTextChange(e);
					e.currentTarget.style.height = "0px";
					e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
				}}
				rows={1}
				value={commentInput.text}
				disabled={isCreatingComment || loadingPostComments}
			/>
			<div className="sticky bottom-0 w-full">
				<div className="w-full flex flex-col">
					{commentingError && (
						<div className="w-full bg-red-300 p-2">
							<div className="flex flex-row w-full items-center gap-x-2 text-sm font-semibold text-red-700">
								<div className="h-6 w-6 aspect-square text-red-700 break-words">
									<BiErrorCircle className="h-full w-full" />
								</div>
								<p>Commenting Error</p>
							</div>
						</div>
					)}
					<div className="flex flex-row bg-gray-300 h-full w-full rounded-b-md items-center px-2 py-1">
						<div className="ml-auto">
							<button
								title="Comment"
								type="submit"
								className="page-button bg-blue-600 border-blue-600 disabled:bg-gray-500 h-8 disabled:border-gray-500 disabled:cursor-none disabled:pointer-events-none text-xs px-4 hover:bg-blue-700 hover:border-blue-700 focus:bg-blue-700 focus:border-blue-700 outline-offset-0 min-w-0 w-24 flex flex-row items-center justify-center"
								disabled={isCreatingComment || commentInput.text.length === 0}
							>
								{isCreatingComment || loadingPostComments ? (
									<LoadingSpinner className="loading-spinner-button aspect-square w-6 animate-spin" />
								) : (
									<span>Comment</span>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default SinglePostCommentInput;
