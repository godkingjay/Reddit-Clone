import PostSkeleton from "@/components/Skeletons/PostSkeleton";

type PostLoaderProps = {};

const PostLoader: React.FC<PostLoaderProps> = () => {
	return (
		<div className="w-full flex flex-col gap-y-4">
			<PostSkeleton />
			<PostSkeleton />
		</div>
	);
};

export default PostLoader;
