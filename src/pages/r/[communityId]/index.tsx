import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/ErrorPages/CommunityError/CommunityNotFound";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
	communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
	if (!communityData) {
		return <CommunityNotFound />;
	}

	return (
		<>
			<div>Community Page</div>
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
		const communityDoc = await getDoc(communityDocRef);

		return {
			props: {
				communityData: communityDoc.exists()
					? JSON.parse(
							safeJsonStringify({
								id: communityDoc.id,
								...communityDoc.data(),
							})
					  )
					: "",
			},
		};
	} catch (error) {
		// console.log("getServerSideError: " + error);
	}
};

export default CommunityPage;
