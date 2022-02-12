import { CONSTANTS } from "src/constants";

const { CHAIN_IDS } = CONSTANTS;

type ChainName = keyof typeof CHAIN_IDS;
export type ChainID = typeof CHAIN_IDS[ChainName];
