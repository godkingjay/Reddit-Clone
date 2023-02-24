import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
	id: string;
	creatorId: string;
	createdAt?: Timestamp;
	name: string;
	members: number;
	privacyType: "public" | "restricted" | "private";
	imageURL?: string;
}

export interface UserCommunity {
	communityId: string;
	isModerator?: boolean;
	imageURL?: string;
}

export interface CommunityState {
	userCommunities: UserCommunity[];
}

const defaultCommunityState: CommunityState = {
	userCommunities: [],
};

export const communityState = atom<CommunityState>({
	key: "communityState",
	default: defaultCommunityState,
});
