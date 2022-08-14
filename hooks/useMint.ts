import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import { ABI as NUMS_ABI } from "@/ABI";
import { contractAddress } from "@/constants";
import { useMemo } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

type Props = {
  handleSuccess: () => void;
};

export const useMint = ({ handleSuccess }: Props) => {
  const { address } = useAccount();
  const addRecentTransaction = useAddRecentTransaction();

  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: NUMS_ABI,
    functionName: "mint",
    enabled: Boolean(address),
    overrides: {
      gasLimit: 1300000,
    },
  });

  const {
    data: tx,
    write: mint,
    isLoading: isMintLoading,
    isError: isMintError,
    isSuccess: isMintSuccess,
  } = useContractWrite({
    ...config,
    enabled: Boolean(address),
    onSuccess(data) {
      addRecentTransaction({
        hash: data.hash,
        description: "Mint",
      });
    },
  });

  const {
    isLoading: isWaitLoading,
    error: isWaitError,
    isSuccess: isWaitSuccess,
  } = useWaitForTransaction({
    hash: tx?.hash,
    onSuccess() {
      handleSuccess();
    },
  });

  const isLoading = useMemo(
    () => isWaitLoading || isMintLoading,
    [isMintLoading, isWaitLoading]
  );
  const isError = useMemo(
    () => isWaitError || isMintError,
    [isWaitError, isMintError]
  );
  const isSuccess = useMemo(
    () => isWaitSuccess && isMintSuccess,
    [isWaitSuccess, isMintSuccess]
  );

  return useMemo(
    () => ({ mint, isLoading, isError, isSuccess }),
    [mint, isLoading, isError, isSuccess]
  );
};
