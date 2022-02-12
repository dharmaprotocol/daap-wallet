const defaultFormatter = Intl.NumberFormat('en', {
  maximumFractionDigits: 6,
})

const compactFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 4,
})
const one_million = 1000000

export const formatMaybeLargeNumber = (amount: number): string => {
  if (amount >= one_million) {
    return compactFormatter.format(amount)
  }

  return defaultFormatter.format(amount)
}
