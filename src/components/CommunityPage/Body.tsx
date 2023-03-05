import Posts from "../Posts/Posts";
import CreatePostLink from "./CreatePostLink";
import { UserAuth } from "@/pages/_app";

type BodyProps = {
	communityData: any;
	loadingPosts: boolean;
	user?: UserAuth["user"] | null;
	loading?: UserAuth["loading"];
	error?: UserAuth["error"];
};

/**
 *
 *
 * @param {*} { communityData, loadingPosts, user }
 * @return {*}
 */
const Body: React.FC<BodyProps> = ({
	communityData,
	loadingPosts,
	user,
	loading,
	error,
}) => {
	return (
		<div className="flex-1 flex flex-col gap-y-4 w-full">
			<CreatePostLink
				communityData={communityData}
				user={user}
			/>
			<Posts
				communityData={communityData}
				user={user}
			/>
		</div>
	);
};

export default Body;
