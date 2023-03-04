import { Community } from "@/atoms/communitiesAtom";
import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
	const router = useRouter();
	const currentPostId = router.query.postId;
	const { communityStateValue } = useCommunityData();
	const {
		onDeletePost,
		postStateValue,
		onVote,
		loadingPost,
		loadingPosts,
		getPost,
	} = usePosts();
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!postStateValue.selectedPost && currentPostId) {
			getPost(currentPostId as string);
		}
	}, [currentPostId]);

	useEffect(() => {
		if (!postStateValue.selectedPost && currentPostId && !loadingPost) {
			router.push(`/r/${communityStateValue.currentCommunity?.id}`);
		}
	}, [loadingPost, postStateValue.selectedPost]);

	return (
		<>
			<Head>
				<title>{postStateValue.selectedPost?.title}</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<PageContentLayout>
					<>
						<div className="flex flex-col w-full gap-y-4">
							{!loadingPost &&
							postStateValue.postVotes &&
							postStateValue.selectedPost ? (
								<PostItem
									post={postStateValue.selectedPost}
									onDeletePost={onDeletePost}
									onVote={onVote}
									userIsCreator={
										user?.uid === postStateValue.selectedPost.creatorId
									}
									userVoteValue={
										postStateValue.postVotes.find(
											(vote) => vote.postId === postStateValue.selectedPost?.id
										)?.voteValue
									}
									user={user}
								/>
							) : (
								<>
									<PostSkeleton />
								</>
							)}
						</div>
					</>
					<>
						{communityStateValue.currentCommunity.id ? (
							<Sidebar communityData={communityStateValue.currentCommunity} />
						) : (
							<SidebarSkeleton />
						)}
					</>
				</PageContentLayout>
			</section>
		</>
	);
};

export default PostPage;
