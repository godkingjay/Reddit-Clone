import { CommentInput } from "@/components/Posts/Post/CommentSection";
import { firestore } from "@/firebase/clientApp";
import {
	Timestamp,
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	orderBy,
	query,
	serverTimestamp,
	where,
	writeBatch,
} from "firebase/firestore";
import useCommunityData from "./useCommunityData";
import usePosts from "./usePosts";
import { Comment, commentState } from "@/atoms/commentAtom";
import { useRecoilState } from "recoil";
import { Post } from "@/atoms/postAtom";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

const useComment = () => {
	const { user } = useAuth();
	const { communityStateValue } = useCommunityData();
	const { postStateValue, setPostStateValue } = usePosts();
	const [commentStateValue, setCommentStateValue] =
		useRecoilState(commentState);
	const [fetchPostCommentsError, setFetchPostCommentsError] = useState("");

	/**
	 *
	 *
	 * @param {CommentInput} commentInput
	 */
	const createComment = async (commentInput: CommentInput) => {
		if (postStateValue.selectedPost) {
			// const batch = writeBatch(firestore);
			// const commentDocRef = doc(collection(firestore, "comments"));
			// const newComment: Comment = {
			// 	id: commentDocRef.id,
			// 	creatorId: user?.uid as string,
			// 	creatorDisplayName: user?.displayName
			// 		? user.displayName
			// 		: user?.email?.split("@")[0]!,
			// 	communityId: communityStateValue.currentCommunity.id,
			// 	postId: postStateValue.selectedPost.id,
			// 	postTitle: postStateValue.selectedPost?.title!,
			// 	text: commentInput.text,
			// 	createdAt: serverTimestamp() as Timestamp,
			// };
			// batch.set(commentDocRef, newComment);
			// const postDocRef = doc(
			// 	firestore,
			// 	"posts",
			// 	postStateValue.selectedPost.id as string
			// );
			// batch.update(postDocRef, {
			// 	numberOfComments: increment(1),
			// });
			// await batch.commit();
			// setCommentStateValue((prev) => ({
			// 	...prev,
			// 	comments: [newComment, ...prev.comments],
			// }));
			// const newPost = {
			// 	...postStateValue.selectedPost,
			// 	numberOfComments: postStateValue.selectedPost?.numberOfComments! + 1,
			// };
			// if (postStateValue.posts.length > 0) {
			// 	const postIndex = postStateValue.posts.findIndex(
			// 		(post) => post.id === postStateValue.selectedPost?.id
			// 	);
			// 	if (postIndex !== -1) {
			// 		setPostStateValue((prev) => ({
			// 			...prev,
			// 			posts: [
			// 				...prev.posts.slice(0, postIndex),
			// 				newPost,
			// 				...prev.posts.slice(postIndex + 1),
			// 			],
			// 		}));
			// 	}
			// }
			// setPostStateValue((prev) => ({
			// 	...prev,
			// 	selectedPost: newPost,
			// }));
		}
	};

	const getPostComments = async (postId: string) => {
		if (postId) {
			try {
				const postDocRef = doc(firestore, "posts", postId);
				const postDoc = await getDoc(postDocRef);
				if (postDoc.exists()) {
					const commentQuery = query(
						collection(firestore, "comments"),
						where(`postId`, `==`, postId),
						orderBy(`createdAt`, `asc`)
					);

					const commentDocs = await getDocs(commentQuery);
					const comments: Comment[] = await Promise.all(
						commentDocs.docs.map(async (doc) => {
							return {
								...doc.data(),
							} as Comment;
						})
					);

					setCommentStateValue((prev) => ({
						...prev,
						comments,
					}));
				}
			} catch (error: any) {
				console.log("Fetching Post Comments Error: ", error.message);
				setFetchPostCommentsError(error.message);
			}
		}
	};

	const onDeleteComment = async (comment: Comment) => {};

	return {
		createComment,
		onDeleteComment,
		commentStateValue,
		setCommentStateValue,
		getPostComments,
		fetchPostCommentsError,
		setFetchPostCommentsError,
	};
};

export default useComment;
