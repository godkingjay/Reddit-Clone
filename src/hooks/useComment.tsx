import { CommentInput } from "@/components/Posts/Post/CommentSection";
import { auth, firestore } from "@/firebase/clientApp";
import {
	Timestamp,
	collection,
	doc,
	increment,
	serverTimestamp,
	writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import useCommunityData from "./useCommunityData";
import usePosts from "./usePosts";
import { Comment, commentState } from "@/atoms/commentAtom";
import { useRecoilState } from "recoil";
import { Post } from "@/atoms/postAtom";

const useComment = () => {
	const [user] = useAuthState(auth);
	const { communityStateValue } = useCommunityData();
	const { postStateValue, setPostStateValue } = usePosts();
	const [commentStateValue, setCommentStateValue] =
		useRecoilState(commentState);

	/**
	 *
	 *
	 * @param {CommentInput} commentInput
	 */
	const createComment = async (commentInput: CommentInput) => {
		if (postStateValue.selectedPost) {
			const batch = writeBatch(firestore);
			const commentDocRef = doc(collection(firestore, "comments"));
			const newComment: Comment = {
				id: commentDocRef.id,
				creatorId: user?.uid as string,
				creatorDisplayName: user?.displayName
					? user.displayName
					: user?.email?.split("@")[0]!,
				communityId: communityStateValue.currentCommunity.id,
				postId: postStateValue.selectedPost.id,
				postTitle: postStateValue.selectedPost?.title!,
				text: commentInput.text,
				createdAt: serverTimestamp() as Timestamp,
			};

			batch.set(commentDocRef, newComment);
			const postDocRef = doc(
				firestore,
				"posts",
				postStateValue.selectedPost.id as string
			);

			batch.update(postDocRef, {
				numberOfComments: increment(1),
			});

			await batch.commit();

			setCommentStateValue((prev) => ({
				...prev,
				comments: [newComment, ...prev.comments],
			}));

			const newPost = {
				...postStateValue.selectedPost,
				numberOfComments: postStateValue.selectedPost?.numberOfComments! + 1,
			};

			if (postStateValue.posts.length > 0) {
				const postIndex = postStateValue.posts.findIndex(
					(post) => post.id === postStateValue.selectedPost?.id
				);
				if (postIndex !== -1) {
					setPostStateValue((prev) => ({
						...prev,
						posts: [
							...prev.posts.slice(0, postIndex),
							newPost,
							...prev.posts.slice(postIndex + 1),
						],
					}));
				}
			}

			setPostStateValue((prev) => ({
				...prev,
				selectedPost: newPost,
			}));
		}
	};

	const onDeleteComment = async (comment: Comment) => {};

	return {
		createComment,
		onDeleteComment,
		commentStateValue,
		setCommentStateValue,
	};
};

export default useComment;
