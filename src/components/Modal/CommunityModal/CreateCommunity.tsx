import { UserAuth } from "@/pages/_app";
import Create from "./Inputs/Create";

type CreateCommunityProps = {
	user?: UserAuth["user"] | null;
	handleClose: Function;
};

const CreateCommunity: React.FC<CreateCommunityProps> = ({
	handleClose,
	user,
}) => {
	return (
		<section className="community-modal flex flex-col w-full pb-2 z-50">
			<Create
				handleClose={handleClose}
				user={user}
			/>
		</section>
	);
};

export default CreateCommunity;
