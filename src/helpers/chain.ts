import { CONSTANTS } from "src/constants";
import { ChainID } from "src/types/chain";

export const isSupportedChainId = (
  possibleChainId: ChainID | number | null
): possibleChainId is ChainID => {
  return CONSTANTS.SUPPORTED_CHAIN_IDS.includes(possibleChainId as ChainID);
};
