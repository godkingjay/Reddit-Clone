import { ImagesAndVideos, Post, postState } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

const usePosts = () => {
	const [postStateValue, setPostsStateValue] = useRecoilState(postState);

	const onVote = async () => {};

	const onSelectPost = () => {};

	const onDeletePost = async (post: Post): Promise<boolean> => {
		try {
			if (post.imagesAndVideos) {
				post.imagesAndVideos.forEach(async (imageOrVideo, index) => {
					const imageAndVideoRef = ref(storage, imageOrVideo.path);
					await deleteObject(imageAndVideoRef);
				});
			}

			const postDocRef = doc(firestore, `posts`, post.id);

			await deleteDoc(postDocRef);

			const imagesAndVideosQuery = query(
				collection(firestore, "posts", post.id, "imagesAndVideos")
			);

			const imagesAndVideosDocs = await getDocs(imagesAndVideosQuery);

			const batch = writeBatch(firestore);

			imagesAndVideosDocs.forEach((doc) => {
				batch.delete(doc.ref);
			});

			await batch.commit();

			setPostsStateValue((prev) => ({
				...prev,
				posts: prev.posts.filter((item) => item.id !== post.id),
			}));

			return true;
		} catch (error) {
			console.log();
			return false;
		}
	};

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
