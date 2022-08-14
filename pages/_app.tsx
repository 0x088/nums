import "../styles/style.css";
import { AppProps } from "next/app";
import RainbowProvider from "@/providers/Rainbow";

const NUMS = ({ Component, pageProps }: AppProps) => {
  return (
    <RainbowProvider>
      <Component {...pageProps} />
    </RainbowProvider>
  );
};

export default NUMS;
