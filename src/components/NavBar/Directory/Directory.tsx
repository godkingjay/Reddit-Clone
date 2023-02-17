import { useState } from "react";

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps> = () => {
	const [directory, setDirectory] = useState("home");

	return (
		<section className="h-full flex items-center">
			<details className="relative h-full">
				<summary className="list-none h-full flex items-center px-4 border-[1px] border-solid border-gray-300 rounded-md">
					{directory.slice(0, 1).toUpperCase() +
						directory.slice(1, directory.length)}
				</summary>
				<div className="absolute w-max bg-white px-4">
					<details open>
						<summary>My Communities</summary>
						<p>sample</p>
					</details>
					<details open>
						<summary>Feeds</summary>
						<p>sample</p>
					</details>
				</div>
			</details>
		</section>
	);
};

export default Directory;
