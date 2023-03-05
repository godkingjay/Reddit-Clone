import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import React, { useState } from "react";
import PostForm from "./FormItems/PostForm";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import ImagesAndVideosForm from "./FormItems/ImagesAndVideosForm";
import { useSetRecoilState } from "recoil";
import { errorModalState } from "@/atoms/errorModalAtom";
import { useRouter } from "next/router";
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	runTransaction,
	serverTimestamp,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import ErrorBanner from "../Banner/ErrorBanner";
import { UserAuth } from "@/pages/_app";

type NewPostFormProps = {
	user: UserAuth["user"];
	tabItem?: FormTabItem["title"];
};

export type FormTabItem = {
	title: "Post" | "Images & Videos" | "Link" | "Poll" | "Talk";
	icon: JSX.Element;
};

export type ImageAndVideo = {
	url: string;
	type: string;
	name: string;
	index: number;
	caption: string;
	link: string;
	path?: string;
};

const formTabs: FormTabItem[] = [
	{
		title: "Post",
		icon: <IoDocumentText />,
	},
	{
		title: "Images & Videos",
		icon: <IoImageOutline />,
	},
	{
		title: "Link",
		icon: <BsLink45Deg />,
	},
	{
		title: "Poll",
		icon: <BiPoll />,
	},
	{
		title: "Talk",
		icon: <BsMic />,
	},
];

const maxUploads = 20;
const maxFileSize = 20000000;

/**
 *
 *
 * @param {*} { user, tabItem }
 * @return {*}
 */
