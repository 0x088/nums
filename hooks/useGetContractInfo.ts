import { useContractReads, useAccount } from "wagmi";
import { ABI as NUMS_ABI } from "@/ABI";
import { contractAddress } from "@/constants";
import { useMemo } from "react";

const contract = {
  addressOrName: contractAddress,
  contractInterface: NUMS_ABI,
};

export const useGetContractInfo = () => {
  const { address } = useAccount();

  const result = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "availableNums",
      },
      {
        ...contract,
        functionName: "balanceOf",
        args: [address ?? "0x0000000000000000000000000000000000000001"],
      },
    ],
  });

  return useMemo(() => result, [result]);
};
