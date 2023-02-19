import {
	CommunityModalState,
	communityModalState,
} from "@/atoms/communityModal";
import CommunityModal from "@/components/Modal/CommunityModal/CommunityModal";
import { VscAdd } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";

type CreateCommunityProps = {};

const CreateCommunity: React.FC<CreateCommunityProps> = () => {
	const setCommunityModal = useSetRecoilState(communityModalState);

	const handleCommunityModal = (viewModal: CommunityModalState["view"]) => {
		setCommunityModal((prev) => ({
			open: true,
			view: viewModal,
		}));
	};

	return (
		<>
			<li>
				<button
					type="button"
					title="Create Community"
					onClick={() => handleCommunityModal("create")}
					className="item"
				>
					<VscAdd className="icon" />
					<p className="label">Create Community</p>
				</button>
			</li>
			<CommunityModal />
		</>
	);
};

export default CreateCommunity;
