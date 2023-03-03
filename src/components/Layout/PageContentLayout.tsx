import React from "react";

type PageContentLayoutProps = {
	children: React.ReactNode[];
};

/**
 *
 *
 * @param {} { children }
 * @return {*}
 */
const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
	return (
		<div className="w-full max-w-6xl px-6 justify-center gap-8 my-4 grid grid-cols-2 grid-flow-col">
			{children && (
				<>
					<div className="w-full col-span-2">{children[0]}</div>
					<div className="hidden h-max min-w-[320px] max-w-xs lg:block">
						{children[1]}
					</div>
				</>
			)}
		</div>
	);
};

export default PageContentLayout;
