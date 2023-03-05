import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import ErrorModal from "@/components/Modal/Error/ErrorModal";
import useAuth from "@/hooks/useAuth";

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
	const { user, loading, error } = useAuth();

	return (
		<main className="flex flex-col max-h-screen h-screen overflow-hidden z-20">
			<NavBar
				user={user}
				loading={loading}
				error={error}
			/>
			<div className="bg-gray-200 flex-1 overflow-y-auto scroll-y-style z-10">
				{children}
			</div>
			<ErrorModal />
		</main>
	);
};

export default Layout;
