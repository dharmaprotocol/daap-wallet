import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { Abi, contractAddress } from "src/abis/IMerkleWalletClaimer";
import {DharmaWalletClaimer} from "./useClaimDSW";

export const useIsDSWClaimed = () => {
  const { library } = useEthers();

  const checkIsClaimed = async (dharmaWalletClaimer: DharmaWalletClaimer): Promise<boolean> => {
    const contract = new ethers.Contract(
      contractAddress,
      Abi,
      library?.getSigner()
    );
    const entry = dharmaWalletClaimer.walletClaimerData;
    const { index } = entry;
    return await contract.isClaimed(index);
  };

  return {
    send: checkIsClaimed,
  };
};
