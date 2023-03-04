import { Community } from "@/atoms/communitiesAtom";
import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import PostItem from "@/components/Posts/PostItem";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type PostPageProps = {
	// communityData: Community;
};

const PostPage: React.FC<PostPageProps> = () => {
	const { loading: loadingCommunities } = useCommunityData();
	const { onDeletePost, postStateValue, onVote } = usePosts();
	const [user] = useAuthState(auth);

	return (
		<>
			<Head>
				<title>{postStateValue.selectedPost?.title}</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<PageContentLayout>
					<>
						{postStateValue.selectedPost && (
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
						)}
					</>
					<>
						{!loadingCommunities ? (
							// <Sidebar communityData={communityData} />
							<></>
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
