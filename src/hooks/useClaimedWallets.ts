import {ChainId, useEthers} from "@usedapp/core";
import { ethers } from "ethers";
import { useState } from "react";
import { Abi, contractAddressByChainId } from "src/abis/IMerkleWalletClaimer";

export const useClaimedWallets = () => {
  const [loading, setLoading] = useState(false);
  const [claimedWallets, setClaimedWallets] = useState<string[]>([]);
  const { account, library, chainId } = useEthers();

  const getClaimedWallets = async () => {
    const contract = new ethers.Contract(
      // @ts-ignore
      contractAddressByChainId[chainId || ChainId.Mainnet],
      Abi,
      library?.getSigner()
    );
    setLoading(true);
    let index = 0;
    let failedToFindWallet = false;
    const wallets = [];

    while (!failedToFindWallet) {
      try {
        // @ts-ignore
        window.showEthereumAlertErrors = false;
        const result = await contract.claimedWalletsByOwner(account, index);
        // @ts-ignore
        window.showEthereumAlertErrors = true;
        wallets.push(result);
        index++;
        await sleep(0.3);
      } catch (e) {
        // @ts-ignore
        window.showEthereumAlertErrors = true;
        failedToFindWallet = true;
      }
    }
    setClaimedWallets(wallets);

    setLoading(false);
    return true;
  };

  return {
    getClaimedWallets,
    claimedWallets,
    loading
  };
};

function sleep(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}
