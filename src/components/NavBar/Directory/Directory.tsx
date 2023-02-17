import { useState } from "react";

type DirectoryProps = {};

const Directory: React.FC<DirectoryProps> = () => {
	const [directory, setDirectory] = useState("home");

	return (
		<section className="h-full flex items-center">
			<details className="relative">
				<summary className="list-none">
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
