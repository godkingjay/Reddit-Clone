import { IoClose } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";

type ErrorBannerProps = {
	title: string;
	message: string;
	setError: (message: string) => void;
};

const ErrorBanner: React.FC<ErrorBannerProps> = ({
	title,
	message,
	setError,
}) => {
	return (
		<div className="w-full">
			<div className="flex flex-row bg-red-300 gap-x-2 p-2">
				<div className="flex-1 flex flex-row py-2 gap-x-2">
					<div className="h-8 w-8 aspect-square my-1">
						<MdOutlineError className="h-full w-full text-red-500" />
					</div>
					<h2 className="w-28 font-bold text-sm">{title}</h2>
					<div className="flex-1 overflow-x-hidden">
						<p className="break-words w-full text-sm">{message}</p>
					</div>
				</div>
				<button
					type="button"
					title="Close"
					className="h-6 w-6 aspect-square mb-auto group"
					onClick={() => setError("")}
				>
					<IoClose className="h-full w-full text-black group-hover:text-red-500 group-hover:scale-125 group-focus:text-red-500 group-focus:scale-125" />
				</button>
			</div>
		</div>
	);
};

export default ErrorBanner;