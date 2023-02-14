import {
	BsArrowUpRightCircle,
	BsBell,
	BsCameraVideo,
	BsChatDots,
	BsFilterCircle,
	BsPlusCircle,
} from "react-icons/bs";

type RightContentIconsProps = {};

const RightContentIcons: React.FC<RightContentIconsProps> = () => {
	return (
		<section className="right-content-icons w-full px-2 flex flex-row gap-x-2 h-full items-center">
			<ul className="w-full h-full hidden md:flex flex-row gap-x-2">
				<li>
					<button
						type="button"
						title="Popular"
						className="button group"
					>
						<BsArrowUpRightCircle className="icon" />
					</button>
				</li>
				<li>
					<button
						type="button"
						title="Filter"
						className="button group"
					>
						<BsFilterCircle className="icon" />
					</button>
				</li>
				<li>
					<button
						type="button"
						title="Camera"
						className="button group"
					>
						<BsCameraVideo className="icon" />
					</button>
				</li>
			</ul>
			<span className="h-full w-[0.5px] bg-black bg-opacity-10 hidden md:block"></span>
			<ul className="h-full w-full flex flex-row gap-x-2">
				<li>
					<button
						type="button"
						title="Chat"
						className="button group"
					>
						<BsChatDots className="icon" />
					</button>
				</li>
				<li>
					<button
						type="button"
						title="Notifications"
						className="button group"
					>
						<BsBell className="icon" />
					</button>
				</li>
				<li>
					<button
						type="button"
						title="Create a Post"
						className="button group hidden sm:block"
					>
						<BsPlusCircle className="icon" />
					</button>
				</li>
			</ul>
		</section>
	);
};

export default RightContentIcons;
