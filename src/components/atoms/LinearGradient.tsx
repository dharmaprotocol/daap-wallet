import styled from 'styled-components/macro'

interface LinearGradientProps {
  type:
    | 'primary'
    | 'secondary'
    | 'primaryToSecondary'
    | 'secondaryToPrimary'
    | 'accentedToPrimary'
    | 'primaryToAccented'
    | 'accentedPizzaz'
}

export const LinearGradient = styled.div<LinearGradientProps>`
  ${({ theme, type }) => {
    if (type === 'primary') {
      return `background: ${theme.colors.primaryBackground};`
    }

    if (type === 'secondary') {
      return `background: ${theme.colors.secondaryBackground};`
    }

    if (type === 'primaryToSecondary') {
      return `background-image: ${theme.linearGradient.primaryToSecondary};`
    }

    if (type === 'secondaryToPrimary') {
      return `background-image: ${theme.linearGradient.secondaryToPrimary};`
    }

    if (type === 'accentedToPrimary') {
      return `background-image: ${theme.linearGradient.accentedToPrimary};`
    }

    if (type === 'primaryToAccented') {
      return `background-image: ${theme.linearGradient.primaryToAccented};`
    }

    if (type === 'accentedPizzaz') {
      return `background-image: ${theme.linearGradient.accentedPizzaz};`
    }
  }}
`
