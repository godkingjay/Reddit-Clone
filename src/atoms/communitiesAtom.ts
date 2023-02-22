import { Timestamp } from "firebase/firestore";

export interface Community {
	id: string;
	creatorId: string;
	createdAt?: Timestamp;
	communityName: string;
	numberOfMembers: number;
	privacyType: "public" | "restricted" | "private";
	imageURL?: string;
}
