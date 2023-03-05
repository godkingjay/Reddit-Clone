import { firestore } from "@/firebase/clientApp";
import {
	doc,
	getDoc,
	runTransaction,
	serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { RiEyeCloseFill } from "react-icons/ri";
import { auth } from "@/firebase/clientApp";
import LoadingSpinner from "public/svg/loading-spinner.svg";
import { useRouter } from "next/router";
import useCommunityData from "@/hooks/useCommunityData";
import { UserAuth } from "@/pages/_app";

type CreateProps = {
	user?: UserAuth["user"] | null;
	handleClose: Function;
};

/**
 *
 *
 * @param {*} { handleClose }
 * @return {*}
 */
const Create: React.FC<CreateProps> = ({ handleClose, user }) => {
	const router = useRouter();
	const [createCommunityForm, setCreateCommunityForm] = useState({
		communityName: "",
		privacyType: "public",
	});
	const [communityNameLength, setCommunityNameLength] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { onAddCommunity } = useCommunityData();

	/**
	 *
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} {
	 * 		target: { name, value },
	 * 	}
	 */
	const handleChange = ({
		target: { name, value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setCreateCommunityForm((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === "communityName") {
			const regex = new RegExp(/[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/, "g");
			if (value.match(regex) || (value.length < 3 && value.length > 0)) {
				setError(
					"Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
				);
			} else {
				setError("");
			}
			setCommunityNameLength(value.length);
		}
	};

	/**
	 *
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} {
	 * 		target: { name, title },
	 * 	}
	 */
	const handleSelect = ({
		target: { name, title },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setCreateCommunityForm((prev) => ({
			...prev,
			[name]: title.split("-")[title.split("-").length - 1].toLowerCase(),
		}));
	};

	/**
	 *
	 *
	 * @param {React.FormEvent} e
	 * @return {*}
	 */
	const handleCreateCommunity = async (e: React.FormEvent) => {
		e.preventDefault();

		if (error.length != 0 || communityNameLength < 3) return;

		setLoading(true);

		/**
		 * * Try, throw and catch block for community creation
		 * @try			//* Try to create community else throw error
		 * @catch 	//! Catch error and display it
		 */
		try {
			/**
			 * @create	 //*  a reference to community document
			 */
			const communityDocRef = doc(
				firestore,
				"communities",
				createCommunityForm.communityName
			);

			/**
			 * @transaction for firetore new community creation
			 */
			await runTransaction(firestore, async (transaction) => {
				/**
				 * @check		//? if community already exists
				 * @true 		//! throw error
				 */
				const communityDoc = await getDoc(communityDocRef);
				if (communityDoc.exists()) {
					throw new Error(
						`Sorry, r/${createCommunityForm.communityName} is taken. Try another.`
					);
				}

				/**
				 * @create	//* create new community from reference
				 */
				transaction.set(communityDocRef, {
					creatorId: user?.uid,
					createdAt: serverTimestamp(),
					name: createCommunityForm.communityName,
					members: 1,
					privacyType: createCommunityForm.privacyType,
					imageURL: "",
				});

				/**
				 * @create //* create new community for user
				 */
				const newCommunity = {
					communityId: createCommunityForm.communityName,
					isModerator: true,
					imageURL: "",
				};
				transaction.set(
					doc(
						firestore,
						`users/${user?.uid}/userCommunities`,
						createCommunityForm.communityName
					),
					newCommunity
				);

				onAddCommunity(newCommunity);
				handleClose();
			});
		} catch (error: any) {
			console.log("Error creating community: ", error);
			setError(error.message as string);
		}

		setLoading(false);
		if (error.length === 0) {
			if (router.pathname === createCommunityForm.communityName) {
				router.reload();
			} else {
				router.push(`/r/${createCommunityForm.communityName}`);
			}
		}
	};

	return (
		<>
			<form
				className="full flex flex-col gap-y-4"
				onSubmit={handleCreateCommunity}
			>
				<div className="flex flex-col gap-y-2">
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Name</h2>
						<div className="flex flex-row items-center gap-x-2">
							<p className="text-xs text-gray-500">
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
								value={createCommunityForm.communityName}
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
							{error.length > 1 && <p className="text-red-500">{error}</p>}
						</div>
					</div>
				</div>
				<div>
					<div className="flex flex-col w-full">
						<h2 className="font-semibold text-lg">Community Type</h2>
					</div>
					<div className="create-community-radios">
						<div>
							<input
								type="radio"
								name="privacyType"
								title="Public"
								id="community-type-public"
								defaultChecked={true}
								onChange={handleSelect}
							/>
							<label htmlFor="community-type-public">
								<FaUserAlt className="icon" />
								<p>Public</p>
								<small>
									Anyone can view, post, and comment to this community
								</small>
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="privacyType"
								title="Restricted"
								id="community-type-restricted"
								onChange={handleSelect}
							/>
							<label htmlFor="community-type-restricted">
								<RiEyeCloseFill className="icon" />
								<p>Restricted</p>
								<small>
									Anyone can view this community, but only approved users can
									post
								</small>
							</label>
						</div>
						<div>
							<input
								type="radio"
								name="privacyType"
								title="Private"
								id="community-type-private"
								onChange={handleSelect}
							/>
							<label htmlFor="community-type-private">
								<HiLockClosed className="icon" />
								<p>Private</p>
								<small>
									Only approved users can view and submit to this community
								</small>
							</label>
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center justify-end gap-x-4 max-[320px]:flex-col-reverse max-[320px]:gap-y-2 max-[320px]:[&>button]:w-full">
					<button
						type="button"
						title="Cancel"
						className="auth-button-modal text-sm bg-transparent border-red-500 px-6 text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
						onClick={() => handleClose()}
						disabled={loading}
					>
						Cancel
					</button>
					<button
						type="submit"
						title="Create Community"
						className="auth-button-modal text-sm px-6 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
					>
						Create
						<span className="hidden xs:inline"> Community</span>
					</button>
				</div>
			</form>
			{loading && (
				<div className="modal-loading-box">
					<div className="loading-content">
						<div className="loading-container">
							<LoadingSpinner className="loading" />
						</div>
						<p className="label">Creating Community</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Create;
