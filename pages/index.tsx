import React from "react";
import dynamic from "next/dynamic";
import Num from "@/components/Num";

const MintWithNoSSR = dynamic(() => import("@/components/Mint"), {
  ssr: false,
});

import { info } from "@/constants";

const nums = [0, 1, 23, 56, 88];

const Main: React.FC = () => {
  const links: { title: string; url: string }[] = [
    { title: "OpenSea", url: info.openSeaCollection },
    {
      title: "Twitter",
      url: info.twitter,
    },
    {
      title: "Contract",
      url: info.contract,
    },
  ];

  return (
    <div className="mt-10 flex flex-col flex-wrap items-center justify-center px-2 md:mt-28">
      <h1 className="text-[100px] leading-[100px]">{info.title}</h1>
      <p className="text-center text-2xl">{info.description}</p>
      <ul className="m-0 flex gap-5 p-0 text-[20px]">
        {links.map(({ title, url }) => (
          <li key={title}>
            <a
              href={url}
              className="underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap justify-center">
        {nums.map((el) => (
          <Num key={el} id={el} />
        ))}
      </div>
      <MintWithNoSSR />
    </div>
  );
};

export default Main;
