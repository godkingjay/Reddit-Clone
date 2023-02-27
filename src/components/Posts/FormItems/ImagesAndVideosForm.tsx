import React, { useRef } from "react";
import Empty from "./ImagesAndVideosForm/Empty";
import { ImageAndVideo } from "../NewPostForm";
import Uploads from "./ImagesAndVideosForm/Uploads";
// import Uploads from "./ImagesAndVideosForm/Uploads";

type ImagesAndVideosFormProps = {
	imagesAndVideos: ImageAndVideo[];
	handleUploadImagesAndVideos: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveImageAndVideo: (index: number) => void;
	maxUploads: number;
};

const ImagesAndVideosForm: React.FC<ImagesAndVideosFormProps> = ({
	imagesAndVideos,
	handleUploadImagesAndVideos,
	handleRemoveImageAndVideo,
	maxUploads,
}) => {
	const uploadImagesAndVideos = useRef<HTMLInputElement>(null);

	return (
		<>
			{imagesAndVideos.length === 0 ? (
				<Empty uploadImagesAndVideos={uploadImagesAndVideos} />
			) : (
				<Uploads
					imagesAndVideos={imagesAndVideos}
					uploadImagesAndVideos={uploadImagesAndVideos}
					handleRemoveImageAndVideo={handleRemoveImageAndVideo}
					maxUploads={maxUploads}
				/>
			)}
			<input
				type="file"
				accept="image/png, image/jpeg"
				title="Upload File"
				ref={uploadImagesAndVideos}
				onChange={handleUploadImagesAndVideos}
				hidden
				multiple
				disabled={imagesAndVideos.length >= maxUploads}
			/>
		</>
	);
};

export default ImagesAndVideosForm;