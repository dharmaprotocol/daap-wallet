import { Wallet as EthersWallet } from "@ethersproject/wallet";
import { useContractFunction, useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useState } from "react";
import { Abi, contractAddress } from "src/abis/IMerkleWalletClaimer";

interface MerkleWallet {
  index: number
  wallet: string
  initialSigningKey: string
  merkleProof: Array<string>
}

export interface DharmaWalletClaimer {
  wallet: EthersWallet,
  walletClaimerData: MerkleWallet,
}

export const useClaimDSW = (walletToImport: DharmaWalletClaimer | undefined) => {
  const [loading, setLoading] = useState(false);
  const { account, library } = useEthers();

  const contract = new ethers.Contract(
    contractAddress,
    Abi,
    library?.getSigner()
  );

  const merkleWallet = walletToImport?.walletClaimerData;
  const wallet =  walletToImport?.wallet;

  const { state, send, resetState } = useContractFunction(contract, "claim", {
    transactionName: `Claim smart wallet ${walletToImport?.walletClaimerData.wallet}`
  });

  const claim = async () => {
    if (!account || !wallet || !merkleWallet) {
      return false;
    }
    const {
      index,
      merkleProof,
      initialSigningKey,
      wallet: walletEntry
    } = merkleWallet;
    const claimantSignature = await wallet.signMessage(
      ethers.utils.arrayify(account)
    );

    setLoading(true);
    await send(
      index,
      walletEntry,
      initialSigningKey,
      claimantSignature,
      merkleProof
    );
    setLoading(false);
    return true;
  };

  return {
    send: claim,
    loading,
    state,
    resetState,
  };
};

