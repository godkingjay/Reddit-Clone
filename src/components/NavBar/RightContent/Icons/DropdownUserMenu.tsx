import { useState } from "react";
import { FaCaretDown, FaDoorOpen, FaRegUserCircle } from "react-icons/fa";
import { auth } from "@/firebase/clientApp";
import { User, signOut } from "firebase/auth";

type DropdownUserMenuProps = {
	user?: User | null;
};

const DropdownUserMenu: React.FC<DropdownUserMenuProps> = ({ user }) => {
	const [dropdownActive, setDropdownActive] = useState(false);

	return (
		<details className="relative h-full w-full [&[open]>summary>.caret]:fill-gray-600 [&[open]>summary>.caret]:rotate-180">
			<summary className="dropdown-user list-none h-full w-full flex flex-row items-center justify-center gap-x-2 px-2 border-gray-300 border-solid border hover:border-gray-400 focus:border-gray-400 rounded-md cursor-pointer group">
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
				<FaCaretDown className="caret fill-gray-400 group-hover:fill-gray-600 focus:fill-gray-600 transition-transform" />
			</summary>
			<div className="absolute bg-white top-[130%] h-max right-0 rounded py-1 min-w-[192px] max-w-[192px] xs:min-w-[240px] xs:max-w-[240px]">
				<ul className="dropdown-user-list h-full w-full flex flex-col">
					<li className="group">
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
					<li
						className="group"
						onClick={() => signOut(auth)}
					>
						<button
							type="button"
							title="Log Out"
							className="user-logout"
						>
							<FaDoorOpen className="icon group-hover:fill-red-500 group-focus-within:fill-red-500" />
							<label className="label group-hover:text-red-500 group-focus-within:text-red-500">
								Log Out
							</label>
						</button>
					</li>
				</ul>
			</div>
		</details>
	);
};

export default DropdownUserMenu;
