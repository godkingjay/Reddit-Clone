type PostSkeletonProps = {};

const PostSkeleton: React.FC<PostSkeletonProps> = () => {
	return (
		<div className="w-full h-max bg-white rounded-md bordered-box-1">
			<div className="w-full h-full flex flex-col gap-y-4 p-4 animate-pulse">
				<div className="flex flex-col gap-y-2 w-full">
					<div className="w-[50%] h-4 bg-gray-500 bg-opacity-10"></div>
					<div className="w-[25%] h-4 bg-gray-500 bg-opacity-10"></div>
				</div>
				<div className="flex flex-col w-full gap-y-2">
					<div className="w-full h-4 bg-gray-500 bg-opacity-10"></div>
					<div className="w-full h-4 bg-gray-500 bg-opacity-10"></div>
					<div className="w-[50%] h-4 bg-gray-500 bg-opacity-10"></div>
				</div>
				<div className="flex flex-col w-full gap-y-2">
					<div className="w-full h-16 bg-gray-500 bg-opacity-10"></div>
				</div>
			</div>
		</div>
	);
};

export default PostSkeleton;
