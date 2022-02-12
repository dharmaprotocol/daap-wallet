import { BigNumber } from 'bignumber.js'

export interface TokenData {
  id: string
  address: string
  name: string
  price: BigNumber
  symbol: string
  priceChange: BigNumber
  iconUrl: string
  verificationStatus: string
}

export interface TokenDisplayData {
  id: string
  name: string
  price: string
  symbol: string
  priceChange: string
  priceChangeType: '+' | '-' | null
  iconUrl: string
  verificationStatus: string
}

export interface TokenDataAndDisplayData {
  data: TokenData
  displayData: TokenDisplayData
}
