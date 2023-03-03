import React from "react";

type EmptyProps = {
	uploadImagesAndVideos: React.RefObject<HTMLInputElement>;
	loading: boolean;
};

/**
 *
 *
 * @param {*} { uploadImagesAndVideos, loading }
 * @return {*}
 */
const Empty: React.FC<EmptyProps> = ({ uploadImagesAndVideos, loading }) => {
	return (
		<div className="relative flex flex-col border-2 bg-transparent border-dashed border-gray-300 rounded-md hover:border-blue-500 focus-within:border-blue-500 gap-x-2 outline-none">
			<div className="h-[240px] w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[128px]">
					<button
						type="button"
						title="Upload"
						className="page-button w-full bg-transparent text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 focus:bg-blue-500 focus:bg-opacity-10"
						onClick={() => uploadImagesAndVideos.current?.click()}
						disabled={loading}
					>
						Upload
					</button>
				</div>
			</div>
		</div>
	);
};

export default Empty;
