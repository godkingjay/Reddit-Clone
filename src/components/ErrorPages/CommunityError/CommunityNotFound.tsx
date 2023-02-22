import {
	CommunityModalState,
	communityModalState,
} from "@/atoms/communityModal";
import { useSetRecoilState } from "recoil";

type CommunityNotFoundProps = {};

const CommunityNotFound: React.FC<CommunityNotFoundProps> = () => {
	const setCommunityModal = useSetRecoilState(communityModalState);

	const handleCommunityModal = (viewModal: CommunityModalState["view"]) => {
		setCommunityModal((prev) => ({
			...prev,
			open: true,
			view: "create",
		}));
	};

	return (
		<section className="page-error-community w-screen h-full overflow-y-auto scroll-y-style grid place-items-center">
			<div className="content flex flex-col items-center gap-y-4 max-w-[720px] text-center px-8 py-12">
				<div className="aspect-square w-32 bg-gray-400 rounded-full border-2 border-solid border-transparent items"></div>
				<h2 className="font-semibold mt-4">
					Sorry, there aren’t any communities on Reddit with that name.
				</h2>
				<p className="font-semibold text-sm my-2">
					This community may have been banned or the community name is
					incorrect.
				</p>
				<div className="flex flex-col items-center justify-center w-full gap-4 my-4 xs:flex-row">
					<button
						type="button"
						title="Create Community"
						className="error-page-button border-brand-100 bg-transparent text-brand-100 hover:bg-brand-100 hover:text-white focus-within:bg-brand-100 focus-within:text-white"
						onClick={() => handleCommunityModal("create")}
					>
						Create Community
					</button>
					<button
						type="button"
						title="Go Home"
						className="error-page-button hover:bg-blue-600 hover:border-blue-600 focus-within:bg-blue-600 focus-within:border-blue-600"
					>
						Go Home
					</button>
				</div>
			</div>
		</section>
	);
};

export default CommunityNotFound;
