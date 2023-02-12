import NavBar from "@/components/NavBar/NavBar";

import React, { ReactElement } from "react";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
