import PageContentLayout from "@/components/Layout/PageContentLayout";
import { firestore } from "@/firebase/clientApp";
import useAuth from "@/hooks/useAuth";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Post } from "@/atoms/postAtom";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import PostItem from "@/components/Posts/PostItem";
import CreatePostLink from "@/components/CommunityPage/CreatePostLink";

const Home = () => {
	const { user, loading: loadingUser } = useAuth();
	const { communityStateValue } = useCommunityData();
	const {
		postStateValue,
		setPostStateValue,
		onDeletePost,
		onSelectPost,
		onVote,
	} = usePosts();
	const [loading, setLoading] = useState(false);

	const buildUserHomeFeed = () => {};

	const buildNoUserHomeFeed = async () => {
		setLoading(true);
		try {
			const postQuery = query(
				collection(firestore, "posts"),
				orderBy("voteStatus", "desc"),
				limit(10)
			);

			const postDocs = await getDocs(postQuery);
			const posts = postDocs.docs.map((doc) => {
				return {
					...doc.data(),
					id: doc.id,
				};
			});

			setPostStateValue((prev) => ({
				...prev,
				posts: posts as Post[],
			}));
		} catch (error: any) {
			console.log("Fetching no user home feed error: ", error.message);
		}
		setLoading(false);
	};

	const getUserPostVotes = () => {};

	useEffect(() => {
		if (user && !loadingUser) {
			buildUserHomeFeed();
		} else if (!user && !loadingUser) {
			buildNoUserHomeFeed();
		}
	}, [user, loadingUser]);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<PageContentLayout>
					<>
						<div className="flex flex-col w-full gap-y-4">
							{!loading ? (
								<>
									<CreatePostLink user={user} />
									{postStateValue.posts.map((post: Post) => {
										return (
											<PostItem
												post={post}
												onDeletePost={onDeletePost}
												onVote={onVote}
												onSelectPost={onSelectPost}
												userIsCreator={user?.uid === post.creatorId}
												userVoteValue={
													postStateValue.postVotes.find(
														(vote) => vote.postId === post.id
													)?.voteValue
												}
												key={post.id}
												homePage
											/>
										);
									})}
								</>
							) : (
								<>
									<PostSkeleton />
									<PostSkeleton />
								</>
							)}
						</div>
					</>
					<>{/* <Recommendations /> */}</>
				</PageContentLayout>
			</section>
		</>
	);
};

export default Home;
