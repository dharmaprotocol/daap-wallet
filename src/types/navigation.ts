export type Screen =
  | 'swapBlock'
  | 'searchTokens'
  | 'swapConfirmation'
  | 'textLink'
  | 'textLinkConfirmation'
  | 'navMenu'

export interface NavLink {
  text: string
  url: string
}

export type NavLinks = NavLink[]
