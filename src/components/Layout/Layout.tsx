import {
	defaultUserAuthenticatedState,
	userAuthenticatedState,
} from "@/atoms/userAtom";
import NavBar from "@/components/NavBar/NavBar";
import { auth } from "@/firebase/clientApp";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [user] = useAuthState(auth);
	const setUserAuthenticated = useSetRecoilState(userAuthenticatedState);

	useEffect(() => {
		if (user) {
			setUserAuthenticated((prev) => ({
				...prev,
				authenticated: true,
			}));
		}
	}, [user, setUserAuthenticated]);

	return (
		<main className="flex flex-col max-h-screen h-screen overflow-hidden">
			<NavBar />
			<div className="bg-gray-200 flex-1 overflow-y-auto scroll-y-style">
				{children}
			</div>
		</main>
	);
};

export default Layout;
