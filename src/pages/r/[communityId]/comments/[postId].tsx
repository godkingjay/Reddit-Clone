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

type PostPageProps = {
	// communityData: Community;
};

const PostPage: React.FC<PostPageProps> = () => {
	const router = useRouter();
	const currentPostId = router.query.postId;
	const { loading: loadingCommunities, communityStateValue } =
		useCommunityData();
	const { onDeletePost, postStateValue, onVote, loadingPost, getPost } =
		usePosts();
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!postStateValue.selectedPost && currentPostId) {
			getPost(currentPostId as string);
		}
	}, [currentPostId]);

	return (
		<>
			<Head>
				<title>{postStateValue.selectedPost?.title}</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<PageContentLayout>
					<>
						<div className="flex flex-col w-full gap-y-4">
							{!loadingPost && postStateValue.selectedPost ? (
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
								/>
							) : (
								<>
									<PostSkeleton />
								</>
							)}
						</div>
					</>
					<>
						{!loadingCommunities && communityStateValue.currentCommunity ? (
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
