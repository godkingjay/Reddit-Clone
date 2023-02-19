import Create from "./Inputs/Create";

type CreateCommunityProps = {
	handleClose: Function;
};

const CreateCommunity: React.FC<CreateCommunityProps> = ({ handleClose }) => {
	return (
		<section className="community-modal flex flex-col w-full pb-2 z-50">
			<Create handleClose={handleClose} />
		</section>
	);
};

export default CreateCommunity;
