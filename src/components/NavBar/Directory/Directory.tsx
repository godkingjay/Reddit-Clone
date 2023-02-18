import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { HiOutlinePlus, HiPlus } from "react-icons/hi";
import { VscAdd } from "react-icons/vsc";

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps> = () => {
	const [directory, setDirectory] = useState("home");

	return (
		<section className="h-full flex items-center w-max">
			<details className="nav-bar-dropdown directory-container relative h-full max-w-[240px]">
				<summary className="directory-header h-full w-max xs:w-[96px] md:w-[128px] lg:w-[129px] xl:w-[240px] flex items-center px-2 border-[1px] border-solid border-gray-300 rounded-md">
					<h2 className="hidden xs:block flex-1">
						{directory.slice(0, 1).toUpperCase() +
							directory.slice(1, directory.length)}
					</h2>
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
								>
									<VscAdd className="icon" />
									<p className="label">Create Community</p>
								</button>
							</li>
						</ul>
					</details>
					<details
						className="directory-feeds"
						open
					>
						<summary>Feeds</summary>
						<ul>
							<li>
								<button
									type="button"
									title="some title"
								>
									<p>sample</p>
								</button>
							</li>
						</ul>
					</details>
				</div>
			</details>
		</section>
	);
};

export default Directory;
