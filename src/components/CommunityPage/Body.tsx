import { User } from "firebase/auth";
import Posts from "../Posts/Posts";
import CreatePostLink from "./CreatePostLink";

type BodyProps = {
	communityData: any;
	loadingPosts: boolean;
	user?: User | null;
};

const Body: React.FC<BodyProps> = ({ communityData, loadingPosts, user }) => {
	return (
		<div className="flex-1 flex flex-col gap-y-4 w-full">
			<CreatePostLink
				communityData={communityData}
				user={user}
			/>
			<Posts communityData={communityData} />
		</div>
	);
};

export default Body;
