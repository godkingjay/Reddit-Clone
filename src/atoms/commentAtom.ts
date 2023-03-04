import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

/**
 *
 *
 * @export
 * @interface Comment
 */
export interface Comment {
	id: string;
	creatorId: string;
	creatorDisplayName: string;
	communityId: string;
	postId: string;
	postTitle: string;
	text: string;
	createdAt: Timestamp;
}

export type CommentState = {
	comments: Comment[];
};

export const defaultCommentState: CommentState = {
	comments: [],
};

export const commentState = atom<CommentState>({
	key: "commentState",
	default: defaultCommentState,
});
