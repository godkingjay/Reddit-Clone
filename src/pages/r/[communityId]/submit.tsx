import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import NewPostHeader from "@/components/Posts/NewPostHeader";
import { auth } from "@/firebase/clientApp";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
	const [user] = useAuthState(auth);

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
