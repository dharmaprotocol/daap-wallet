import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { Abi, contractAddress } from "src/abis/IMerkleWalletClaimer";
import merkleWalletClaimerData from "src/constants/merklewalletclaimerdata.json";

export const useIsDSWClaimed = () => {
  const { library } = useEthers();

  const checkIsClaimed = async (address: string): Promise<boolean> => {
    const contract = new ethers.Contract(
      contractAddress,
      Abi,
      library?.getSigner()
    );
    // @ts-ignore
    const entry = merkleWalletClaimerData[address];
    const { index } = entry;
    return await contract.isClaimed(index);
  };

  return {
    send: (address: string) => checkIsClaimed(address)
  };
};
