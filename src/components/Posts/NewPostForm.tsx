import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import React, { useState } from "react";

type NewPostFormProps = {};

export type FormTabItem = {
	title: "Post" | "Images & Videos" | "Link" | "Poll" | "Talk";
	icon: JSX.Element;
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

const NewPostForm: React.FC<NewPostFormProps> = () => {
	const [currentTab, setCurrentTab] = useState(formTabs[0].title);
	const [postInput, setPostInput] = useState({
		title: "",
		body: "",
	});
	const [selectedFile, setSelectedFile] = useState<string>();
	const [postInputLength, setPostInputLength] = useState({
		title: 0,
	});

	const handleCreatePost = () => {};

	const handleSelectImage = () => {};

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
		<div className="bordered-box-1 flex flex-col bg-white rounded-md overflow-hidden">
			<div className="tab-items-container flex flex-row w-full">
				{formTabs.map((tab) => (
					<TabItem
						key={tab.title}
						tabItem={tab}
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
					/>
				))}
			</div>
			<div className="p-4 flex flex-col">
				<div className="flex flex-row border-[1px] border-solid border-gray-300 py-2 px-4 rounded-md hover:border-blue-500 focus-within:border-blue-500 gap-x-2">
					<textarea
						name="title"
						title="Post Title"
						placeholder="Title"
						className="flex-1 min-w-0 outline-none text-sm bg-transparent font-semibold break-words resize-none"
						maxLength={300}
						onChange={(e) => {
							handleTextChange(e);
							e.currentTarget.style.height = "0px";
							e.currentTarget.style.height =
								e.currentTarget.scrollHeight + "px";
						}}
						rows={1}
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
			</div>
		</div>
	);
};

export default NewPostForm;
