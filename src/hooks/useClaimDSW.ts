import { Wallet as EthersWallet } from "@ethersproject/wallet";
import { useContractFunction, useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useState, useMemo } from "react";
import { Abi, contractAddress } from "src/abis/IMerkleWalletClaimer";
import merkleWalletClaimerData from "src/constants/merklewalletclaimerdata.json";

interface MerkleWallet {
  index: number
  wallet: string
  initialSigningKey: string
  merkleProof: Array<string>
}

export const useClaimDSW = (walletToImport: EthersWallet | undefined) => {
  const [loading, setLoading] = useState(false);
  const { account, library } = useEthers();

  const contract = new ethers.Contract(
    contractAddress,
    Abi,
    library?.getSigner()
  );

  const merkleWallet: null | MerkleWallet = useMemo(() => {
    if (!walletToImport?.address) {
      return null;
    }
    // @ts-ignore
    const merkleWallet: MerkleWallet = merkleWalletClaimerData[walletToImport.address];
    return merkleWallet;
  }, [walletToImport?.address]);

  const { state, send } = useContractFunction(contract, "claim", {
    transactionName: `Claim smart wallet ${walletToImport?.address}`
  });

  const claim = async () => {
    if (!account || !walletToImport || !merkleWallet) {
      return false;
    }
    // @ts-ignore
    const {
      index,
      merkleProof,
      initialSigningKey,
      wallet: walletEntry
    } = merkleWallet;
    const claimantSignature = await walletToImport.signMessage(
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
    state
  };
};
