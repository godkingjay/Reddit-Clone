import React from "react";

type CommentSkeletonProps = {};

const CommentSkeleton: React.FC<CommentSkeletonProps> = () => {
	return (
		<div className="w-full h-36">
			<div className="flex flex-row w-full h-full gap-x-4 animate-pulse">
				<div className="w-12 h-full flex flex-col gap-y-2 items-center">
					<div className="w-12 h-12 aspect-square rounded-full bg-gray-500 bg-opacity-10"></div>
					<div className="w-1 flex-1 aspect-square rounded-full bg-gray-500 bg-opacity-10"></div>
				</div>
				<div className="w-full h-full flex flex-col py-2 gap-y-4">
					<div className="min-w-[128px] w-[25%] h-6 bg-gray-500 bg-opacity-10 rounded-md"></div>
					<div className="w-full flex-1 flex flex-col gap-y-2">
						<div className="w-full h-6 bg-gray-500 bg-opacity-10 rounded-md"></div>
						<div className="w-[60%] h-6 bg-gray-500 bg-opacity-10 rounded-md"></div>
						<div className="w-[80%] h-6 bg-gray-500 bg-opacity-10 rounded-md"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentSkeleton;
