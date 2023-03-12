import { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import { BsReddit } from "react-icons/bs";
import { useRouter } from "next/router";
import CreateCommunity from "./CreateCommunity";
import CommunityModal from "@/components/Modal/CommunityModal/CommunityModal";
import useCommunityData from "@/hooks/useCommunityData";
import CommunityListItem from "./CommunityListItem";
import { UserCommunity } from "@/atoms/communitiesAtom";
import Image from "next/image";
import useDirectory from "@/hooks/useDirectory";

type DirectoryProps = {};

export type FeedsItem = {
	icon?: JSX.Element;
	active: JSX.Element;
	title: string;
	path: string;
	type: "feeds" | "community";
};

export const feedsItems: FeedsItem[] = [
	{
		icon: <AiOutlineHome className="icon" />,
		active: <AiFillHome className="icon active" />,
		title: "Home",
		path: "/",
		type: "feeds",
	},
	// {
	// 	icon: <BsArrowUpRightCircle className="icon" />,
	// 	active: <BsArrowUpRightCircleFill className="icon active" />,
	// 	title: "Popular",
	// 	path: "/r/popular",
	// 	type: "feeds",
	// },
	// {
	// 	icon: <BsBarChartLine className="icon" />,
	// 	active: <BsBarChartLineFill className="icon active" />,
	// 	title: "All",
	// 	path: "/r/all",
	// 	type: "feeds",
	// },
];

const Directory: React.FC<DirectoryProps> = () => {
	const router = useRouter();
	const { communityStateValue } = useCommunityData();
	const { directoryOpen, setDirectoryOpen } = useDirectory();
	const [directory, setDirectory] = useState({
		icon: feedsItems[0].icon,
		active: feedsItems[0].active,
		title: feedsItems[0].title,
		path: feedsItems[0].path,
		type: feedsItems[0].type,
	});
	const directoryRef = useRef<HTMLDetailsElement>(null);

	const {
		communityStateValue: { userCommunities },
	} = useCommunityData();

	/**
	 *
	 *
	 * @param {FeedsItem} dir
	 */
	const handlePathChange = (
		dir?: FeedsItem | null,
		community?: UserCommunity | null
	) => {
		if (dir && dir.path !== directory.path) {
			setDirectory({
				icon: dir.icon,
				active: dir.active,
				title: dir.title,
				path: dir.path,
				type: dir.type,
			});
			router.push(dir.path);
		} else if (community && `/r/${community.communityId}` !== directory.path) {
			setDirectory({
				icon: community.imageURL ? (
					<Image
						src={community.imageURL}
						alt={community.communityId}
						height={256}
						width={256}
						className="icon"
					/>
				) : (
					<BsReddit className="icon active" />
				),
				active: community.imageURL ? (
					<Image
						src={community.imageURL}
						alt={community.communityId}
						height={256}
						width={256}
						className="icon"
					/>
				) : (
					<BsReddit className="icon active" />
				),
				title: community.communityId,
				path: `/r/${community.communityId}`,
				type: "community",
			});
			router.push(`/r/${community.communityId}`);
		}
	};

	useEffect(() => {
		if (communityStateValue.currentCommunity.id) {
			handlePathChange(null, {
				communityId: communityStateValue.currentCommunity.id,
				imageURL: communityStateValue.currentCommunity.imageURL,
				isModerator: userCommunities.find(
					(community) =>
						community.communityId === communityStateValue.currentCommunity.id
				)?.isModerator,
			});
		}
	}, [communityStateValue.currentCommunity]);

	return (
		<>
			<section className="h-full flex z-20items-center w-max">
				<details
					className="nav-bar-dropdown directory-container relative h-full max-w-[240px]"
					ref={directoryRef}
					onClick={(e) => {
						e.preventDefault();
					}}
					open={directoryOpen.open}
				>
					<summary
						className="directory-header h-full w-max xs:w-[96px] md:w-[128px] lg:w-[129px] xl:w-[240px] flex items-center px-2 border-[1px] border-solid border-[#80808010] rounded-md gap-x-2"
						onClick={(e) => {
							setDirectoryOpen((prev) => ({
								...prev,
								open: !prev.open,
							}));
						}}
					>
						{directory.active}
						<h2 className="label hidden xs:block flex-1 text-sm">
							{directory.title}
						</h2>
						<FaCaretDown className="caret max-[380px]:hidden fill-gray-400 transition-transform" />
					</summary>
					<div className="directory-content absolute z-30 w-[192px]  xs:w-[240px] bg-white top-[130%] h-max left-0 rounded py-1 shadow-[0_0_8px_#0001] max-h-[60vh] overflow-y-auto scroll-y-style">
						<details
							className="directory-communities"
							open
						>
							<summary>
								<FaCaretRight className="caret" />
								<p className="label">Moderating</p>
							</summary>
							<ul>
								{userCommunities
									.filter((community) => community.imageURL)
									.map((community) => {
										return (
											<CommunityListItem
												key={community.communityId}
												community={community}
												handlePathChange={handlePathChange}
											/>
										);
									})}
							</ul>
						</details>
						<details
							className="directory-communities"
							open
						>
							<summary>
								<FaCaretRight className="caret" />
								<p className="label">My Communities</p>
							</summary>
							<ul>
								<CreateCommunity />
								{userCommunities.map((community) => {
									return (
										<CommunityListItem
											key={community.communityId}
											community={community}
											handlePathChange={handlePathChange}
										/>
									);
								})}
							</ul>
						</details>
						<details
							className="directory-feeds"
							open
						>
							<summary>
								<FaCaretRight className="caret" />
								<p className="label">Feeds</p>
							</summary>
							<ul>
								{feedsItems.map((item) => {
									return (
										<li key={item.title}>
											<Link
												href={item.path}
												title={item.title}
												className="item"
												onClick={() => handlePathChange(item, null)}
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
				<CommunityModal />
			</section>
		</>
	);
};

export default Directory;
