import { Post } from "@/atoms/postAtom";
import React, { useEffect, useState } from "react";
import SinglePostCommentInput from "./SinglePostCommentInput";
import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import useComment from "@/hooks/useComment";
import { UserAuth } from "@/pages/_app";
import Comments from "./Comments/Comments";
import CommentSkeleton from "@/components/Skeletons/CommentSkeleton";

type CommentSectionProps = {
	user?: UserAuth["user"] | null;
	selectedPost: Post;
	communityId: string;
	loadingPostComments?: boolean;
};

export type CommentInput = {
	text: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({
	user,
	selectedPost,
	communityId,
	loadingPostComments,
}) => {
	const { commentStateValue, createComment, onDeleteComment } = useComment();

	const [commentInput, setCommentInput] = useState<CommentInput>({
		text: "",
	});
	const [isCreatingComment, setIsCreatingComment] = useState(false);
	const [commentingError, setCommentingError] = useState("");

	const setAuthModalState = useSetRecoilState(authModalState);

	const onCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCommentingError("");
		setIsCreatingComment(true);
		try {
			await createComment(commentInput);
			setCommentInput((prev) => ({
				...prev,
				text: "",
			}));
		} catch (error: any) {
			console.log("Posting Comment Error:", error.message);
			setCommentingError(error.message);
		}
		setIsCreatingComment(false);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentingError("");
		setCommentInput({
			...commentInput,
			[e.target.name]: e.target.value,
		});
	};

	const authModalChange = (view: AuthModalState["view"]) => {
		setAuthModalState((prev) => ({
			...prev,
			open: true,
			view,
		}));
	};

	return (
		<section className="bordered-box-1 rounded-md flex flex-col bg-white">
			<div className="w-full px-8 py-8 flex flex-col">
				{selectedPost && (
					<>
						{user ? (
							<SinglePostCommentInput
								commentInput={commentInput}
								isCreatingComment={isCreatingComment}
								handleTextChange={handleTextChange}
								onCreateComment={onCreateComment}
								commentingError={commentingError}
								loadingPostComments={loadingPostComments}
							/>
						) : (
							<div className="w-full">
								<div className="border-2 bg-gray-200 p-4 rounded-lg flex flex-row justify-between items-center">
									<p className="font-bold">Login to comment</p>
									<button
										type="button"
										title="Login"
										className="page-button text-xs hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600 outline-offset-0"
										onClick={() => authModalChange("login")}
									>
										Login
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			{!loadingPostComments ? (
				<>
					{commentStateValue.comments.length > 0 && (
						<Comments
							comments={commentStateValue.comments}
							onDeleteComment={onDeleteComment}
							user={user}
						/>
					)}
				</>
			) : (
				<div className="flex flex-col p-4 gap-y-4">
					<CommentSkeleton />
					<CommentSkeleton />
				</div>
			)}
		</section>
	);
};

export default CommentSection;
