type HeaderCardProps = {};

const HeaderCardSkeleton: React.FC<HeaderCardProps> = () => {
	return (
		<div className="bordered-box-1 bg-white px-3 py-3 rounded-md">
			<div className="h-6 w-[30%] bg-gray-500 bg-opacity-10 animate-pulse rounded-sm"></div>
		</div>
	);
};

export default HeaderCardSkeleton;
