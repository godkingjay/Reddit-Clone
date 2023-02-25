import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import { useState } from "react";

type NewPostFormProps = {};

export type FormTabItem = {
	title: string;
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
			<div>Post</div>
		</div>
	);
};

export default NewPostForm;
