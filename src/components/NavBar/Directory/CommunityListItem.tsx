import { UserCommunity } from "@/atoms/communitiesAtom";
import React from "react";
import { FeedsItem } from "./Directory";
import Image from "next/image";
import { BsReddit } from "react-icons/bs";

type CommunityListProps = {
	community: UserCommunity;
	handlePathChange: (
		dir?: FeedsItem | null,
		community?: UserCommunity | null
	) => void;
};

const CommunityListItem: React.FC<CommunityListProps> = ({
	community,
	handlePathChange,
}) => {
	return (
		<li>
			<button
				type="button"
				title="Create Community"
				className="item flex flex-row items-center"
				onClick={() => handlePathChange(null, community)}
			>
				<div className="h-8 w-8 aspect-square bg-gray-100 rounded-full overflow-hidden">
					{community.imageURL ? (
						<Image
							src={community.imageURL}
							alt={community.communityId}
							height={256}
							width={256}
							className="h-full w-full object-contain"
						/>
					) : (
						<BsReddit className="h-full w-full text-gray-300" />
					)}
				</div>
				<p className="label">r/{community.communityId}</p>
			</button>
		</li>
	);
};

export default CommunityListItem;
