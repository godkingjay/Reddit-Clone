import PageContentLayout from "@/components/Layout/PageContentLayout";
import { firestore } from "@/firebase/clientApp";
import useAuth from "@/hooks/useAuth";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Post, PostVote } from "@/atoms/postAtom";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import PostItem from "@/components/Posts/PostItem";
import CreatePostLink from "@/components/CommunityPage/CreatePostLink";
import Recommendations from "@/components/Community/Recommendations";

const Home = () => {
	const { user, loading: loadingUser } = useAuth();
	const { communityStateValue } = useCommunityData();
	const {
		postStateValue,
		setPostStateValue,
		onDeletePost,
		onSelectPost,
		onVote,
		getPostImagesAndVideos,
	} = usePosts();
	const [loading, setLoading] = useState(false);

	const buildUserHomeFeed = async () => {
		setLoading(true);
		try {
			if (communityStateValue.userCommunities.length > 0) {
				const userCommunityIds = communityStateValue.userCommunities.map(
					(community) => community.communityId
				);

				const postQuery = query(
					collection(firestore, "posts"),
					where("communityId", "in", userCommunityIds),
					limit(10)
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
			} else {
				buildNoUserHomeFeed();
			}
		} catch (error: any) {
			console.log("Fetching user home feed error: ", error.message);
		}
		setLoading(false);
	};

	const buildNoUserHomeFeed = async () => {
		setLoading(true);
		try {
			const postQuery = query(
				collection(firestore, "posts"),
				orderBy("voteStatus", "desc"),
				limit(10)
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
			console.log("Fetching no user home feed error: ", error.message);
		}
		setLoading(false);
	};

	const getUserPostVotes = async () => {
		try {
			const postIds = postStateValue.posts.map((post) => post.id);
			const postVotesQuery = query(
				collection(firestore, `users/${user?.uid}/postVotes`),
				where("postId", "in", postIds)
			);

			const postVotesDocs = await getDocs(postVotesQuery);
			const postVotes = postVotesDocs.docs.map((doc) => {
				return {
					...doc.data(),
					id: doc.id,
				};
			});

			setPostStateValue((prev) => ({
				...prev,
				postVotes: postVotes as PostVote[],
			}));
		} catch (error: any) {
			console.log("Fetching user post votes error: ", error.message);
		}
	};

	useEffect(() => {
		if (user && !loadingUser) {
			buildUserHomeFeed();
		} else if (!user && !loadingUser) {
			buildNoUserHomeFeed();
		}
	}, [user, loadingUser]);

	useEffect(() => {
		if (user && !loadingUser && postStateValue.posts.length) {
			getUserPostVotes();
		}
	}, [user, postStateValue.posts]);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<PageContentLayout>
					<>
						<div className="flex flex-col w-full gap-y-4">
							{!loading && !loadingUser ? (
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
					<>
						<Recommendations />
					</>
				</PageContentLayout>
			</section>
		</>
	);
};

export default Home;
