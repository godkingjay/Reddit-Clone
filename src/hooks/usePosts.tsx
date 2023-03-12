import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { ImagesAndVideos, Post, postState, PostVote } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
	writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useAuth from "./useAuth";

const usePosts = () => {
	const router = useRouter();
	const { user, loading: loadingUser } = useAuth();
	const [loadingPost, setLoadingPost] = useState(false);
	const [loadingPosts, setLoadingPosts] = useState(false);
	const [postStateValue, setPostStateValue] = useRecoilState(postState);
	const setAuthModal = useSetRecoilState(authModalState);
	const communityStateValue = useRecoilValue(communityState);

	/**
	 *
	 *
	 * @param {string} postId
	 */
	const getPost = async (postId: string) => {
		if (!postId) return;
		setLoadingPost(true);
		try {
			const postDocRef = doc(firestore, "posts", postId);
			const postDoc = await getDoc(postDocRef);
			if (postDoc.exists()) {
				const selectedPost = {
					id: postDoc.id,
					...postDoc.data(),
				} as Post;

				const imagesAndVideos = (await getPostImagesAndVideos(
					postDoc
				)) as ImagesAndVideos[];

				if (imagesAndVideos.length > 0) {
					selectedPost.imagesAndVideos = imagesAndVideos;
				}

				setPostStateValue((prev) => ({
					...prev,
					selectedPost,
				}));
			}
		} catch (error: any) {
			console.log("Fetch Selected Post Error: ", error.message);
		}
		setLoadingPost(false);
	};

	/**
	 *
	 *
	 * @param {Post} post
	 * @param {number} vote
	 * @param {string} communityId
	 * @return {*}
	 */
	const onVote = async (post: Post, vote: number, communityId: string) => {
		if (!user) {
			setAuthModal((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
			return;
		}

		/**
		 * ! trycatch block for updating postVotes collection
		 * @scenario_01			// * new vote
		 * @scenario_02_a		// * existing vote, but removing vote
		 * @scenario_02_b		// * existing vote, but changing vote
		 */
		try {
			const { voteStatus } = post;

			/**
			 * ! check if user has voted on this post before
			 */
			const existingVote = postStateValue.postVotes.find(
				(vote) => vote.postId == post.id
			);

			const batch = writeBatch(firestore);

			/**
			 * ! voteChange is used to update the voteStatus of the post
			 */
			let voteChange = vote;

			/**
			 * @copy_01		// * currentPost
			 * @copy_02		// * currentPosts
			 * @copy_03		// * currentPostVotes
			 */
			const updatedPost = { ...post };
			const updatedPosts = [...postStateValue.posts];
			let updatedPostVotes = [...postStateValue.postVotes];

			/**
			 * ! if user has not voted on this post before then create a new postVote for user
			 */
			if (!existingVote) {
				/**
				 * @create	// * a reference to postVote collection
				 */
				const postVoteRef = doc(
					collection(firestore, `users/${user.uid}/postVotes`)
				);

				/**
				 * @initialize	// * a new postVote document
				 */
				const newVote: PostVote = {
					id: postVoteRef.id,
					postId: post.id,
					communityId: communityId,
					voteValue: vote,
				};

				/**
				 * @add	// * add new postVote document in postVotes collection
				 */
				batch.set(postVoteRef, newVote);
				updatedPost.voteStatus = voteStatus + vote;

				/**
				 * @update	// * update postVotes clone
				 */
				updatedPostVotes = [...updatedPostVotes, newVote];

				/**
				 * @update // * if user has voted on this post before then update the vote
				 */
			} else {
				/**
				 * @create	// * a reference to existing postVote collection
				 */
				const postVoteRef = doc(
					firestore,
					`users/${user.uid}/postVotes`,
					existingVote.id
				);

				/**
				 * @scenario_02_a		// * removing vote
				 */
				if (existingVote.voteValue === vote) {
					/**
					 * @negate	// * negate voteChange to remove existing vote
					 */
					voteChange *= -1;

					/**
					 * @update	// * update voteStatus of updatedPost clone to remove vote
					 */
					updatedPost.voteStatus = voteStatus - vote;
					updatedPostVotes = updatedPostVotes.filter(
						(vote) => vote.id !== existingVote.id
					);

					/**
					 * @delete	// * delete postVote document from postVotes collection
					 */
					batch.delete(postVoteRef);

					/**
					 * @scenario_02_b		// * changing vote
					 */
				} else {
					/**
					 * @multiply	// * multiply voteChange to 2 if changing votes
					 */
					voteChange = 2 * vote;

					/**
					 * @update	// * update voteStatus of updatedPost clone to change vote
					 */
					updatedPost.voteStatus = voteStatus + 2 * vote;

					/**
					 * @index	// * find index of existing vote in updatedPostVotes clone
					 */
					const voteIndex = updatedPostVotes.findIndex(
						(vote) => vote.id === existingVote.id
					);

					/**
					 * @exists	// * update existingVote voteValue in updatedPostVotes clone if it exists
					 */
					if (voteIndex !== -1) {
						updatedPostVotes[voteIndex] = {
							...existingVote,
							voteValue: vote,
						};
					}

					/**
					 * @update	// * update the voteValue field of the postVote document
					 */
					batch.update(postVoteRef, {
						voteValue: vote,
					});
				}
			}

			/**
			 * @global @atom @index	// * find index of post in the global postStateValue atom
			 */
			const postIndex = postStateValue.posts.findIndex(
				(item) => item.id === post.id
			);

			/**
			 * @update	// * update the post to updatedPost in updatedPosts clone
			 */
			updatedPosts[postIndex] = updatedPost;

			/**
			 * @global @atom @update	// * update the global postStateValue atom
			 */
			setPostStateValue((prev) => ({
				...prev,
				posts: updatedPosts,
				postVotes: updatedPostVotes,
			}));

			if (postStateValue.selectedPost) {
				setPostStateValue((prev) => ({
					...prev,
					selectedPost: updatedPost,
				}));
			}

			/**
			 * @create // * a reference to the post document
			 */
			const postRef = doc(firestore, `posts`, post.id);

			/**
			 * @update	// * update the voteStatus field of the post document
			 */
			batch.update(postRef, {
				voteStatus: voteStatus + voteChange,
			});

			/**
			 * @commit	// * commit the batchWrites to firestore
			 */
			await batch.commit();
		} catch (error: any) {
			console.log("Voting Error:", error.message);
		}
	};

	/**
	 *
	 *
	 * @param {Post} post
	 */
	const onSelectPost = (post: Post) => {
		setPostStateValue((prev) => ({
			...prev,
			selectedPost: post,
		}));
		router.push(`/r/${post.communityId}/comments/${post.id}`);
	};

	/**
	 *
	 *
	 * @param {Post} post
	 * @return {*}  {Promise<boolean>}
	 */
	const onDeletePost = async (post: Post): Promise<boolean> => {
		try {
			if (post.imagesAndVideos) {
				post.imagesAndVideos.forEach(async (imageOrVideo, index) => {
					const imageAndVideoRef = ref(storage, imageOrVideo.path);
					await deleteObject(imageAndVideoRef);
				});
			}

			const postDocRef = doc(firestore, `posts`, post.id);

			await deleteDoc(postDocRef);

			const imagesAndVideosQuery = query(
				collection(firestore, "posts", post.id, "imagesAndVideos")
			);

			const imagesAndVideosDocs = await getDocs(imagesAndVideosQuery);

			const batch = writeBatch(firestore);

			imagesAndVideosDocs.forEach((doc) => {
				batch.delete(doc.ref);
			});

			await batch.commit();

			setPostStateValue((prev) => ({
				...prev,
				posts: prev.posts.filter((item) => item.id !== post.id),
			}));

			if (postStateValue.selectedPost) {
				if (postStateValue.selectedPost.id === post.id) {
					setPostStateValue((prev) => ({
						...prev,
						selectedPost: null,
					}));
					router.push(`/r/${post.communityId}`);
				}
			}

			return true;
		} catch (error) {
			console.log();
			return false;
		}
	};

	/**
	 *
	 *
	 * @param {QueryDocumentSnapshot<DocumentData>} doc
	 * @return {*}
	 */
	const getPostImagesAndVideos = async (
		doc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const postImagesAndVideosDocs = await getDocs(
				collection(firestore, `posts/${doc.id}/imagesAndVideos`)
			);
			const postImagesAndVideos = await postImagesAndVideosDocs.docs.map(
				(doc) => ({
					...doc.data(),
				})
			);
			return postImagesAndVideos as ImagesAndVideos[];
		} catch (error: any) {
			console.log("Getting Images and Videos Error:", error.message);
			return [];
		}
	};

	/**
	 *
	 *
	 * @param {string} communityId
	 */
	const getCommunityPostVotes = async (communityId: string) => {
		setLoadingPosts(true);
		const postVotesQuery = query(
			collection(firestore, `users/${user?.uid}/postVotes`),
			where("communityId", "==", communityId)
		);
		const postVoteDocs = await getDocs(postVotesQuery);
		const postVotes = postVoteDocs.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		setPostStateValue((prev) => ({
			...prev,
			postVotes: postVotes as PostVote[],
		}));
		setLoadingPosts(false);
	};

	useEffect(() => {
		if (!user?.uid || !communityStateValue.currentCommunity.id) return;
		getCommunityPostVotes(communityStateValue.currentCommunity.id);
	}, [user, communityStateValue.currentCommunity]);

	useEffect(() => {
		if (!user?.uid && !loadingUser) {
			setPostStateValue((prev) => ({
				...prev,
				postVotes: [],
			}));
			return;
		}
	}, [user, loadingUser]);

	return {
		getPostImagesAndVideos,
		postStateValue,
		setPostStateValue,
		onDeletePost,
		onSelectPost,
		onVote,
		getCommunityPostVotes,
		loadingPosts,
		setLoadingPosts,
		getPost,
		loadingPost,
		setLoadingPost,
	};
};

export default usePosts;
