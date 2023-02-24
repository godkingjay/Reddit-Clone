import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
	id: string;
	creatorId: string;
	createdAt?: Timestamp;
	name: string;
	numberOfMembers: number;
	privacyType: "public" | "restricted" | "private";
	imageURL?: string;
}

interface CommunitySnippet {
	communityId: string;
	isModerator?: boolean;
	imageURL?: string;
}

interface CommunityState {
	communitySnippets: CommunitySnippet[];
}

const defaultCommunityState: CommunityState = {
	communitySnippets: [],
};

export const communityState = atom<CommunityState>({
	key: "communityState",
	default: defaultCommunityState,
});
