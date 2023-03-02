import React from "react";

type SidebarSkeletonProps = {};

const SidebarSkeleton: React.FC<SidebarSkeletonProps> = () => {
	return (
		<div className="w-full flex flex-col gap-y-4">
			<div className="bordered-box-1 bg-white rounded-md">
				<div className="flex flex-col animate-pulse">
					<div className="flex flex-row items-center justify-between p-2">
						<div className="h-4 w-[50%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						<div className="h-4 w-4 aspect-square rounded-full bg-gray-500 bg-opacity-[15%]"></div>
					</div>
					<div className="grid grid-cols-2 gap-x-2 p-2">
						<div className="flex flex-col gap-y-1">
							<div className="h-4 w-[20%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
							<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						</div>
						<div className="flex flex-col gap-y-1">
							<div className="h-4 w-[20%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
							<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						</div>
					</div>
					<div className="flex flex-row items-center gap-x-2 p-2">
						<div className="h-4 w-[75%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
					</div>
					<div className="flex flex-row items-center p-2">
						<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-full"></div>
					</div>
				</div>
			</div>
			<div className="bordered-box-1 bg-white rounded-md">
				<div className="flex flex-col animate-pulse">
					<div className="flex flex-row items-center justify-between p-2">
						<div className="h-4 w-[50%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						<div className="h-4 w-4 aspect-square rounded-full bg-gray-500 bg-opacity-[15%]"></div>
					</div>
					<div className="grid grid-cols-2 gap-x-2 p-2">
						<div className="flex flex-col gap-y-1">
							<div className="h-4 w-[20%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
							<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						</div>
						<div className="flex flex-col gap-y-1">
							<div className="h-4 w-[20%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
							<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
						</div>
					</div>
					<div className="flex flex-row items-center gap-x-2 p-2">
						<div className="h-4 w-[75%] bg-gray-500 bg-opacity-[15%] rounded-sm"></div>
					</div>
					<div className="flex flex-row items-center p-2">
						<div className="h-4 w-full bg-gray-500 bg-opacity-[15%] rounded-full"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarSkeleton;
