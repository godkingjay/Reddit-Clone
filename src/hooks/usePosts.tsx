import { firestore } from "@/firebase/clientApp";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
} from "firebase/firestore";

const usePosts = () => {
	const getPostImagesAndVideos = async (
		doc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const postImagesAndVideosDocs = await getDocs(
				collection(firestore, `posts/${doc.id}/imagesAndVideos`)
			);
			const postImagesAndVideos = postImagesAndVideosDocs.docs.map((doc) => ({
				...doc.data(),
			}));
			return postImagesAndVideos as [];
		} catch (error: any) {
			console.log("Getting Images and Videos Error:", error.message);
			return [];
		}
	};

	return {
		getPostImagesAndVideos,
	};
};

export default usePosts;
