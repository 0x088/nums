import React, { useMemo } from "react";

import { useAccount } from "wagmi";
import Button from "./Button";
import ConnectButton from "./ConnectButton";
import { useGetContractInfo, useGetTokenOwner, useMint } from "@/hooks";
import Num from "./Num";
import { isDev } from "@/constants";

function Mint() {
  const { isConnected } = useAccount();
  const {
    data: [availableNums, balanceOf] = [],
    isLoading: isLoadingContractInfo,
    refetch: refetchInfo,
  } = useGetContractInfo();

  const {
    data: { isOwned, tokenId },
    refetch: refetchOwned,
  } = useGetTokenOwner();

  const { mint, isLoading: isLoadingMint } = useMint({
    handleSuccess: () => {
      refetchOwned();
      refetchInfo();
    },
  });

  const available = useMemo(() => {
    if (!availableNums) return;
    return `(Available ${availableNums.length})`;
  }, [availableNums]);

  const balance = useMemo(() => {
    if (!balanceOf) return 0;
    return balanceOf.toNumber();
  }, [balanceOf]);

  const isLoading = useMemo(
    () => isLoadingContractInfo || isLoadingMint,
    [isLoadingContractInfo, isLoadingMint]
  );

  const isDisabled = useMemo(
    () =>
      !isConnected || isLoading || !availableNums?.length || balance || !mint,
    [isConnected, isLoading, availableNums, balance, mint]
  );

  return (
    <section id="mint">
      <h2 className="mt-10 mb-5 text-center text-3xl">Mint</h2>
      {isDev ? (
        <div className="mb-2 rounded-[10px] bg-yellow-200 py-2 px-5 text-primary">
          ⚠️ Testnet
        </div>
      ) : null}
      {balance ? (
        <div className="mb-2 rounded-[10px] bg-yellow-200 py-2 px-5 text-primary">
          ⚠️ One NUM per address
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button
          disabled={isDisabled}
          loading={isLoading}
          onClick={() => mint?.()}
        >
          Mint {available}
        </Button>
        <ConnectButton />
      </div>
      {isOwned && tokenId !== undefined ? (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-center text-xl">You owned Num #{tokenId}</p>
          <Num id={tokenId} />
        </div>
      ) : null}
    </section>
  );
}

export default Mint;
