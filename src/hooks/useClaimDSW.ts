import { Wallet as EthersWallet } from "@ethersproject/wallet";
import { useContractFunction, useEthers } from "@usedapp/core";
import { Wallet, ethers } from "ethers";
import { useState } from "react";
import { Abi, contractAddress } from "src/abis/IMerkleWalletClaimer";
import merkleWalletClaimerData from "src/constants/merklewalletclaimerdata.json";

export const useClaimDSW = (walletToImport: EthersWallet | undefined) => {
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();

  const contract = new ethers.Contract(
    contractAddress,
    Abi,
    library?.getSigner()
  );

  const { state, send } = useContractFunction(contract, "claim", {
    transactionName: `Claim smart wallet ${walletToImport?.address}`
  });

  const claim = async (connectedWalletAddress: string, wallet: Wallet) => {
    // @ts-ignore
    const entry = merkleWalletClaimerData[wallet.address];
    const {
      index,
      merkleProof,
      initialSigningKey,
      wallet: walletEntry
    } = entry;
    const claimantSignature = await wallet.signMessage(
      ethers.utils.arrayify(connectedWalletAddress)
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
    state
  };
};