const NewPostForm: React.FC<NewPostFormProps> = ({ user, tabItem }) => {
	const router = useRouter();
	const setErrorModal = useSetRecoilState(errorModalState);
	const [currentTab, setCurrentTab] = useState(
		tabItem ? tabItem : formTabs[0].title
	);
	const [loading, setLoading] = useState(false);
	const [imagesAndVideos, setImagesAndVideos] = useState<ImageAndVideo[]>([]);
	const [isFileExists, setIsFileExists] = useState(false);
	const [postError, setPostError] = useState("");
	const [postInput, setPostInput] = useState({
		title: "",
		body: "",
	});
	const [postInputLength, setPostInputLength] = useState({
		title: 0,
		body: 0,
	});

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
	 * @param {React.FormEvent<HTMLFormElement>} e
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPostError("");
		setLoading(true);
		handleCreatePost();
	};

	/**
	 *
	 *
	 */
	const handleCreatePost = async () => {
		const { communityId } = router.query;
		const { title, body } = postInput;

		const newPost = {
			communityId: communityId as string,
			creatorId: user.uid,
			creatorDisplayName: user?.displayName
				? user.displayName
				: user.email!.split("@")[0],
			title,
			body,
			numberOfComments: 0,
			voteStatus: 0,
			createdAt: serverTimestamp() as Timestamp,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			if (imagesAndVideos.length > 0) {
				imagesAndVideos.forEach(async (imageAndVideo, index) => {
					await runTransaction(firestore, async (transaction) => {
						imageAndVideo = {
							...imageAndVideo,
							path: `posts/${postDocRef.id}/${index}`,
						};
						const imageAndVideoStorageRef = await ref(
							storage,
							imageAndVideo.path
						);
						await uploadString(
							imageAndVideoStorageRef,
							imageAndVideo.url,
							"data_url"
						);
						const downloadURL = await getDownloadURL(imageAndVideoStorageRef);
						const postImageAndVideoDocRef = doc(
							firestore,
							`posts/${postDocRef.id}/imagesAndVideos`,
							downloadURL.split("=").pop() as string
						);
						const newImageAndVideo = {
							postId: postDocRef.id,
							type: imageAndVideo.type,
							name: imageAndVideo.name,
							url: downloadURL,
							id: downloadURL.split("=").pop() as string,
							path: imageAndVideo.path,
							index,
						};
						transaction.set(postImageAndVideoDocRef, newImageAndVideo);
					});
				});
			}
			if (postError.length === 0) {
				await new Promise(() => {
					setTimeout(() => router.push(`/r/${communityId}`), 2000);
				});
				setImagesAndVideos([]);
				setIsFileExists(false);
				setPostInput({ title: "", body: "" });
				setPostInputLength({ title: 0, body: 0 });
			}
		} catch (error: any) {
			console.log("Post Creation ERROR:", error.message);
			setPostError(error.message as string);
		}
		setLoading(false);
	};

	/**
	 *
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handleUploadImagesAndVideos = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.files?.[0] && imagesAndVideos.length < 20) {
			const files = Array.from(e.target.files)
				.filter((file) => validateFile(file.name, file.size))
				.slice(0, maxUploads - imagesAndVideos.length);
			files.forEach((file) => {
				if (imagesAndVideos.length < maxUploads) {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = (readerEvent) => {
						if (readerEvent.target?.result) {
							setImagesAndVideos((prev) => [
								...prev,
								{
									url: readerEvent.target?.result as string,
									type: file.type.split("/")[0],
									name: file.name,
									caption: "",
									link: "",
									index: prev.length > 0 ? prev[prev.length - 1].index + 1 : 0,
								},
							]);
						}
					};
				}
			});
		}
		if (imagesAndVideos.length > 0) {
			setIsFileExists(true);
		}
	};

	/**
	 *
	 *
	 * @param {number} index
	 */
	const handleRemoveImageAndVideo = (index: number) => {
		setImagesAndVideos((prev) => prev.filter((img) => img.index !== index));
	};

	/**
	 *
	 *
	 * @param {(React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)} e
	 */
	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPostInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		setPostInputLength((prev) => ({
			...prev,
			[e.target.name]: e.target.value.length,
		}));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bordered-box-1 flex flex-col bg-white rounded-md overflow-hidden overflow-x-hidden"
		>
			<div className="tab-items-container flex flex-row w-full overflow-x-auto scroll-x-style">
				{formTabs.map((tab) => (
					<TabItem
						key={tab.title}
						tabItem={tab}
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
					/>
				))}
			</div>
			<div className="p-4 flex flex-col gap-y-4">
				<div className="relative flex flex-row border-[1px] border-solid border-gray-300 py-2 px-4 rounded-md hover:border-blue-500 focus-within:border-blue-500 gap-x-2">
					<textarea
						required
						name="title"
						title="Post Title"
						placeholder="Title"
						className="flex-1 min-w-0 outline-none text-sm bg-transparent font-semibold break-words resize-none"
						minLength={1}
						maxLength={300}
						onChange={(e) => {
							handleTextChange(e);
							e.currentTarget.style.height = "0px";
							e.currentTarget.style.height =
								e.currentTarget.scrollHeight + "px";
						}}
						rows={1}
						value={postInput.title}
						disabled={loading}
					/>
					<p
						className={`mt-auto text-2xs font-semibold
          ${
						300 - postInputLength.title === 0 ? "text-red-500" : "text-gray-400"
					}`}
					>
						{300 - postInputLength.title}/300
					</p>
				</div>
				{currentTab === "Post" && (
					<PostForm
						handleTextChange={handleTextChange}
						bodyValue={postInput.body}
						loading={loading}
					/>
				)}
				{currentTab === "Images & Videos" && (
					<ImagesAndVideosForm
						imagesAndVideos={imagesAndVideos}
						handleUploadImagesAndVideos={handleUploadImagesAndVideos}
						handleRemoveImageAndVideo={handleRemoveImageAndVideo}
						maxUploads={maxUploads}
						loading={loading}
					/>
				)}
				<div className="flex flex-row items-center justify-end pt-4 border-t-[1px] border-solid border-gray-200">
					<button
						type="submit"
						title="Post"
						className="page-button text-xs px-6 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600 disabled:bg-gray-500 disabled:border-gray-500 w-[80px] h-[36px]"
						disabled={postInputLength.title === 0 || loading}
					>
						{loading ? (
							<LoadingSpinner className="aspect-square h-full w-full [&>path]:stroke-white animate-spin" />
						) : (
							<span>Post</span>
						)}
					</button>
				</div>
			</div>
			{postError && (
				<ErrorBanner
					title="Post Creation Error"
					message={postError}
					setError={setPostError}
				/>
			)}
		</form>
	);
};

export default NewPostForm;
