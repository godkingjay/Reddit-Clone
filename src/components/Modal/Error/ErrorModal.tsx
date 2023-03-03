import { errorModalState } from "@/atoms/errorModalAtom";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { useRecoilState } from "recoil";
import FileUploadError from "./Errors/FileUploadError";

type ErrorModalProps = {};

const ErrorModal: React.FC<ErrorModalProps> = () => {
	const [errorModal, setErrorModal] = useRecoilState(errorModalState);

	/**
	 *
	 *
	 */
	const handleClose = () => {
		setErrorModal((prev) => ({
			...prev,
			open: false,
		}));
	};

	return (
		<>
			{errorModal.open ? (
				<section className="modal-pop-up z-50 fixed h-screen w-screen min-h-screen max-w-screen bg-[#00000040] top-0 left-0 px-8 py-12 overflow-y-auto scroll-y-style flex flex-col items-center">
					<div
						className="absolute -z-10 h-full w-full top-0 left-0 bg-transparent"
						onClick={() => handleClose()}
					></div>
					<div className="relative z-10 flex flex-col bg-white h-min w-full max-h-[640px] max-w-[720px] rounded-2xl items-center shadow-lg shadow-[#0002] my-auto border-2 border-solid border-red-500">
						<div className="w-full flex flex-row items-center justify-between border-b-[1px] py-[8px] pl-4 pr-2 gap-x-8 bg-red-500 rounded-t-xl">
							<h1 className="font-bold text-xl text-white w-max">
								{errorModal.view === "file-upload" && "File Upload Error"}
							</h1>
							<button
								type="button"
								title="Close"
								className="modal-close block h-[32px] w-[32px] aspect-square top-4 right-4 text-white hover:bg-white focus:bg-white border-solid border-white p-2 rounded-full"
								onClick={() => handleClose()}
							>
								<BsXLg className="icon h-full w-full aspect-square" />
							</button>
						</div>
						<div className="relative flex flex-1 flex-col overflow-hidden items-center w-full py-2">
							<div className="flex flex-col flex-1 items-center w-full overflow-y-auto overflow-x-hidden scroll-y-style px-4">
								{errorModal.view === "file-upload" && <FileUploadError />}
							</div>
						</div>
					</div>
				</section>
			) : null}
		</>
	);
};

export default ErrorModal;
