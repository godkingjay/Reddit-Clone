import React, { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

type CreateProps = {
	handleClose: Function;
};

const Create: React.FC<CreateProps> = ({ handleClose }) => {
	const [createCommunityForm, setCreateCommunityForm] = useState({
		communityName: "",
	});
	const [communityNameLength, setCommunityNameLength] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Create Community");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCreateCommunityForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

		if (e.target.name === "communityName") {
			setCommunityNameLength(e.target.value.length);
		}
	};

	return (
		<form
			className="full flex flex-col gap-y-8"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-y-2">
				<div className="flex flex-col w-full">
					<h2 className="font-semibold text-lg">Name</h2>
					<div className="flex flex-row items-center gap-x-2">
						<p className="text-xs text-gray-500 truncate">
							Community names including capitalization cannot be changed.
						</p>
						<div className="create-community-alert relative h-max w-max">
							<IoAlertCircleOutline className="icon aspect-square w-[16px] h-[16px] scale-125 text-gray-500" />
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col gap-y-2">
					<div className="flex flex-row items-center border-[1px] border-gray-300 border-solid px-2 py-2 rounded-md text-base mt-2 focus-within:border-blue-500">
						<p className="text-gray-500">r/</p>
						<input
							required
							type="text"
							title="Community Name"
							className="flex-1 min-w-0 outline-none bg-transparent"
							name="communityName"
							onChange={handleChange}
							maxLength={21}
						/>
					</div>
					<div className="text-xs">
						<p
							className={
								communityNameLength === 21 ? "text-red-500" : "text-gray-500"
							}
						>
							{21 - communityNameLength} Characters remaining
						</p>
						{createCommunityForm.communityName.length === 0 && (
							<p className="text-red-500">A community name is required</p>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center justify-end gap-x-4">
				<button
					type="button"
					title="Cancel"
					className="auth-button-modal text-sm bg-transparent border-red-500 px-6 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
					onClick={() => handleClose()}
				>
					Cancel
				</button>
				<button
					type="submit"
					title="Create Community"
					className="auth-button-modal text-sm px-6 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
				>
					Create
				</button>
			</div>
		</form>
	);
};

export default Create;
