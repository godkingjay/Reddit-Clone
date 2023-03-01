import { ImagesAndVideos, postState } from "@/atoms/postAtom";
import { firestore } from "@/firebase/clientApp";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	getDocs,
} from "firebase/firestore";
import { useRecoilState } from "recoil";

const usePosts = () => {
	const [postStateValue, setPostsStateValue] = useRecoilState(postState);

	const onVote = async () => {};

	const onSelectPost = () => {};

	const onDeletePost = async () => {};

	const getPostImagesAndVideos = async (
		doc: QueryDocumentSnapshot<DocumentData>
	) => {
		try {
			const postImagesAndVideosDocs = await getDocs(
				collection(firestore, `posts/${doc.id}/imagesAndVideos`)
			);
			const postImagesAndVideos = await postImagesAndVideosDocs.docs.map(
				(doc) => ({
					...doc.data(),
				})
			);
			return postImagesAndVideos as ImagesAndVideos[];
		} catch (error: any) {
			console.log("Getting Images and Videos Error:", error.message);
			return [];
		}
	};

	return {
		getPostImagesAndVideos,
		postStateValue,
		setPostsStateValue,
		onDeletePost,
		onSelectPost,
		onVote,
	};
};

export default usePosts;
