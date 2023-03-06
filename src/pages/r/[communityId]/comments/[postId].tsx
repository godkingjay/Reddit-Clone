import { Community } from "@/atoms/communitiesAtom";
import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import PostSkeleton from "@/components/Skeletons/PostSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import useAuth from "@/hooks/useAuth";
import useComment from "@/hooks/useComment";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { UserAuth } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type PostPageProps = {
	user?: UserAuth["user"] | null;
	loading?: UserAuth["loading"];
	error?: UserAuth["error"];
};

const PostPage: React.FC<PostPageProps> = () => {
	const router = useRouter();
	const { user, loading, error } = useAuth();
	const currentPostId = router.query.postId;
	const { communityStateValue } = useCommunityData();
	const { commentStateValue, getPostComments, fetchPostCommentsError } =
		useComment();
	const {
		onDeletePost,
		postStateValue,
		onVote,
		loadingPost,
		loadingPosts,
		getPost,
	} = usePosts();
	const [loadingPostComments, setLoadingPostComments] = useState(false);

	const fetchPostComments = async () => {
		setLoadingPostComments(true);
		await getPostComments(currentPostId as string);
		setLoadingPostComments(false);
	};

	useEffect(() => {
		if (!postStateValue.selectedPost && currentPostId) {
			getPost(currentPostId as string);
		}
		if (
			postStateValue.selectedPost &&
			currentPostId &&
			commentStateValue.comments.length === 0
		) {
			if (postStateValue.selectedPost.numberOfComments > 0) {
				fetchPostComments();
			}
		}
	}, [currentPostId, postStateValue.selectedPost]);

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
									loadingPostComments={loadingPostComments}
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
							<Sidebar
								communityData={communityStateValue.currentCommunity}
								user={user}
								loading={loading}
								error={error}
							/>
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
