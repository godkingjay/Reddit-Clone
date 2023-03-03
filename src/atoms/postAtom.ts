import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type ImagesAndVideos = {
	id: string;
	name: string;
	postId: string;
	type: string;
	url: string;
	path: string;
};

export type Post = {
	id: string;
	communityId: string;
	creatorId: string;
	creatorDisplayName: string;
	title: string;
	body: string;
	numberOfComments: number;
	voteStatus: number;
	communityImageURL?: string;
	createdAt: Timestamp;
	imagesAndVideos?: ImagesAndVideos[];
};

export type PostVote = {
	id: string;
	postId: string;
	communityId: string;
	voteValue: number;
};

interface PostState {
	selectedPost: Post | null;
	posts: Post[];
	postVotes: PostVote[];
}

const defaultPostState: PostState = {
	selectedPost: null,
	posts: [],
	postVotes: [],
};

export const postState = atom<PostState>({
	key: "postState",
	default: defaultPostState,
});
