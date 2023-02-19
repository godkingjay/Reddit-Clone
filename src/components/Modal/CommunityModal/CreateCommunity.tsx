type CreateCommunityProps = {
	handleClose: Function;
};

const CreateCommunity: React.FC<CreateCommunityProps> = ({ handleClose }) => {
	return (
		<section className="community-modal flex flex-col w-full pb-2 z-50">
			<div>body</div>
			<div>others</div>
			<div className="flex flex-row items-center justify-end gap-x-4">
				<button
					type="button"
					title="Cancel"
					className="auth-button-modal bg-transparent border-red-500 px-6 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
					onClick={() => handleClose()}
				>
					Cancel
				</button>
				<button
					type="button"
					title="Create Community"
					className="auth-button-modal px-6 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
				>
					Create
				</button>
			</div>
		</section>
	);
};

export default CreateCommunity;
