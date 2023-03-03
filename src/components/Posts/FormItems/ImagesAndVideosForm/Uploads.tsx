import Image from "next/image";
import { ImageAndVideo } from "../../NewPostForm";
import { IoAdd, IoClose } from "react-icons/io5";

type UploadsProps = {
	imagesAndVideos: ImageAndVideo[];
	uploadImagesAndVideos: React.RefObject<HTMLInputElement>;
	handleRemoveImageAndVideo: (index: number) => void;
	maxUploads: number;
	loading: boolean;
};

/**
 *
 *
 * @param {*} {
 * 	imagesAndVideos,
 * 	uploadImagesAndVideos,
 * 	handleRemoveImageAndVideo,
 * 	maxUploads,
 * 	loading,
 * }
 * @return {*}
 */
const Uploads: React.FC<UploadsProps> = ({
	imagesAndVideos,
	uploadImagesAndVideos,
	handleRemoveImageAndVideo,
	maxUploads,
	loading,
}) => {
	return (
		<div className="relative w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 border-[1px] border-solid border-gray-300 rounded-md gap-4 p-4 hover:border-blue-500 focus-within:border-blue-500">
			{imagesAndVideos.map((imageAndVideo) => (
				<div
					key={imageAndVideo.index}
					className="aspect-square h-full w-full flex flex-col items-center justify-center border-solid border-[1px] border-gray-300 rounded-md p-2 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-5 focus-within:border-blue-500 focus-within:bg-blue-500 focus-within:bg-opacity-5"
				>
					<div
						tabIndex={loading ? -1 : 0}
						title={imageAndVideo.name}
						className={`relative z-0 block h-full w-full bg-gray-300 rounded-md overflow-hidden group`}
					>
						<Image
							src={imageAndVideo.url}
							alt={imageAndVideo.name}
							width={240}
							height={240}
							className="w-full -z-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
							loading="lazy"
						/>
						<button
							type="button"
							title="Remove Image/Video"
							className="absolute z-10 bg-white hidden h-[32px] w-[32px] place-items-center rounded-full p-1 group right-1 top-1 group-hover:grid group-focus-within:grid hover:bg-red-500 focus:bg-red-500 hover:text-white focus:text-white shadow-lg"
							onClick={() => handleRemoveImageAndVideo(imageAndVideo.index)}
							disabled={loading}
						>
							<IoClose className="h-full w-full" />
						</button>
					</div>
				</div>
			))}
			<button
				type="button"
				title="Upload Image/Video"
				className="aspect-square h-full w-full grid place-items-center p-2 border-2 rounded-md border-dashed border-gray-300 bg-transparent text-gray-300 hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 hover:border-blue-500 focus:bg-blue-500 focus:bg-opacity-10 mr-auto focus:text-blue-500 focus:border-blue-500 disabled:hidden"
				onClick={() => uploadImagesAndVideos.current?.click()}
				disabled={imagesAndVideos.length >= maxUploads || loading}
			>
				<IoAdd className="h-full w-full aspect-square max-h-[48px]" />
			</button>
		</div>
	);
};

export default Uploads;
