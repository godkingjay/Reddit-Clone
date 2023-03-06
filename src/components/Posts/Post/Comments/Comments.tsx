import { CommentState } from "@/atoms/commentAtom";
import React from "react";

type CommentsProps = {
	comments: CommentState["comments"];
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
	return (
		<div>
			{comments.map((comment) => (
				<div key={comment.id}>
					<p>{comment.text}</p>
				</div>
			))}
		</div>
	);
};

export default Comments;
