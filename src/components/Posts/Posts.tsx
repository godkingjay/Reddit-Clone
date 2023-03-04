import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostSkeleton from "../Skeletons/PostSkeleton";
import { Post } from "@/atoms/postAtom";

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
			setPostsLoadError(error.message);
		}
		setLoadingPosts(false);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col w-full gap-y-4">
				{loadingPosts ? (
					<>
						<PostSkeleton />
						<PostSkeleton />
					</>
				) : (
					<>
						{postStateValue.posts.map((post: Post) => (
							<PostItem
								post={post}
								onDeletePost={onDeletePost}
								onSelectPost={onSelectPost}
								onVote={onVote}
								userIsCreator={user?.uid === post.creatorId}
								userVoteValue={
									postStateValue.postVotes.find(
										(vote) => vote.postId === post.id
									)?.voteValue
								}
								user={user}
								key={post.id}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Posts;
