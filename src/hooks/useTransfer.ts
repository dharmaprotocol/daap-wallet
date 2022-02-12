import { useContractFunction, useEthers } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useState } from "react";
import { Abi } from "src/abis/Wallet";
import {
  ERC721,
  ERC1155,
  Token,
  tokenBaseAddress
} from "src/hooks/useImportTokens";

export const useTransfer = (
  smartWalletAddress: string,
  amount: string,
  destinationAddress: string,
  token: Token | null
) => {
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();

  const contract = new ethers.Contract(
    smartWalletAddress,
    Abi,
    library?.getSigner()
  );

  const { send } = useContractFunction(contract, "execute", {
    transactionName: `Transfer ${amount} ${
      token ? token.symbol : "- No Symbol Available -"
    } to ${destinationAddress}`
  });

  const transfer = async () => {
    if (!token) {
      return false;
    }
    const iface = new ethers.utils.Interface([
      "function transfer(address to, uint256 amount)"
    ]);

    const tenPowTokenDecimals = new BigNumber(10).pow(token.decimals);

    const executeArgs =
      token.address === tokenBaseAddress
        ? [
            {
              to: destinationAddress,
              value: ethers.utils.parseEther(amount).toString(),
              data: "0x"
            }
          ]
        : [
            {
              to: token.address,
              value: "0",
              data: iface.encodeFunctionData("transfer", [
                destinationAddress,
                token.decimals
                  ? new BigNumber(amount.replaceAll(",", ""))
                      .times(tenPowTokenDecimals)
                      .toFormat({
                        prefix: "",
                        decimalSeparator: ".",
                        groupSeparator: ""
                      })
                  : amount
              ])
            }
          ];

    setLoading(true);
    await send(executeArgs);
    setLoading(false);
    return true;
  };

  return {
    transfer,
    loading
  };
};

export const useERC1155Transfer = (
  smartWalletAddress: string,
  address: string,
  erc1155: ERC1155 | null,
  amount: string
) => {
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();

  const contract = new ethers.Contract(
    smartWalletAddress,
    Abi,
    library?.getSigner()
  );

  const { send } = useContractFunction(contract, "execute", {
    transactionName: `Transfer ERC1155 ${erc1155?.contract}-${erc1155?.id} to ${address}`
  });

  const transfer = async () => {
    const iface = new ethers.utils.Interface([
      "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)"
    ]);
    const executeArgs = [
      {
        to: erc1155?.contract,
        value: "0",
        data: iface.encodeFunctionData("safeTransferFrom", [
          smartWalletAddress,
          address,
          erc1155?.id,
          amount,
          ""
        ])
      }
    ];
    setLoading(true);
    await send(executeArgs);
    setLoading(false);
    return true;
  };

  return {
    transfer,
    loading
  };
};

export const useERC721Transfer = (
  smartWalletAddress: string,
  address: string,
  erc721: ERC721 | null
) => {
  const [loading, setLoading] = useState(false);
  const { library } = useEthers();

  const contract = new ethers.Contract(
    smartWalletAddress,
    Abi,
    library?.getSigner()
  );

  const { send } = useContractFunction(contract, "execute", {
    transactionName: `Transfer ERC721 ${erc721?.contract}-${erc721?.id} to ${address}`
  });

  const transfer = async () => {
    const iface = new ethers.utils.Interface([
      "function transferFrom(address from, address to, uint256 tokenId)"
    ]);
    const executeArgs = [
      {
        to: erc721?.contract,
        value: "0",
        data: iface.encodeFunctionData("transferFrom", [
          smartWalletAddress,
          address,
          erc721?.id
        ])
      }
    ];
    setLoading(true);
    await send(executeArgs);
    setLoading(false);
    return true;
  };

  return {
    transfer,
    loading
  };
};
