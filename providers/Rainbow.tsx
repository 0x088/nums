import React from "react";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { isDev } from "@/constants";

const { chains, provider } = configureChains(
  [isDev ? chain.goerli : chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Nums",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

interface Props {
  children?: React.ReactNode;
}

const RainbowProvider: React.FC<Props> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider showRecentTransactions={true} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowProvider;
