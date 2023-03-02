import { communityState } from "@/atoms/communitiesAtom";
import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import NewPostHeader from "@/components/Posts/NewPostHeader";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type SubmitPostPageProps = {};

const SubmitPostPage: NextPage = () => {
	const [user, loadingUser, error] = useAuthState(auth);
	const router = useRouter();
	const { communityId } = router.query;
	const { loading } = useCommunityData();
	const communityStateValue = useRecoilValue(communityState);

	useEffect(() => {
		if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
			router.push(`/r/${communityStateValue.currentCommunity.id}`);
		}
	}, [user, loadingUser, communityStateValue.currentCommunity]);

	return (
		<>
			<Head>
				<title>Create a Post</title>
			</Head>
			<section className="flex flex-col items-center pb-8">
				<PageContentLayout>
					<>
						<div className="w-full flex flex-col gap-y-4">
							<NewPostHeader />
							{user && <NewPostForm user={user} />}
						</div>
					</>
					<>
						{/* <Sidebar communityData={communityData} /> */}
						<div>Hello</div>
					</>
				</PageContentLayout>
			</section>
		</>
	);
};

export default SubmitPostPage;
