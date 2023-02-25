import CreatePostLink from "./CreatePostLink";

type BodyProps = {
	communityData: any;
};

const Body: React.FC<BodyProps> = ({ communityData }) => {
	return (
		<div className="flex-1 flex flex-col gap-y-4">
			<CreatePostLink communityData={communityData} />
			<div>Welcome</div>
			<div>Instruction</div>
			<div>Lounge</div>
			<div>Post 1</div>
		</div>
	);
};

export default Body;
