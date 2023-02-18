import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import Link from "next/link";
import {
	BsArrowUpRightCircle,
	BsArrowUpRightCircleFill,
	BsBarChartLine,
	BsBarChartLineFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {
	CommunityModalState,
	communityModalState,
} from "@/atoms/communityModal";
import CommunityModal from "@/components/Modal/CommunityModal/CommunityModal";

type DirectoryProps = {};

type FeedsItem = {
	icon: JSX.Element;
	active: JSX.Element;
	title: string;
	path: string;
};

const Directory: React.FC<DirectoryProps> = () => {
	const setCommunityModal = useSetRecoilState(communityModalState);
	const router = useRouter();
	const [directory, setDirectory] = useState({
		inactive: null as null | FeedsItem["icon"],
		active: null as null | FeedsItem["active"],
		title: null as null | FeedsItem["title"],
		path: null as null | FeedsItem["path"],
	});

	const feedsItems: FeedsItem[] = [
		{
			icon: <AiOutlineHome className="icon" />,
			active: <AiFillHome className="icon active" />,
			title: "Home",
			path: "/",
		},
		{
			icon: <BsArrowUpRightCircle className="icon" />,
			active: <BsArrowUpRightCircleFill className="icon active" />,
			title: "Popular",
			path: "/r/popular",
		},
		{
			icon: <BsBarChartLine className="icon" />,
			active: <BsBarChartLineFill className="icon active" />,
			title: "All",
			path: "/r/all",
		},
	];

	useEffect(() => {
		const current = feedsItems.find((feed) => feed.path === router.pathname);
		handlePathChange(current as FeedsItem);
	}, [router]);

	const handlePathChange = (dir: FeedsItem) => {
		setDirectory({
			inactive: dir.icon,
			active: dir.active,
			title: dir.title,
			path: dir.path,
		});
	};

	const handleCommunityModal = (viewModal: CommunityModalState["view"]) => {
		setCommunityModal((prev) => ({
			open: true,
			view: viewModal,
		}));
	};

	return (
		<>
			<section className="h-full flex z-0 items-center w-max">
				<details className="nav-bar-dropdown directory-container relative h-full max-w-[240px]">
					<summary className="directory-header h-full w-max xs:w-[96px] md:w-[128px] lg:w-[129px] xl:w-[240px] flex items-center px-2 border-[1px] border-solid border-[#80808010] rounded-md gap-x-2">
						{directory.active}
						<h2 className="label hidden xs:block flex-1">{directory.title}</h2>
						<FaCaretDown className="caret fill-gray-400 transition-transform" />
					</summary>
					<div className="directory-content absolute w-[192px]  xs:w-[240px] bg-white top-[130%] h-max left-0 rounded py-1 shadow-sm max-h-[60vh] overflow-y-auto scroll-y-style">
						<details
							className="directory-communities"
							open
						>
							<summary>My Communities</summary>
							<ul>
								<li>
									<button
										type="button"
										title="some title"
										onClick={() => handleCommunityModal("create")}
									>
										<VscAdd className="icon" />
										<p className="label">Create Community</p>
									</button>
								</li>
								{/* <Communities /> */}
							</ul>
						</details>
						<details
							className="directory-feeds"
							open
						>
							<summary>Feeds</summary>
							<ul>
								{feedsItems.map((item) => {
									return (
										<li key={item.title}>
											<Link
												href={item.path}
												title={item.title}
												className="item"
												onClick={() => handlePathChange(item)}
											>
												{directory.title === item.title ? (
													<>{item.active}</>
												) : (
													<>{item.icon}</>
												)}
												<p>{item.title}</p>
											</Link>
										</li>
									);
								})}
							</ul>
						</details>
					</div>
				</details>
			</section>
			<CommunityModal />
		</>
	);
};

export default Directory;
