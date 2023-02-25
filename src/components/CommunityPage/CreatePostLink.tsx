import Image from "next/image";
import { useRouter } from "next/router";
import { IoIosLink } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";

type CreatePostLinkProps = {
	communityData: any;
};

const CreatePostLink: React.FC<CreatePostLinkProps> = ({ communityData }) => {
	const router = useRouter();
	return (
		<section className="bordered-box-1 flex flex-row bg-white h-[56px] max-h-[56px] px-1 rounded-md gap-x-2 items-center">
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
			<div className="h-full py-2 flex-1">
				<input
					type="text"
					title="Create Post"
					placeholder="Create Post"
					className={`min-w-0 text-sm font-light px-4 w-full outline-none border-[1px] border-solid border-gray-200 bg-gray-100 rounded-md
            hover:bg-transparent hover:border-blue-500 focus:bg-transparent focus:border-blue-500 h-full
          `}
					onClick={() => router.push(`/r/${communityData.id}/submit`)}
				/>
			</div>
			<div className="py-1 h-full flex flex-row items-center gap-x-1">
				<button
					type="button"
					title="Create Media Post"
					className="bg-transparent aspect-square h-[36px] p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 group"
				>
					<IoImageOutline className="h-full w-full text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700" />
				</button>
				<button
					type="button"
					title="Create Media Post"
					className="bg-transparent aspect-square h-[36px] p-2 rounded-md hover:bg-gray-100 focus:bg-gray-100 group "
				>
					<IoIosLink className="h-full w-full text-gray-500 group-hover:text-gray-700 group-focus:text-gray-700" />
				</button>
			</div>
		</section>
	);
};

export default CreatePostLink;
