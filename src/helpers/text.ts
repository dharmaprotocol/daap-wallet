export const middleTruncate = (
  fullText: string,
  truncateThreshold: number,
  separator?: string
) => {
  if (fullText.length <= truncateThreshold) {
    return fullText
  }

  separator = separator || '...'

  const charsToShow = truncateThreshold - separator.length
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return (
    fullText.substr(0, frontChars) +
    separator +
    fullText.substr(fullText.length - backChars)
  )
}
