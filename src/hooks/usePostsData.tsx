import { firestore } from "@/firebase/clientApp";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
} from "firebase/firestore";

const usePostsData = () => {
	const getImagesAndVideos = async (
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
		getImagesAndVideos,
	};
};

export default usePostsData;
