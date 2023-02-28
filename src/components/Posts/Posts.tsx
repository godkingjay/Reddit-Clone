import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePostsData from "@/hooks/usePostsData";
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

type PostProps = {
	communityData: Community;
};

const Posts: React.FC<PostProps> = ({ communityData }) => {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(false);
	const [postsLoadError, setPostsLoadError] = useState("");
	const { getPostImagesAndVideos } = usePostsData();

	const getPosts = async () => {
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
	};

	useEffect(() => {
		getPosts();
	}, []);

	return <div>Posts</div>;
};

export default Posts;
