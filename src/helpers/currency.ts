import { BigNumber } from 'bignumber.js'

const defaultCurrencyFormatterOptions: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
}
const one_million = 1000000

export const formatToUSD = (amount: number | BigNumber, precision?: number) => {
  const formatterOptions = { ...defaultCurrencyFormatterOptions }
  const amountToFormat = typeof amount !== 'number' ? amount.toNumber() : amount

  if (amountToFormat >= one_million) {
    formatterOptions.notation = 'compact'
  }

  const formatter = new Intl.NumberFormat('en-US', {
    ...formatterOptions,
    maximumFractionDigits: precision,
  })

  return formatter.format(amountToFormat)
}
