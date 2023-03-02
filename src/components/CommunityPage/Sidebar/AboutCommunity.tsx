import { Community } from "@/atoms/communitiesAtom";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { RiCake2Line } from "react-icons/ri";

type AboutCommunityProps = {
	communityData: Community;
};

const AboutCommunity: React.FC<AboutCommunityProps> = ({ communityData }) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<div className="bordered-box-1 bg-white rounded-md">
			<div className="flex flex-col w-full">
				<div className="bg-blue-500 rounded-t-md p-2 flex flex-row items-center h-full justify-between relative">
					<p className="text-sm font-bold text-white py-2">About Community</p>
					<div className="h-8">
						<details className="h-full [&[open]>summary]:bg-black [&[open]>summary]:bg-opacity-10">
							<summary className="list-none h-8 w-8 aspect-square cursor-pointer text-white rounded-full p-1 hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-10">
								<BsThreeDots className="h-full w-full" />
							</summary>
							<div className="absolute w-[192px] right-0 bg-white shadow-[0_0_16px_#0002] rounded-md">
								<p>Hello</p>
							</div>
						</details>
					</div>
				</div>
				<div className="grid grid-cols-2 px-2 gap-y-2 py-4">
					<div className="flex flex-col px-2">
						<p className="text-sm font-bold text-brand-100">
							{communityData.members.toLocaleString()}
						</p>
						<p className="text-xs text-gray-500">Members</p>
					</div>
					<div className="flex flex-col px-2">
						<p className="text-sm font-bold text-green-400">
							{communityData.members.toLocaleString()}
						</p>
						<p className="text-xs text-gray-500">Online</p>
					</div>
				</div>
				<div className="h-[1px] bg-gray-500 bg-opacity-20 mx-2"></div>
				{communityData.createdAt && (
					<>
						<div className="flex flex-row gap-x-2 items-center py-4 px-2">
							<div className="w-6 h-6 aspect-square">
								<RiCake2Line className="h-full w-full" />
							</div>
							<p className="text-sm text-gray-500">
								Created at{" "}
								{moment(
									new Date(communityData.createdAt.seconds * 1000)
								).format("MMM DD, YYYY")}
							</p>
						</div>
						<div className="h-[1px] bg-gray-500 bg-opacity-20 mx-2"></div>
					</>
				)}
				{!(pathname.split("/").pop() as string).match(/submit/g) && (
					<div className="px-2 py-4 flex flex-col items-center">
						<Link
							href={`/r/${communityData.id}/submit`}
							className="page-button max-w-none w-full flex flex-row justify-center items-center hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600"
						>
							Create A Post
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default AboutCommunity;
