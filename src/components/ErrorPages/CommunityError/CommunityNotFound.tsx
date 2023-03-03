import {
	CommunityModalState,
	communityModalState,
} from "@/atoms/communityModalAtom";
import Head from "next/head";
import { useSetRecoilState } from "recoil";
import NoCommunityImage from "public/svg/community-no-image.svg";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type CommunityNotFoundProps = {};

const CommunityNotFound: React.FC<CommunityNotFoundProps> = () => {
	const setCommunityModal = useSetRecoilState(communityModalState);
	const setAuthModal = useSetRecoilState(authModalState);
	const [user] = useAuthState(auth);

	/**
	 *
	 *
	 * @param {CommunityModalState["view"]} viewModal
	 */
	const handleCommunityModal = (viewModal: CommunityModalState["view"]) => {
		if (!user) {
			setAuthModal((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
		} else {
			setCommunityModal((prev) => ({
				...prev,
				open: true,
				view: "create",
			}));
		}
	};

	return (
		<>
			<Head>
				<title>Community Not Found</title>
			</Head>
			<section className="page-error-community w-screen h-full overflow-y-auto scroll-y-style grid place-items-center">
				<div className="content flex flex-col items-center gap-y-4 max-w-[720px] text-center px-8 py-12">
					<div className="aspect-square w-32 bg-white rounded-full border-2 border-solid border-transparent items">
						<NoCommunityImage className="h-full w-full rounded-full fill-brand-100" />
					</div>
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
							className="page-button border-brand-100 bg-transparent text-brand-100 hover:bg-brand-100 hover:text-white focus-within:bg-brand-100 focus-within:text-white"
							onClick={() => handleCommunityModal("create")}
						>
							Create Community
						</button>
						<button
							type="button"
							title="Go Home"
							className="page-button hover:bg-blue-600 hover:border-blue-600 focus-within:bg-blue-600 focus-within:border-blue-600"
						>
							Go Home
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default CommunityNotFound;
