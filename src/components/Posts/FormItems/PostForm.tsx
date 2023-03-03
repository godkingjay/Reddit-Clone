import React from "react";

type PostProps = {
	handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	bodyValue: string;
	loading: boolean;
};

/**
 *
 *
 * @param {*} {
 * 	handleTextChange,
 * 	bodyValue,
 * 	loading,
 * }
 * @return {*}
 */
const Post: React.FC<PostProps> = ({
	handleTextChange,
	bodyValue,
	loading,
}) => {
	return (
		<div className="relative flex flex-col border-[1px] border-solid border-gray-300 rounded-md hover:border-blue-500 focus-within:border-blue-500 gap-x-2">
			<textarea
				name="body"
				placeholder="Text(optional)"
				title="Body"
				minLength={0}
				maxLength={40000}
				onChange={(e) => {
					handleTextChange(e);
					e.currentTarget.style.height = "0px";
					e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
				}}
				className="min-w-0 outline-none text-sm bg-transparent break-words min-h-[120px] px-4 py-2"
				rows={1}
				value={bodyValue}
				disabled={loading}
			/>
		</div>
	);
};

export default Post;
