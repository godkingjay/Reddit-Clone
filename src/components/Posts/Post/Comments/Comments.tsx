import { CommentState } from "@/atoms/commentAtom";
import React from "react";

type CommentsProps = {
	commentStateValue: CommentState;
};

const Comments: React.FC<CommentsProps> = ({ commentStateValue }) => {
	return <div>Comments</div>;
};

export default Comments;
