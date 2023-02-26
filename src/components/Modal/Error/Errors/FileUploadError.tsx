import { AiOutlineFileExclamation } from "react-icons/ai";

type FileUploadErrorProps = {};

const FileUploadError: React.FC<FileUploadErrorProps> = () => {
	return (
		<div className="flex flex-col items-center text-center justify-center w-full h-full gap-x-4 py-4 px-2 2xs:flex-row 2xs:items-start 2xs:text-left">
			<div className="h-16 w-16">
				<AiOutlineFileExclamation className="h-full w-full text-red-500" />
			</div>
			<div className="flex-1 flex flex-col mt-2 gap-y-2">
				<h2 className="text-lg font-bold text-red-500 w-full pr-4">
					File Upload Error
				</h2>
				<p className="text-xs text-red-500 p-4 border-[1px] border-dashed border-red-500 rounded-lg">
					Please make sure that the file you are trying to upload is valid and
					is not larger than 20MB.
				</p>
			</div>
		</div>
	);
};

export default FileUploadError;
