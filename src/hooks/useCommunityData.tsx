import { authModalState } from "@/atoms/authModalAtom";
import {
	Community,
	UserCommunity,
	communityState,
	defaultCommunity,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
	const router = useRouter();
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("false");
	const setAuthModal = useSetRecoilState(authModalState);

	const getCommunityData = async (communityId: string) => {
		setLoading(true);
		try {
			const communityDocRef = await doc(firestore, "communities", communityId);
			const communityDoc = await getDoc(communityDocRef);
			setCommunityStateValue((prev) => ({
				...prev,
				currentCommunity: {
					id: communityDoc.id,
					...communityDoc.data(),
				} as Community,
			}));
		} catch (error: any) {
			console.log("fetchErrorCurrentCommunity", error.message);
			setError(error.message);
		}
		setLoading(false);
	};

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

	const onAddCommunity = (userCommunity: UserCommunity) => {
		if (!user) {
			setAuthModal((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
			return;
		}

		setCommunityStateValue((prev) => ({
			...prev,
			userCommunities: [...prev.userCommunities, userCommunity],
		}));
	};

	const onJoinOrLeaveCommunity = (
		communityData: Community,
		isJoined: boolean
	) => {
		if (!user) {
			setAuthModal((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
			return;
		}

		setLoading(true);
		if (isJoined) {
			leaveCommunity(communityData.id);
			return;
		}

		joinCommunity(communityData);
	};

	const joinCommunity = async (communityData: Community) => {
		try {
			const batch = writeBatch(firestore);
			const newUserCommunity: UserCommunity = {
				communityId: communityData.id,
				imageURL: communityData.imageURL || "",
			};
			batch.set(
				doc(firestore, `users/${user?.uid}/userCommunities`, communityData.id),
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
		try {
			const batch = writeBatch(firestore);
			batch.delete(
				doc(firestore, `users/${user?.uid}/userCommunities`, communityId)
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
		// if (!user) return;
		// getUserCommunities();
		const { communityId } = router.query;
		if (communityId) {
			const communityData = communityStateValue.currentCommunity;
			if (!communityData?.id) {
				getCommunityData(communityId as string);
			}
		} else {
			setCommunityStateValue((prev) => ({
				...prev,
				currentCommunity: defaultCommunity,
			}));
		}
	}, [router.query, communityStateValue.currentCommunity]);

	useEffect(() => {
		if (user) {
			getUserCommunities();
		}
	}, [user]);

	return {
		communityStateValue,
		onAddCommunity,
		onJoinOrLeaveCommunity,
		loading,
		setLoading,
		error,
	};
};

export default useCommunityData;
