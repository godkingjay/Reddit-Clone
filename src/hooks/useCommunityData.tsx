import { authModalState } from "@/atoms/authModalAtom";
import {
	Community,
	communityState,
	defaultCommunity,
	UserCommunity,
} from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
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
import { useRecoilState, useSetRecoilState } from "recoil";
import useAuth from "./useAuth";

const useCommunityData = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("false");
	const setAuthModal = useSetRecoilState(authModalState);

	/**
	 *
	 *
	 * @param {string} communityId
	 */
	const getCommunityData = async (communityId: string) => {
		setLoading(true);
		try {
			const communityDocRef = await doc(firestore, "communities", communityId);
			const communityDoc = await getDoc(communityDocRef);
			if (communityDoc.exists()) {
				setCommunityStateValue((prev) => ({
					...prev,
					currentCommunity: {
						id: communityDoc.id,
						...communityDoc.data(),
					} as Community,
				}));
			}
		} catch (error: any) {
			console.log("fetchErrorCurrentCommunity", error.message);
			setError(error.message);
		}
		setLoading(false);
	};

	/**
	 *
	 *
	 */
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

	/**
	 *
	 *
	 * @param {UserCommunity} userCommunity
	 * @return {*}
	 */
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

	/**
	 *
	 *
	 * @param {Community} communityData
	 * @param {boolean} isJoined
	 * @return {*}
	 */
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

	/**
	 *
	 *
	 * @param {Community} communityData
	 */
	const joinCommunity = async (communityData: Community) => {
		try {
			const batch = writeBatch(firestore);
			const newUserCommunity: UserCommunity = {
				communityId: communityData.id,
				imageURL: communityData.imageURL || "",
				isModerator: user?.uid === communityData.creatorId,
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
				currentCommunity: {
					...prev.currentCommunity,
					members: prev.currentCommunity.members + 1,
				},
			}));
		} catch (error: any) {
			console.log("Joining Community Error:", error);
			setError(error.message);
		}
		setLoading(false);
	};

	/**
	 *
	 *
	 * @param {string} communityId
	 */
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
				currentCommunity: {
					...prev.currentCommunity,
					members: prev.currentCommunity.members - 1,
				},
			}));
		} catch (error: any) {
			console.log("Leave Community Error: ", error);
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		const { communityId } = router.query;
		if (communityId) {
			const communityData = communityStateValue.currentCommunity;
			if (!communityData?.id && communityData.id !== communityId) {
				getCommunityData(communityId as string);
			}
		} else {
			setCommunityStateValue((prev) => ({
				...prev,
				currentCommunity: defaultCommunity,
			}));
		}
	}, [router.query.communityId, communityStateValue.currentCommunity]);

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
