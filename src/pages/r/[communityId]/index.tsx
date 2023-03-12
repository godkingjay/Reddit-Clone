import { Community, communityState } from "@/atoms/communitiesAtom";
import Body from "@/components/CommunityPage/Body";
import Header from "@/components/CommunityPage/Header";
import Sidebar from "@/components/CommunityPage/Sidebar";
import CommunityNotFound from "@/components/ErrorPages/CommunityError/CommunityNotFound";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import SidebarSkeleton from "@/components/Skeletons/SidebarSkeleton";
import { firestore } from "@/firebase/clientApp";
import useAuth from "@/hooks/useAuth";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
	communityData: Community;
};

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
	const { user, loading, error } = useAuth();
	const { loading: loadingCommunities } = useCommunityData();
	const { loadingPosts, setPostStateValue } = usePosts();
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);

	useEffect(() => {
		if (communityData) {
			setCommunityStateValue((prev) => {
				return {
					...prev,
					currentCommunity: communityData,
				};
			});
		}
	}, [communityData]);

	if (!communityData) {
		return <CommunityNotFound />;
	}

	return (
		<>
			<Head>
				<title>{communityData.name || "Community"}</title>
			</Head>
			<section className="flex flex-col items-center w-full">
				<Header
					communityData={communityData}
					communityStateValue={communityStateValue}
					user={user}
					loading={loading}
					error={error}
				/>
				<PageContentLayout>
					<>
						<Body
							communityData={communityData}
							loadingPosts={loadingPosts}
							user={user}
							loading={loading}
							error={error}
						/>
					</>
					<>
						{!loadingCommunities || communityData ? (
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

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	try {
		const communityDocRef = await doc(
			firestore,
			"communities",
			context.query.communityId as string
		);
		const communityDoc = await getDoc(communityDocRef).then((data) => {
			if (data.exists()) {
				const communityData = data.data();
				return JSON.parse(
					safeJsonStringify({
						id: data.id,
						...communityData,
					})
				);
			} else {
				return "";
			}
		});

		return {
			props: {
				communityData: communityDoc,
			},
		};
	} catch (error) {
		console.log("getServerSideError: " + error);
	}
};

export default CommunityPage;
