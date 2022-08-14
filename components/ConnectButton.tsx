import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";

const ConnectButtonComponent = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button onClick={openConnectModal}>Connect Wallet</Button>
                );
              }
              if (chain.unsupported) {
                return <Button onClick={openChainModal}>Wrong network</Button>;
              }
              return (
                <Button onClick={openAccountModal}>
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectButtonComponent;
