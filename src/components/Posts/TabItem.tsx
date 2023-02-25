import { FormTabItem } from "./NewPostForm";

type FormTabItemProps = {
	tabItem: FormTabItem;
	currentTab: string;
	setCurrentTab: (tab: string) => void;
};

const TabItem: React.FC<FormTabItemProps> = ({
	tabItem,
	currentTab,
	setCurrentTab,
}) => {
	return (
		<button
			type="button"
			title={tabItem.title}
			className="tab-item cursor-pointer"
			disabled={currentTab === tabItem.title}
			onClick={() => setCurrentTab(tabItem.title)}
		>
			<div className="tab-item-icon-container">{tabItem.icon}</div>
			<h2 className="tab-item-label hidden sm:inline">{tabItem.title}</h2>
		</button>
	);
};

export default TabItem;
