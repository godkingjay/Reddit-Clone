import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm, { FormTabItem } from "@/components/Posts/NewPostForm";
import NewPostHeader from "@/components/Posts/NewPostHeader";
import HeaderCardSkeleton from "@/components/Skeletons/HeaderCardSkeleton";
import NewPostFormSkeleton from "@/components/Skeletons/NewPostFormSkeleton";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter, withRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage: NextPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();
	const { communityId, tabItem } = router.query;
	const { loading: loadingCommunity, communityStateValue } = useCommunityData();

	useEffect(() => {
		if (
			(communityId &&
				!loadingCommunity &&
				!communityStateValue.currentCommunity.id) ||
			(!user && !loading)
		) {
			router.push(`/r/${communityId}`);
		}
	}, [
		communityId,
		user,
		loading,
		loadingCommunity,
		communityStateValue.currentCommunity,
	]);

	return (
		<>
			<Head>
				<title>Create a Post</title>
			</Head>
			<section className="flex flex-col items-center pb-8">
				<PageContentLayout>
					<>
						<div className="w-full flex flex-col gap-y-4">
							{!loadingCommunity &&
							!loading &&
							communityStateValue.currentCommunity.id ? (
								<>
									<NewPostHeader />
									{user && (
										<NewPostForm
											user={user}
											tabItem={tabItem as FormTabItem["title"]}
										/>
									)}
								</>
							) : (
								<>
									<HeaderCardSkeleton />
									<NewPostFormSkeleton />
								</>
							)}
						</div>
					</>
					<>
						{!loadingCommunity &&
						!loading &&
						communityStateValue.currentCommunity.id ? (
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

export default withRouter(SubmitPostPage);
