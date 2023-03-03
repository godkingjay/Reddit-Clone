import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import { ImagesAndVideos, Post } from "@/atoms/postAtom";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostProps = {
	communityData: Community;
};

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const Posts: React.FC<PostProps> = ({ communityData }) => {
	const [user] = useAuthState(auth);
	const [loadingPosts, setLoadingPosts] = useState(true);
	const [postsLoadError, setPostsLoadError] = useState("");
	const {
		getPostImagesAndVideos,
		postStateValue,
		setPostStateValue,
		onDeletePost,
		onSelectPost,
		onVote,
	} = usePosts();

	const getPosts = async () => {
		setLoadingPosts(true);
		try {
			const postQuery = query(
				collection(firestore, "posts"),
				where(`communityId`, `==`, communityData.id),
				orderBy(`createdAt`, `desc`)
			);

			const postDocs = await getDocs(postQuery);

			const posts = await Promise.all(
				postDocs.docs.map(async (doc) => {
					const imagesAndVideos = await getPostImagesAndVideos(doc);
					if (imagesAndVideos.length > 0) {
						return {
							...doc.data(),
							id: doc.id,
							imagesAndVideos,
						};
					} else {
						return {
							...doc.data(),
							id: doc.id,
						};
					}
				})
			);

			setPostStateValue((prev) => ({
				...prev,
				posts: posts as Post[],
			}));
		} catch (error: any) {
			console.log(error.message);
		}
		setLoadingPosts(false);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="w-full flex flex-col">
			{loadingPosts ? (
				<PostLoader />
			) : (
				<div className="flex flex-col w-full gap-y-4">
					{postStateValue.posts.map((post: Post) => (
						<PostItem
							post={post}
							onDeletePost={onDeletePost}
							onSelectPost={onSelectPost}
							onVote={onVote}
							userIsCreator={user?.uid === post.creatorId}
							userVoteValue={
								postStateValue.postVotes.find((vote) => vote.postId === post.id)
									?.voteValue
							}
							key={post.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Posts;
