import React from "react";

type PageContentLayoutProps = {
	children: React.ReactNode[];
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
	return (
		<div className="w-full max-w-6xl px-6 flex flex-row gap-8 my-4">
			{children && (
				<>
					<div className="flex-1">{children[0]}</div>
					<div className="hidden w-full max-w-xs lg:block">{children[1]}</div>
				</>
			)}
		</div>
	);
};

export default PageContentLayout;
