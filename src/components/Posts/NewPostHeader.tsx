type NewPostHeaderProps = {};

const NewPostHeader: React.FC<NewPostHeaderProps> = () => {
	return (
		<div className="bordered-box-1 bg-white px-3 py-3 rounded-md">
			<h1 className="font-semibold text-xl text-gray-800 break-words">
				Create a Post
			</h1>
		</div>
	);
};

export default NewPostHeader;
