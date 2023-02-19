import { useState } from "react";
import { FaCaretDown, FaDoorOpen, FaRegUserCircle } from "react-icons/fa";
import { auth } from "@/firebase/clientApp";
import { User, signOut } from "firebase/auth";
import { IconType } from "react-icons";

type DropdownUserMenuProps = {
	user?: User | null;
};

// type DropdownItem = {
// 	icon: React.ReactNode;
// 	title: string;
// 	class: string[] | null;
// };

const DropdownUserMenu: React.FC<DropdownUserMenuProps> = ({ user }) => {
	const [dropdownActive, setDropdownActive] = useState(false);

	// const DropdownItems: DropdownItem[] = [
	// 	{
	// 		icon: <FaRegUserCircle className="icon" />,
	// 		title: user?.displayName ? user.displayName : "Profile",
	// 		class: null,
	// 	},
	// 	{
	// 		icon: <FaDoorOpen className="icon" />,
	// 		title: "Log Out",
	// 		class: ["user-logout"],
	// 	},
	// ];

	return (
		<details className="nav-bar-dropdown relative h-full w-full">
			<summary className="dropdown-user list-none h-full w-full flex flex-row items-center justify-center gap-x-2 px-2 border-gray-300 border-solid border rounded-md cursor-pointer group">
				<div className="relative aspect-square h-[24px] w-[24px]">
					<FaRegUserCircle className="icon w-full h-full fill-gray-600" />
					<p className="absolute w-max px-1 py-[2px] min-w-[16px] break-word text-[8px] font-bold text-white bg-brand-100 text-center rounded-full top-[50%] left-[50%] sm:hidden">
						1
					</p>
				</div>
				<div className="label hidden sm:flex flex-col mr-2 items-start">
					<h2>
						{user?.displayName ? user.displayName?.split(" ")[0] : "Profile"}
					</h2>
					<p>
						<span>1 karma</span>
					</p>
				</div>
				<FaCaretDown className="caret fill-gray-400 transition-transform" />
			</summary>
			<div className="absolute z-30 bg-white top-[130%] h-max right-0 rounded py-1 min-w-[192px] max-w-[192px] xs:min-w-[240px] xs:max-w-[240px] shadow-sm max-h-[60vh] overflow-y-auto scroll-y-style">
				<ul className="dropdown-user-list h-full w-full flex flex-col">
					<li>
						<button
							type="button"
							title="Profile"
						>
							<FaRegUserCircle className="icon" />
							<label className="label truncate">
								{user?.displayName ? user.displayName : "Profile"}
							</label>
						</button>
					</li>
					<li onClick={() => signOut(auth)}>
						<button
							type="button"
							title="Log Out"
							className="user-logout"
						>
							<FaDoorOpen className="icon" />
							<label className="label">Log Out</label>
						</button>
					</li>
					{/* {DropdownItems.map((item: DropdownItem) => {
						return (
							<li key={item.title}>
								<button
									type="button"
									title={item.title}
								>
									{item.icon}
									<label className="label truncate">{item.title}</label>
								</button>
							</li>
						);
					})} */}
				</ul>
			</div>
		</details>
	);
};

export default DropdownUserMenu;
