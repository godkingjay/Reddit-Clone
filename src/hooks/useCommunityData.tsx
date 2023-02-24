import {
	Community,
	UserCommunity,
	communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
	collection,
	doc,
	getDocs,
	increment,
	writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("false");

	const getUserCommunities = async () => {
		setLoading(true);
		try {
			const userCommunityDocs = await getDocs(
				collection(firestore, `users/${user?.uid}/userCommunities`)
			);

			const communities = userCommunityDocs.docs.map((doc) => ({
				...doc.data(),
			}));
			setCommunityStateValue((prev) => ({
				...prev,
				userCommunities: communities as UserCommunity[],
			}));
		} catch (error: any) {
			console.log("fetchError: CommunitySnippets - ", error);
			setError(error.message);
		}
		setLoading(false);
	};

	const onJoinOrLeaveCommunity = (
		communityData: Community,
		isJoined: boolean
	) => {
		if (isJoined) {
			leaveCommunity(communityData.id);
			return;
		}

		joinCommunity(communityData);
	};

	const joinCommunity = async (communityData: Community) => {
		console.log("Joining: ", communityData.id);
		setLoading(true);
		try {
			const batch = writeBatch(firestore);
			const newUserCommunity: UserCommunity = {
				communityId: communityData.id,
				imageURL: communityData.imageURL || "",
			};
			batch.set(
				doc(
					firestore,
					`users/${user?.uid}/userCommunities`,
					communityData.id
				),
				newUserCommunity
			);
			batch.update(doc(firestore, "communities", communityData.id), {
				members: increment(1),
			});
			await batch.commit();
			setCommunityStateValue((prev) => ({
				...prev,
				userCommunities: [...prev.userCommunities, newUserCommunity],
			}));
		} catch (error: any) {
			console.log("Joining Community Error:", error);
			setError(error.message);
		}
		setLoading(false);
	};

	const leaveCommunity = async (communityId: string) => {
		console.log("Leaving: ", communityId);
		setLoading(true);
		try {
			const batch = writeBatch(firestore);
			batch.delete(
				doc(
					firestore,
					`users/${user?.uid}/userCommunities`,
					communityId
				)
			);
			batch.update(doc(firestore, "communities", communityId), {
				members: increment(-1),
			});
			await batch.commit();
			setCommunityStateValue((prev) => ({
				...prev,
				userCommunities: prev.userCommunities.filter(
					(items) => items.communityId !== communityId
				),
			}));
		} catch (error: any) {
			console.log("Leave Community Error: ", error);
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (!user) return;
		getUserCommunities();
	}, [user]);

	return {
		onJoinOrLeaveCommunity,
		loading,
	};
};

export default useCommunityData;
