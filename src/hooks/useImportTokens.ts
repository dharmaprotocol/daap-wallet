import { useLocalStorage } from '@rehooks/local-storage'
import {
  useEtherBalance,
  useEthers,
  useToken,
  useTokenBalance,
} from '@usedapp/core'
import { useState } from 'react'
import {CHAIN_IDS} from "../constants";

type address = string
type addresses = address[]

export const tokenBaseAddress = '0xbasetoken'

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: string
  balance: string
}

export const useBaseTokenInfo = (walletAddress: string) => {
  const { chainId } = useEthers()
  const token =
    chainId === CHAIN_IDS.ETHEREUM
      ? {
          symbol: 'ETH',
          name: 'Ether',
          decimals: '18',
        }
      : {
          symbol: 'MATIC',
          name: 'MATIC',
          decimals: '18',
        }
  const balance = useEtherBalance(walletAddress)
  const returnToken: Token = {
    symbol: token.symbol,
    name: token.name,
    decimals: token.decimals,
    balance: balance ? balance.toString() : '',
    address: tokenBaseAddress,
  }
  return returnToken
}

export const useImportedTokens = (
  walletAddress: string
): [addresses, (addresses: addresses) => void] => {
  const { chainId } = useEthers()
  const [addresses, setAddresses] = useLocalStorage<string[]>(
    `importedTokensERC20-${chainId}-${walletAddress}`,
    []
  )
  return [addresses || [], setAddresses]
}

export interface ERC1155 {
  contract: string
  id: string
}

export const useImportedTokensERC1155 = (
  walletAddress: string
): [ERC1155[], (addresses: ERC1155[]) => void] => {
  const { chainId } = useEthers()
  const [addresses, setAddresses] = useLocalStorage<ERC1155[]>(
    `importedTokensERC1155-${chainId}-${walletAddress}`,
    []
  )
  return [addresses || [], setAddresses]
}

export interface ERC721 {
  contract: string
  id: string
}

export const useImportedTokensERC721 = (
  walletAddress: string
): [ERC721[], (addresses: ERC721[]) => void] => {
  const { chainId } = useEthers()
  const [addresses, setAddresses] = useLocalStorage<ERC721[]>(
    `importedTokensERC721-${chainId}-${walletAddress}`,
    []
  )
  return [addresses || [], setAddresses]
}

export const useTokenInfo = (
  address: string,
  walletAddress: string
): Token | null => {
  const token = useToken(address)
  const balance = useTokenBalance(address, walletAddress)
  return token || balance
    ? {
        symbol: token?.symbol || '',
        name: token?.name || '',
        decimals: token?.decimals ? token?.decimals.toString() : '',
        balance: balance ? balance.toString() : '',
        address,
      }
    : null
}

export const useImportTokens = (walletAddress: string) => {
  const [loading, setLoading] = useState(false)

  const [addresses, setAddresses] = useImportedTokens(walletAddress)

  const importToken = async (address: string) => {
    setLoading(true)
    if (addresses?.includes(address)) {
      alert('Token already imported')
    } else {
      if (addresses) {
        setAddresses([...addresses, address])
      } else {
        setAddresses([address])
      }
    }
    setLoading(false)
    return true
  }

  const unimportToken = async (address: string) => {
    setLoading(true)
    if (addresses?.includes(address)) {
      setAddresses(addresses.filter((a) => a !== address))
    }
    setLoading(false)
    return true
  }

  return {
    unimportToken,
    importToken,
    loading,
  }
}

export const useImportTokensERC1155 = (walletAddress: string) => {
  const [loading, setLoading] = useState(false)

  const [erc1155s, setErc1155s] = useImportedTokensERC1155(walletAddress)

  const importToken = async (erc1155: ERC1155) => {
    setLoading(true)
    if (erc1155s?.find((x) => x.id === erc1155.id)) {
      alert('Token already imported')
    } else {
      if (erc1155s) {
        setErc1155s([...erc1155s, erc1155])
      } else {
        setErc1155s([erc1155])
      }
    }
    setLoading(false)
    return true
  }

  const unimportToken = async (erc1155: ERC1155) => {
    setLoading(true)
    if (erc1155s?.find((x) => x.id === erc1155.id)) {
      setErc1155s(erc1155s.filter((a) => a !== erc1155))
    }
    setLoading(false)
    return true
  }

  return {
    unimportToken,
    importToken,
    loading,
  }
}

export const useImportTokensERC721 = (walletAddress: string) => {
  const [loading, setLoading] = useState(false)

  const [erc721s, setErc721s] = useImportedTokensERC721(walletAddress)

  const importToken = async (erc721: ERC721) => {
    setLoading(true)
    if (erc721s?.find((x) => x.id === erc721.id)) {
      alert('Token already imported')
    } else {
      if (erc721s) {
        setErc721s([...erc721s, erc721])
      } else {
        setErc721s([erc721])
      }
    }
    setLoading(false)
    return true
  }

  const unimportToken = async (erc721: ERC721) => {
    setLoading(true)
    if (erc721s?.find((x) => x.id === erc721.id)) {
      setErc721s(erc721s.filter((a) => a !== erc721))
    }
    setLoading(false)
    return true
  }

  return {
    unimportToken,
    importToken,
    loading,
  }
}
