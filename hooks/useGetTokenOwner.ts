import { useContractReads, useAccount } from "wagmi";
import { ABI as NUMS_ABI } from "@/ABI";
import { contractAddress } from "@/constants";
import { useMemo } from "react";

const contract = {
  addressOrName: contractAddress,
  contractInterface: NUMS_ABI,
};

export const useGetTokenOwner = () => {
  const { address } = useAccount();

  const list = new Array(100)
    .fill({
      ...contract,
    })
    .map((el, idx) => ({ ...el, functionName: "ownerOf", args: [idx] }));

  const result = useContractReads({
    contracts: list,
    enabled: Boolean(address),
  });

  const { isOwned, tokenId }: { isOwned: boolean; tokenId?: number } =
    useMemo(() => {
      if (!result.data || !result.data.length) return { isOwned: false };
      for (let i = 0; i < result.data.length; i++) {
        const addr = result.data[i] as unknown as string;
        if (addr === address) return { isOwned: true, tokenId: i };
      }
      return { isOwned: false };
    }, [result.data, address]);

  return useMemo(
    () => ({ ...result, data: { isOwned, tokenId } }),
    [result, isOwned, tokenId]
  );
};
