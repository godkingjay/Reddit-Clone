import NavBar from "@/components/NavBar/NavBar";
import { auth } from "@/firebase/clientApp";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import ErrorModal from "@/components/Modal/Error/ErrorModal";

type LayoutProps = {
	children: React.ReactNode;
};

/**
 *
 *
 * @param {React.ReactNode} { children }
 * @return {*}
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [user] = useAuthState(auth);

	return (
		<main className="flex flex-col max-h-screen h-screen overflow-hidden z-20">
			<NavBar />
			<div className="bg-gray-200 flex-1 overflow-y-auto scroll-y-style z-10">
				{children}
			</div>
			<ErrorModal />
		</main>
	);
};

export default Layout;
