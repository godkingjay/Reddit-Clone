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
			<summary className="dropdown-user list-none h-full w-full flex flex-row items-center justify-center gap-x-2 px-2 border-gray-300 border-solid border rounded-md cursor-pointer group">
				<FaRegUserCircle className="icon aspect-square h-[24px] w-[24px] fill-gray-600" />
				<h2 className="label hidden sm:inline mr-2">
					{user?.displayName ? user.displayName?.split(" ")[0] : "Profile"}
				</h2>
				<FaCaretDown className="caret fill-gray-400 group-hover:fill-gray-600 focus:fill-gray-600 transition-transform" />
			</summary>
			<div className="absolute bg-white top-[130%] w-max h-max right-0 rounded py-1 min-w-[192px] xs:min-w-[240px]">
				<ul className="dropdown-user-list h-full w-full flex flex-col">
					<li className="group">
						<button
							type="button"
							title="Profile"
						>
							<FaRegUserCircle className="icon" />
							<label className="label">Profile</label>
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
