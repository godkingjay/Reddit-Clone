import Sidebar from "@/components/CommunityPage/Sidebar";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/Posts/NewPostForm";
import NewPostHeader from "@/components/Posts/NewPostHeader";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
	return (
		<PageContentLayout>
			<>
				<div className="w-full flex flex-col gap-y-4">
					<NewPostHeader />
					<NewPostForm />
				</div>
			</>
			<>
				{/* <Sidebar communityData={communityData} /> */}
				<div>Hello</div>
			</>
		</PageContentLayout>
	);
};

export default SubmitPostPage;
