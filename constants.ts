export const isDev = process.env.NODE_ENV === "development";
export const contractAddress = isDev
  ? "0x36d0874cfc6139403812a54c83e285ea86151596"
  : "0x4b620874f15e8d17b3f7164532a86e9bf9418f78";

export const info = {
  title: "NUMS",
  description: "Unique 100 (0...99) numbers stored on chain",
  link: "https://uniquenums.com",
  openSeaPrefix: `https://opensea.io/assets/ethereum/${contractAddress}`,
  openSeaCollection: "https://opensea.io/collection/unique-nums",
  contract: `https://etherscan.io/address/${contractAddress}#contracts`,
  twitter: "https://twitter.com/0x088",
  github: "https://github.com/0x088/nums",
};
