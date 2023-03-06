import { Comment, CommentState } from "@/atoms/commentAtom";
import React from "react";
import CommentItem from "./CommentItem";
import { UserAuth } from "@/pages/_app";

type CommentsProps = {
	comments: CommentState["comments"];
	onDeleteComment: (comment: Comment) => void;
	user?: UserAuth["user"] | null;
};

const Comments: React.FC<CommentsProps> = ({
	comments,
	onDeleteComment,
	user,
}) => {
	return (
		<div className="px-4 pb-4 flex flex-col gap-y-4">
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					comment={comment}
					onDeleteComment={onDeleteComment}
					userId={user?.uid || ""}
				/>
			))}
		</div>
	);
};

export default Comments;
