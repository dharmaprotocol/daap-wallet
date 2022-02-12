import { motion } from "framer-motion";
import { STYLES } from "src/constants";
import styled, { StyledComponentPropsWithRef } from "styled-components/macro";

const { LINK, TEXT } = STYLES;

interface StyledLinkProps {
  href: string;
  type?: "primary" | "secondary" | "unstyled";
}

const buttonAsLinkResetStyles = `
  appearance: none;
  border: none;
  padding: 0;
  background: none;

  button& {
    text-align: left;
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(motion.a)<StyledLinkProps>`
  display: inline-block;
  ${LINK.FONT_FAMILY_STYLES}
  ${props =>
    props.type === "primary" && `color: ${props.theme.link.primary.color};`}
  ${props =>
    props.type === "secondary" && `color: ${props.theme.link.secondary.color};`}
  ${props => props.type === "unstyled" && `color: inherit;`}
  text-decoration: none;
  font-size: ${TEXT.FONT_SIZES.STANDARD};
  ${buttonAsLinkResetStyles}
`;

type LinkProps = React.ComponentProps<typeof StyledLink>;

export const Link: React.FC<LinkProps> = ({ children, ...props }) => (
  <StyledLink
    whileHover={{
      translateY: -2
    }}
    {...props}
  >
    {children}
  </StyledLink>
);

Link.defaultProps = {
  type: "primary"
};

const StyledCopyLink = styled(motion.a)<LinkProps>`
  display: inline-block;
  font-family: ${props => props.theme.text.fontFamilies.regular};
  ${props =>
    props.type === "primary" && `color: ${props.theme.link.primary.color};`}
  ${props =>
    props.type === "secondary" && `color: ${props.theme.link.secondary.color};`}
  text-decoration: none;
  ${props => `
    font-size: ${props.theme.text.standard.mobile.fontSize};
    letter-spacing: ${props.theme.text.standard.mobile.letterSpacing};
    line-height: ${props.theme.text.standard.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.text.standard.desktop.fontSize};
      letter-spacing: ${props.theme.text.standard.desktop.letterSpacing};
      line-height: ${props.theme.text.standard.desktop.lineHeight};
    }
  `}
  ${buttonAsLinkResetStyles}
`;

type CopyLinkProps = StyledComponentPropsWithRef<typeof StyledCopyLink>;

export const CopyLink: React.FC<CopyLinkProps> = ({ children, ...props }) => (
  <StyledCopyLink
    whileHover={{
      translateY: -2
    }}
    {...props}
  >
    {children}
  </StyledCopyLink>
);

CopyLink.defaultProps = {
  type: "primary"
};
