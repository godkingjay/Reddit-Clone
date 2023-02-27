import React from "react";

type EmptyProps = {
	uploadImagesAndVideos: React.RefObject<HTMLInputElement>;
};

const Empty: React.FC<EmptyProps> = ({ uploadImagesAndVideos }) => {
	return (
		<button
			type="button"
			title="Upload"
			className="relative flex flex-col border-2 bg-transparent border-dashed border-gray-300 rounded-md hover:border-blue-500 focus-within:border-blue-500 gap-x-2 outline-none"
			onClick={() => uploadImagesAndVideos.current?.click()}
		>
			<div className="h-[240px] w-full flex flex-col items-center justify-center">
				<div className="w-full max-w-[128px]">
					<button
						type="button"
						title="Upload"
						className="page-button w-full bg-transparent text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 focus:bg-blue-500 focus:bg-opacity-10"
						onClick={() => uploadImagesAndVideos.current?.click()}
					>
						Upload
					</button>
				</div>
			</div>
		</button>
	);
};

export default Empty;
