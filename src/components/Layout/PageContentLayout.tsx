import React from "react";

type PageContentLayoutProps = {
	children: React.ReactNode[];
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
	console.log(children);

	return (
		<div className="w-full max-w-6xl px-6 flex flex-row gap-8 my-4">
			{children && (
				<>
					{children[0]}
					{children[1]}
				</>
			)}
		</div>
	);
};

export default PageContentLayout;
