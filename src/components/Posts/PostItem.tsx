import { Post } from "@/atoms/postAtom";
import React from "react";

type PostItemProps = {
	post: Post;
	userIsCreator: boolean;
	userVoteValue: number;
	onVote: () => {};
	onDeletePost: () => {};
	onSelectPost: () => {};
};

const PostItem: React.FC<PostItemProps> = ({
	onDeletePost,
	onSelectPost,
	onVote,
	post,
	userIsCreator,
	userVoteValue,
}) => {
	return <div>PostItem</div>;
};

export default PostItem;
