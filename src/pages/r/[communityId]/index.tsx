import { Community } from "@/atoms/communitiesAtom";
import Body from "@/components/CommunityPage/Body";
import Header from "@/components/CommunityPage/Header";
import Sidebar from "@/components/CommunityPage/Sidebar";
import CommunityNotFound from "@/components/ErrorPages/CommunityError/CommunityNotFound";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
	communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
	const isJoined = false;

	if (!communityData) {
		return <CommunityNotFound />;
	}

	return (
		<>
			<Head>
				<title>{communityData.name}</title>
			</Head>
			<section className="flex flex-col items-center">
				<Header
					communityData={communityData}
					isJoined={isJoined}
				/>
				<PageContentLayout>
					<>
						<Body communityData={communityData} />
					</>
					<>
						<Sidebar communityData={communityData} />
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
		const communityDocRef = doc(
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
