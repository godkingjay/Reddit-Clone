import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingSpinner from "public/svg/loading-spinner.svg";

type PostProps = {
	communityData: Community;
};

const Posts: React.FC<PostProps> = ({ communityData }) => {
	const [user] = useAuthState(auth);
	const [loadingPosts, setLoadingPosts] = useState(true);
	const [postsLoadError, setPostsLoadError] = useState("");
	const { getPostImagesAndVideos } = usePosts();

	const getPosts = async () => {
		setLoadingPosts(true);
		try {
			const postQuery = query(
				collection(firestore, "posts"),
				where(`communityId`, `==`, communityData.id),
				orderBy(`createdAt`, `desc`)
			);

			const postDocs = await getDocs(postQuery);

			const posts = postDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				imagesAndVideos: getPostImagesAndVideos(doc),
			}));
		} catch (error: any) {
			console.log(error.message);
		}
		setLoadingPosts(false);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="w-full flex flex-col">
			{loadingPosts ? (
				<div className="w-full py-4">
					<div className="w-full flex flex-col items-center gap-y-4">
						<div className="aspect-square w-12 h-12">
							<LoadingSpinner className="loading-spinner-posts animate-spin" />
						</div>
						<h2 className="font-bold text-gray-700">Loading Posts</h2>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Posts;
