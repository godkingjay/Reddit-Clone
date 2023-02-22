import { Timestamp } from "firebase/firestore";

export interface Community {
	id: string;
	creatorId: string;
	createdAt?: Timestamp;
	name: string;
	numberOfMembers: number;
	privacyType: "public" | "restricted" | "private";
	imageURL?: string;
}
