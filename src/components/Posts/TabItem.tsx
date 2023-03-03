import { FormTabItem } from "./NewPostForm";

type FormTabItemProps = {
	tabItem: FormTabItem;
	currentTab: FormTabItem["title"];
	setCurrentTab: (tab: FormTabItem["title"]) => void;
};

/**
 *
 *
 * @param {*} {
 * 	tabItem,
 * 	currentTab,
 * 	setCurrentTab,
 * }
 * @return {*}
 */
const TabItem: React.FC<FormTabItemProps> = ({
	tabItem,
	currentTab,
	setCurrentTab,
}) => {
	return (
		<button
			type="button"
			title={tabItem.title}
			className={`tab-item ${tabItem.title === currentTab ? "active" : ""}`}
			onClick={() => setCurrentTab(tabItem.title)}
			disabled={tabItem.title === currentTab}
		>
			<div className="tab-item-icon-container">{tabItem.icon}</div>
			<h2 className="tab-item-label hidden sm:inline">{tabItem.title}</h2>
		</button>
	);
};

export default TabItem;
