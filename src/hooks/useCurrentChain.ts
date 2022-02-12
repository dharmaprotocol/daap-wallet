import { ChainId, useEthers } from "@usedapp/core";
import { CONSTANTS } from "src/constants";

const { CHAINS } = CONSTANTS;

export const useCurrentChain = () => {
  const { chainId } = useEthers();
  return (
    CHAINS[(chainId ?? ChainId.Mainnet) as ChainId.Mainnet | ChainId.Polygon] ||
    CHAINS[ChainId.Mainnet]
  );
};
