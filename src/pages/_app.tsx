import Layout from "@/components/Layout/Layout";
import "@/styles/globals.scss";

import { NextPage } from "next";

import type { AppProps } from "next/app";

import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";


export type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageLayout;
};


/**
 *
 *
 * @export
 * @param {AppPropsWithLayout} { Component, pageProps }
 * @return {*} 
 */
export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<RecoilRoot>
			<>
				<Layout>{getLayout(<Component {...pageProps} />)}</Layout>
			</>
		</RecoilRoot>
	);
}
