import { useEthers } from "@usedapp/core";
import {CHAIN_IDS, CONSTANTS} from "src/constants";

const { CHAINS } = CONSTANTS;

export const useCurrentChain = () => {
  const { chainId } = useEthers();
  return (
    // @ts-ignore
    CHAINS[(chainId ?? CHAIN_IDS.Mainnet) as CHAIN_IDS.Mainnet | CHAIN_IDS.Polygon] ||
    CHAINS[CHAIN_IDS.Mainnet]
  );
};
