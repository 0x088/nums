import "../styles/style.css";
import { AppProps } from "next/app";
import RainbowProvider from "@/providers/Rainbow";
import Head from "next/head";
import { info } from "@/constants";

const NUMS = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>NUMS - {info.description}</title>
      </Head>
      <RainbowProvider>
        <Component {...pageProps} />
      </RainbowProvider>
    </>
  );
};

export default NUMS;
