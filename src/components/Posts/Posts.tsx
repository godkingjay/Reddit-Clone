import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostSkeleton from "../Skeletons/PostSkeleton";
import { Post } from "@/atoms/postAtom";
import { UserAuth } from "@/pages/_app";
import { useRouter } from "next/router";

type PostProps = {
	communityData: Community;
	user?: UserAuth["user"] | null;
	loading?: UserAuth["loading"];
	error?: UserAuth["error"];
};

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const Posts: React.FC<PostProps> = ({ communityData, user }) => {
	const router = useRouter();
	const { communityId } = router.query;
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
	}, [communityId]);

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
