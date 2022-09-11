import React from "react";
import { info } from "@/constants";

type Props = { id: number; className?: string };

const Num: React.FC<Props> = ({ id, className }) => {
  return (
    <a
      href={`${info.looksRarePrefix}/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "num m-2.5 flex h-[100px] w-[100px] items-center justify-center rounded-[10px] bg-white text-[70px] text-black hover:shadow-default md:h-[200px] md:w-[200px] md:text-[140px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {id}
    </a>
  );
};

export default Num;
