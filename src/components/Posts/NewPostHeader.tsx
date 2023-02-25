type NewPostHeaderProps = {};

const NewPostHeader: React.FC<NewPostHeaderProps> = () => {
	return (
		<div className="bordered-box-1 bg-white px-2 py-2 rounded-md">
			<h1 className="font-semibold text-lg text-gray-800">Create a Post</h1>
		</div>
	);
};

export default NewPostHeader;
