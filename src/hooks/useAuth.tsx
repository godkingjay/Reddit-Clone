import { auth } from "@/firebase/clientApp";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuth = () => {
	const [user, loading, error] = useAuthState(auth);

	const userMemo = useMemo(() => {
		return user;
	}, [user]);

	return {
		user: userMemo,
		loading,
		error,
	};
};

export default useAuth;
