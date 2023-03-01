import Posts from "../Posts/Posts";
import CreatePostLink from "./CreatePostLink";

type BodyProps = {
	communityData: any;
};

const Body: React.FC<BodyProps> = ({ communityData }) => {
	return (
		<div className="flex-1 flex flex-col gap-y-4 w-full">
			<CreatePostLink communityData={communityData} />
			<Posts communityData={communityData} />
		</div>
	);
};

export default Body;
