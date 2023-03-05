import { communityModalState } from "@/atoms/communityModalAtom";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { useRecoilState } from "recoil";
import CreateCommunity from "./CreateCommunity";
import useAuth from "@/hooks/useAuth";

type CommunityModalProps = {};

const CommunityModal: React.FC<CommunityModalProps> = () => {
	const { user } = useAuth();
	const [communityModal, setCommunityModal] =
		useRecoilState(communityModalState);

	const handleClose = () => {
		setCommunityModal((prev) => ({
			...prev,
			open: false,
		}));
	};

	return (
		<>
			{communityModal.open ? (
				<section className="modal-pop-up z-50 fixed h-screen w-screen min-h-screen max-w-screen bg-[#00000040] top-0 left-0 px-8 py-12 overflow-y-auto scroll-y-style flex flex-col items-center">
					<div
						className="absolute -z-10 h-full w-full top-0 left-0 bg-transparent"
						onClick={() => handleClose()}
					></div>
					<div className="relative z-10 flex flex-col bg-white h-min max-h-[640px] max-w-[720px] rounded-[16px] w-full items-center shadow-lg shadow-[#0002]">
						<div className="w-full flex flex-row items-center justify-between border-b-[1px] py-[12px] px-4">
							<h1 className="font-bold text-xl text-gray-700">
								{communityModal.view === "create" && "Create Community"}
							</h1>
							<button
								type="button"
								title="Close"
								className="modal-close block h-[16px] w-[16px] aspect-square top-4 right-4"
								onClick={() => handleClose()}
							>
								<BsXLg className="icon h-full w-full aspect-square" />
							</button>
						</div>
						<div className="relative flex flex-1 flex-col overflow-hidden items-center w-full pt-4 pb-2">
							<div className="flex flex-col flex-1 items-center w-full overflow-y-auto overflow-x-hidden scroll-y-style px-4">
								{communityModal.view === "create" && (
									<CreateCommunity
										handleClose={handleClose}
										user={user}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			) : null}
		</>
	);
};

export default CommunityModal;
