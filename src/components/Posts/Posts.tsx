import { Community } from "@/atoms/communitiesAtom";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type PostProps = {
	communityData: Community;
};

const Posts: React.FC<PostProps> = () => {
	const [user] = useAuthState(auth);
	return <div>Posts</div>;
};

export default Posts;
