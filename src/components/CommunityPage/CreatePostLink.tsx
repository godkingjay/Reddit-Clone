import { authModalState } from "@/atoms/authModalAtom";
import { User } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { IoIosLink } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { FormTabItem } from "../Posts/NewPostForm";
import useDirectory from "@/hooks/useDirectory";

type CreatePostLinkProps = {
	communityData?: any;
	user?: User | null;
	loading?: boolean;
	error?: any;
};

/**
 *
 *
 * @param {*} {
 * 	communityData,
 * 	user,
 * }
 * @return {*}
 */
const CreatePostLink: React.FC<CreatePostLinkProps> = ({
	communityData,
	user,
}) => {
	const router = useRouter();
	const setAuthModalState = useSetRecoilState(authModalState);
	const { setDirectoryOpen } = useDirectory();

	/**
	 *
	 *
	 * @param {(React.MouseEvent<HTMLInputElement | HTMLButtonElement>)} e
	 * @param {FormTabItem["title"]} [tabItem]
	 */
	const handleInputClick = (
		e: React.MouseEvent<HTMLInputElement | HTMLButtonElement>,
		tabItem?: FormTabItem["title"]
	) => {
		if (!user) {
			setAuthModalState((prev) => ({
				open: true,
				view: "login",
			}));
		} else {
			if (communityData) {
				router.push(
					{
						pathname: `/r/${communityData.id}/submit`,
						query: { tabItem },
					},
					`/r/${communityData.id}/submit`
				);
			} else {
				setDirectoryOpen((prev) => ({
					...prev,
					open: true,
				}));
			}
		}
	};

	return (
		<section className="bordered-box-1 flex flex-row bg-white h-[56px] max-h-[56px] px-1 rounded-md gap-x-2 items-center w-full">
			<div className="relative z-10 aspect-square py-2 h-full">
				<Image
					src={`/images/redditFace.svg`}
					alt="Profile Picture"
					height={64}
					width={64}
					loading="lazy"
					className="z-20 h-full w-full aspect-square rounded-full object-contain grayscale opacity-40"
				/>
			</div>
			<div className="h-full py-2 flex-1 w-full">
				<input
					type="text"
					title="Create Post"
					placeholder="Create Post"
					className={`min-w-0 text-sm font-light px-4 w-full outline-none border-[1px] border-solid border-gray-200 bg-gray-100 rounded-md
            hover:bg-transparent hover:border-blue-500 focus:bg-transparent focus:border-blue-500 h-full
          `}
					onClick={handleInputClick}
				/>
			</div>
			<div className="py-1 h-full flex flex-row items-center gap-x-1">
				<button
					type="button"
					title="Create Post with Image or Video"
					className="bg-transparent aspect-square h-[36px] p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 group"
					onClick={(e) => handleInputClick(e, "Images & Videos")}
				>
					<IoImageOutline className="h-full w-full text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700" />
				</button>
				<button
					type="button"
					title="Create Post with Link"
					className="bg-transparent aspect-square h-[36px] p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 group "
					onClick={(e) => handleInputClick(e, "Link")}
				>
					<IoIosLink className="h-full w-full text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700" />
				</button>
			</div>
		</section>
	);
};

export default CreatePostLink;
