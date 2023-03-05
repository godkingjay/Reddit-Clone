import { Community, communityState } from "@/atoms/communitiesAtom";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiCake2Line } from "react-icons/ri";
import NoCommunityImage from "public/svg/community-no-image.svg";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import { useSetRecoilState } from "recoil";
import { errorModalState } from "@/atoms/errorModalAtom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { authModalState } from "@/atoms/authModalAtom";
import { UserAuth } from "@/pages/_app";

type AboutCommunityProps = {
	communityData: Community;
	user?: UserAuth["user"] | null;
};

const maxFileSize = 20 * 1024 * 1024;

/**
 *
 *
 * @param {*} { communityData }
 * @return {*}
 */
const AboutCommunity: React.FC<AboutCommunityProps> = ({
	communityData,
	user,
}) => {
	const router = useRouter();
	const selectFileRef = useRef<HTMLInputElement>(null);
	const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
	const [uploadingImage, setUploadingImage] = useState(false);
	const setAuthModalState = useSetRecoilState(authModalState);
	const setErrorModal = useSetRecoilState(errorModalState);
	const setCommunityStateValue = useSetRecoilState(communityState);
	const { pathname } = router;

	/**
	 *
	 *
	 * @param {string} fileName
	 * @param {number} fileSize
	 * @return {*}
	 */
	const validateFile = (fileName: string, fileSize: number) => {
		const allowedExtensions = /(\.jpg|\.jpeg|\.jfif|\.pjpeg|\.pjp|\.png)$/i;
		if (!allowedExtensions.exec(fileName) || fileSize > maxFileSize) {
			setErrorModal((prev) => ({
				...prev,
				open: true,
				view: "file-upload",
			}));
			return false;
		} else return true;
	};

	/**
	 *
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handleUploadImagesAndVideos = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			if (validateFile(file.name, file.size)) {
				onSelectFile(e);
			}
		}
	};

	/**
	 *
	 *
	 * @param {React.MouseEvent<HTMLButtonElement>} e
	 * @return {*}
	 */
	const onUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!selectedFile) return;
		setUploadingImage(true);
		try {
			const imageRef = ref(storage, `communities/${communityData.id}/image`);
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(firestore, `communities`, communityData.id), {
				imageURL: downloadURL,
			});
			setCommunityStateValue((prev) => ({
				...prev,
				currentCommunity: {
					...prev.currentCommunity,
					imageURL: downloadURL,
				},
			}));
		} catch (error: any) {
			console.log("Error updating image: ", error.message);
		}
		setUploadingImage(false);
	};

	const handleNavigateToPostCreation = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		if (user) {
			router.push(`/r/${communityData.id}/submit`);
		} else {
			setAuthModalState((prev) => ({
				...prev,
				open: true,
				view: "login",
			}));
		}
	};

	return (
		<div className="bordered-box-1 bg-white rounded-md">
			<div className="flex flex-col w-full">
				<div className="bg-blue-500 rounded-t-md p-2 flex flex-row items-center h-full justify-between relative">
					<p className="text-sm font-bold text-white py-2">About Community</p>
					<div className="h-8">
						<details className="h-full [&[open]>summary]:bg-black [&[open]>summary]:bg-opacity-10">
							<summary className="list-none h-8 w-8 aspect-square cursor-pointer text-white rounded-full p-1 hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10">
								<BsThreeDots className="h-full w-full" />
							</summary>
							<div className="absolute w-[192px] right-0 bg-white shadow-[0_0_16px_#0002] rounded-md">
								<p>Hello</p>
							</div>
						</details>
					</div>
				</div>
				<div className="grid grid-cols-2 px-2 gap-y-2 py-4">
					<div className="flex flex-col px-2">
						<p className="text-sm font-bold text-brand-100">
							{communityData.members.toLocaleString()}
						</p>
						<p className="text-xs text-gray-500">Members</p>
					</div>
					<div className="flex flex-col px-2">
						<p className="text-sm font-bold text-green-400">
							{communityData.members.toLocaleString()}
						</p>
						<p className="text-xs text-gray-500">Online</p>
					</div>
				</div>
				{communityData.createdAt && (
					<>
						<div className="h-[1px] bg-gray-500 bg-opacity-20 mx-2"></div>
						<div className="flex flex-row gap-x-2 items-center py-4 px-2">
							<div className="w-6 h-6 aspect-square">
								<RiCake2Line className="h-full w-full" />
							</div>
							<p className="text-sm text-gray-500">
								Created at{" "}
								{moment(
									new Date(communityData.createdAt.seconds * 1000)
								).format("MMM DD, YYYY")}
							</p>
						</div>
					</>
				)}
				<div className="h-[1px] bg-gray-500 bg-opacity-20 mx-2"></div>
				{!(pathname.split("/").pop() as string).match(/submit/g) && (
					<div className="px-2 py-4 flex flex-col items-center">
						<button
							type="button"
							title="Create A Post"
							onClick={handleNavigateToPostCreation}
							className="page-button max-w-none w-full flex flex-row justify-center items-center hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
						>
							Create A Post
						</button>
					</div>
				)}
				{user?.uid === communityData.creatorId && (
					<>
						<div className="h-[1px] bg-gray-500 bg-opacity-20 mx-2"></div>
						<div className="flex flex-col gap-y-1 px-2 py-4">
							<p className="text-sm font-bold">Admin</p>
							<div className="flex flex-row items-center justify-between gap-x-2">
								<p
									className="text-blue-500 cursor-pointer text-sm hover:underline"
									onClick={() => selectFileRef.current?.click()}
								>
									Change Image
								</p>
								<div className="aspect-square w-12 h-12 rounded-full bg-white">
									{communityData.imageURL || selectedFile ? (
										<Image
											src={
												((selectedFile as string) ||
													communityData.imageURL) as string
											}
											alt={`${communityData.name} image`}
											width={256}
											height={256}
											loading="lazy"
											className="w-full h-full rounded-full bg-contain bg-center"
										/>
									) : (
										<NoCommunityImage className="w-full h-full rounder-full fill-blue-500" />
									)}
								</div>
							</div>
							{selectedFile &&
								(uploadingImage ? (
									<button
										type="button"
										title="Save Changes"
										className="page-button max-w-none w-full grayscale h-10"
									>
										<LoadingSpinner className="aspect-square h-full w-full [&>path]:stroke-white animate-spin" />
									</button>
								) : (
									<button
										type="button"
										title="Save Changes"
										className="page-button max-w-none w-full h-10 bg-brand-100 border-brand-100 hover:bg-brand-200 hover:border-brand-200 focus:bg-brand-200 focus:border-brand-200"
										onClick={onUpdateImage}
									>
										Save Changes
									</button>
								))}
						</div>
						<input
							type="file"
							accept="image/png, image/jpeg"
							title="Upload File"
							ref={selectFileRef}
							onChange={handleUploadImagesAndVideos}
							hidden
							disabled={uploadingImage}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AboutCommunity;
