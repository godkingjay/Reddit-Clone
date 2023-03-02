type NewPostFormSkeletonProps = {};

const NewPostFormSkeleton: React.FC<NewPostFormSkeletonProps> = () => {
	return (
		<div className="bordered-box-1 flex flex-col bg-white rounded-md gap-y-4 py-4 overflow-hidden">
			<div className="tab-items-container flex flex-row w-full animate-pulse px-4 gap-x-4">
				<div className="flex-1 flex flex-row gap-x-2 h-8">
					<div className="h-6 w-6 aspect-square bg-gray-500 rounded-full bg-opacity-[15%]"></div>
					<div className="h-6 w-full bg-gray-500 rounded-sm bg-opacity-[15%]"></div>
				</div>
				<div className="flex-1 flex flex-row gap-x-2 h-8">
					<div className="h-6 w-6 aspect-square bg-gray-500 rounded-full bg-opacity-[15%]"></div>
					<div className="h-6 w-full bg-gray-500 rounded-sm bg-opacity-[15%]"></div>
				</div>
				<div className="flex-1 flex flex-row gap-x-2 h-8">
					<div className="h-6 w-6 aspect-square bg-gray-500 rounded-full bg-opacity-[15%]"></div>
					<div className="h-6 w-full bg-gray-500 rounded-sm bg-opacity-[15%]"></div>
				</div>
				<div className="flex-1 flex flex-row gap-x-2 h-8">
					<div className="h-6 w-6 aspect-square bg-gray-500 rounded-full bg-opacity-[15%]"></div>
					<div className="h-6 w-full bg-gray-500 rounded-sm bg-opacity-[15%]"></div>
				</div>
				<div className="flex-1 flex flex-row gap-x-2 h-8">
					<div className="h-6 w-6 aspect-square bg-gray-500 rounded-full bg-opacity-[15%]"></div>
					<div className="h-6 w-full bg-gray-500 rounded-sm bg-opacity-[15%]"></div>
				</div>
			</div>
			<div className="px-4 flex flex-col gap-y-4 animate-pulse">
				<div className="h-6 w-full bg-gray-500 bg-opacity-[15%] rounded-md"></div>
			</div>
			<div className="px-4 flex flex-col gap-y-4 animate-pulse">
				<div className="h-32 w-full bg-gray-500 bg-opacity-[15%] rounded-md"></div>
			</div>
			<div className="px-4 flex flex-col gap-y-4 animate-pulse">
				<div className="h-8 w-20 bg-gray-500 rounded-full ml-auto bg-opacity-[15%]"></div>
			</div>
		</div>
	);
};

export default NewPostFormSkeleton;
