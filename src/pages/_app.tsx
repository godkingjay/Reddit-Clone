import Layout from "@/components/Layout/Layout";
import "@/styles/globals.scss";
import { User } from "firebase/auth";

import { NextPage } from "next";

import type { AppProps } from "next/app";
import Head from "next/head";

import { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";

export type UserAuth = {
	user: User;
	loading: boolean;
	error: any;
};

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
			<Head>
				<title>Home</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/images/redditFace.svg"
				/>
			</Head>
			<>
				<Layout>{getLayout(<Component {...pageProps} />)}</Layout>
			</>
		</RecoilRoot>
	);
}
