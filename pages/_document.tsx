import Document, { Html, Head, Main, NextScript } from "next/document";
import { info } from "@/constants";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href={`./favicon.png`} />
          <meta name="robots" content="follow, index" />
          <meta content={info.description} name="description" />
          <link rel="canonical" href={info.link} />
          <meta name="title" content={info.title} />
          <meta name="description" content={info.description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={info.link} />
          <meta property="og:title" content={info.title} />
          <meta property="og:description" content={info.description} />
          <meta property="og:image" content={`${info.link}/meta.png`} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={info.link} />
          <meta name="twitter:site" content="@0x088" />
          <meta property="twitter:title" content={info.title} />
          <meta property="twitter:description" content={info.description} />
          <meta property="twitter:image" content={`${info.link}/meta.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
