import { UserAuth } from "@/pages/_app";
import React from "react";
import { BsSearch } from "react-icons/bs";

type SearchInputProps = {
	user?: UserAuth["user"] | null;
};

/**
 *
 *
 * @param {*} { user }
 * @return {*}
 */
const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
	return (
		<div className="flex flex-row flex-1 group max-w-[600px] h-full mx-auto">
			<div className="flex flex-1 flex-row justify-start items-center bg-gray-100 border-transparent border-solid border-[1px] rounded-full py-1 px-[16px] space-x-2 group-hover:border-blue-500 group-active:border-blue-500 group-focus-within:border-blue-500">
				<BsSearch className="w-[20px] h-full fill-gray-400" />
				<input
					title="Search Reddit..."
					type="text"
					name="search-reddit"
					id="search-reddit"
					placeholder="Search Reddit..."
					className="bg-transparent outline-none flex-1 text-sm min-w-0 w-0"
				/>
			</div>
		</div>
	);
};

export default SearchInput;
