import { STYLES } from "src/constants";
import styled, { css } from "styled-components/macro";

const { SPACINGS, TEXT, TITLE } = STYLES;

export type TextLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TextLevelString =
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5"
  | "level6";

interface SpanProps {
  accented?: boolean;
  secondary?: boolean;
  error?: boolean;
  default?: boolean;
  color?: string;
  dimmed?: boolean;
  fontSize?: number;
  bold?: boolean;
}

const levelOnMobileMixin = css<{ levelOnMobile?: TextLevel }>`
  ${props => {
    if (!props.levelOnMobile) {
      return;
    }
    const fontStyle =
      props.theme.title[`level${props.levelOnMobile}` as TextLevelString]
        .mobile;
    return `
      font-size: ${fontStyle.fontSize};
      letter-spacing: ${fontStyle.letterSpacing};
      line-height: ${fontStyle.lineHeight};
    `;
  }}
`;

export const Span = styled.span<SpanProps>`
  ${props => props.default && `color: ${props.theme.text.colors.normal};`}
  ${({ accented, theme }) =>
    accented && `color: ${theme.text.colors.accented};`}
  ${({ secondary, theme }) =>
    secondary && `color: ${theme.text.colors.secondary};`}
  ${({ color }) => color && `color: ${color};`}
  ${({ dimmed }) => dimmed && `opacity: 0.5;`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px;`}
  ${({ error, theme }) => error && `color: ${theme.text.colors.error};`}
  ${props =>
    props.bold &&
    `
    font-family: ${props.theme.text.fontFamilies.bold};
  `}
`;

export interface TextProps {
  inline?: boolean;
  // TODO: Change to secondary?: boolean
  type?: "secondary";
  bold?: boolean;
  size?: "standard" | "smedium";
  color?: string;
  mono?: boolean;
  accented?: boolean;
  error?: boolean;
  gain?: boolean;
  loss?: boolean;
  spaceBefore?: boolean;
  textAlign?: "left" | "center" | "right";
  // fontSizeOnMobile only implemented on CopyText
  fontSizeOnMobile?: string;
  // levelOnMobile only implemented on CopyText
  levelOnMobile?: TextLevel;
}

const StyledText = styled.p<TextProps>`
  ${TEXT.DEFAULT.FONT_FAMILY_STYLES}
  font-size: ${TEXT.FONT_SIZES.STANDARD};
  color: ${({ color, theme }) => color || theme.text.colors.normal};
  ${({ accented, theme }) =>
    accented && `color: ${theme.text.colors.accented};`}
  ${({ error, theme }) => error && `color: ${theme.text.colors.error};`}
  ${({ type, theme }) =>
    type === "secondary" && `color: ${theme.text.colors.secondary};`}
  ${({ gain, theme }) => gain && `color: ${theme.text.colors.gain};`}
  ${({ loss, theme }) => loss && `color: ${theme.text.colors.loss};`}

  margin: 0;

  ${props =>
    props.size === "smedium" &&
    `
    font-size: ${TEXT.FONT_SIZES.SMEDIUM};
  `}

  ${props =>
    props.inline &&
    `
    display: inline-block;
  `}

  ${props =>
    props.bold &&
    `
    font-family: ${TEXT.BOLD.FONT_FAMILY};
  `}

  ${props =>
    props.mono &&
    `
    ${TEXT.MONO.FONT_FAMILY_STYLES}
  `}

  ${props =>
    props.spaceBefore &&
    `
    margin-left: ${SPACINGS.SMALL};
  `}

  ${props => props.textAlign && `text-align: ${props.textAlign};`}
`;

export const Text: React.FC<TextProps> = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);

const StyledCopyText = styled.p<TextProps>`
  font-family: ${props => props.theme.text.fontFamilies.regular};
  color: ${({ color, theme }) => color || theme.text.colors.normal};
  ${({ accented, theme }) =>
    accented && `color: ${theme.text.colors.accented};`}
  ${({ error, theme }) => error && `color: ${theme.text.colors.error};`}
  ${({ type, theme }) =>
    type === "secondary" && `color: ${theme.text.colors.secondary};`}
  ${({ gain, theme }) => gain && `color: ${theme.text.colors.gain};`}
  ${({ loss, theme }) => loss && `color: ${theme.text.colors.loss};`}
  margin: 0;

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

  ${props =>
    props.inline &&
    `
    display: inline-block;
  `}

  ${props =>
    props.bold &&
    `
    font-family: ${props.theme.text.fontFamilies.bold};
  `}

  ${props =>
    props.mono &&
    `
    ${TEXT.MONO.FONT_FAMILY_STYLES}
  `}

  ${props =>
    props.spaceBefore &&
    `
    margin-left: ${SPACINGS.SMALL};
  `}

  ${props => props.textAlign && `text-align: ${props.textAlign};`}

  @media (max-width: ${props => props.theme.breakpoints.mobileMax}) {
    ${props =>
      props.fontSizeOnMobile && `font-size: ${props.fontSizeOnMobile};`}
    ${levelOnMobileMixin}
  }
`;

export const CopyText: React.FC<TextProps> = ({ children, ...props }) => (
  <StyledCopyText {...props}>{children}</StyledCopyText>
);

interface TitleProps {
  level?: TextLevel;
  bold?: boolean;
  mono?: boolean;
  accented?: boolean;
  secondary?: boolean;
  color?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  // fontSizeOnMobile only implemented on CopyTitle
  fontSizeOnMobile?: string;
  // lineHeight only implemented on CopyTitle
  lineHeight?: string;
  // lineHeightOnMobile only implemented on CopyTitle
  lineHeightOnMobile?: string;
  // levelOnMobile only implemented on CopyTitle
  levelOnMobile?: TextLevel;
}

const StyledTitle = styled.h1<TitleProps>`
  ${TITLE.DEFAULT.FONT_FAMILY_STYLES}
  font-weight: normal;
  margin: 0;
  color: ${({ color, theme }) => color || theme.text.colors.normal};
  ${({ accented, theme }) =>
    accented && `color: ${theme.text.colors.accented};`}
  ${({ secondary, theme }) =>
    secondary && `color: ${theme.text.colors.secondary};`}

  ${props =>
    props.level === 2 &&
    `
    font-size: 36px;
    line-height: 44px;
  `}
  ${props =>
    props.level === 3 &&
    `
    font-size: 24px;
    line-height: 32px;
  `}
  ${props =>
    props.level === 4 &&
    `
    font-size: 16px;
  `}
  ${props =>
    props.bold &&
    `
    font-family: ${TEXT.BOLD.FONT_FAMILY};
  `}
  ${props =>
    props.mono &&
    `
    ${TITLE.MONO.FONT_FAMILY_STYLES}
  `}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}
  ${props => props.fontSize && `font-size: ${props.fontSize};`}
`;

export const Title: React.FC<TitleProps> = ({
  children,
  level = 1,
  bold = true,
  ...props
}) => {
  const component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <StyledTitle as={component} level={level} bold={bold} {...props}>
      {children}
    </StyledTitle>
  );
};

const StyledCopyTitle = styled.h1<TitleProps>`
  font-family: ${props => props.theme.title.fontFamilies.regular};
  color: ${({ color, theme }) => color || theme.text.colors.normal};
  ${({ accented, theme }) =>
    accented && `color: ${theme.text.colors.accented};`}
  ${({ secondary, theme }) =>
    secondary && `color: ${theme.text.colors.secondary};`}
  font-weight: normal;
  margin: 0;

  ${props =>
    props.level === 1 &&
    `
    font-size: ${props.theme.title.level1.mobile.fontSize};
    letter-spacing: ${props.theme.title.level1.mobile.letterSpacing};
    line-height: ${props.theme.title.level1.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level1.desktop.fontSize};
      letter-spacing: ${props.theme.title.level1.desktop.letterSpacing};
      line-height: ${props.theme.title.level1.desktop.lineHeight};
    }
  `}
  ${props =>
    props.level === 2 &&
    `
    font-size: ${props.theme.title.level2.mobile.fontSize};
    letter-spacing: ${props.theme.title.level2.mobile.letterSpacing};
    line-height: ${props.theme.title.level2.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level2.desktop.fontSize};
      letter-spacing: ${props.theme.title.level2.desktop.letterSpacing};
      line-height: ${props.theme.title.level2.desktop.lineHeight};
    }
  `}
  ${props =>
    props.level === 3 &&
    `
    font-size: ${props.theme.title.level3.mobile.fontSize};
    letter-spacing: ${props.theme.title.level3.mobile.letterSpacing};
    line-height: ${props.theme.title.level3.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level3.desktop.fontSize};
      letter-spacing: ${props.theme.title.level3.desktop.letterSpacing};
      line-height: ${props.theme.title.level3.desktop.lineHeight};
    }
  `}
  ${props =>
    props.level === 4 &&
    `
    font-size: ${props.theme.title.level4.mobile.fontSize};
    letter-spacing: ${props.theme.title.level4.mobile.letterSpacing};
    line-height: ${props.theme.title.level4.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level4.desktop.fontSize};
      letter-spacing: ${props.theme.title.level4.desktop.letterSpacing};
      line-height: ${props.theme.title.level4.desktop.lineHeight};
    }
  `}
  ${props =>
    props.level === 5 &&
    `
    font-size: ${props.theme.title.level5.mobile.fontSize};
    letter-spacing: ${props.theme.title.level5.mobile.letterSpacing};
    line-height: ${props.theme.title.level5.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level5.desktop.fontSize};
      letter-spacing: ${props.theme.title.level5.desktop.letterSpacing};
      line-height: ${props.theme.title.level5.desktop.lineHeight};
    }
  `}
  ${props =>
    props.level === 6 &&
    `
    font-size: ${props.theme.title.level6.mobile.fontSize};
    letter-spacing: ${props.theme.title.level6.mobile.letterSpacing};
    line-height: ${props.theme.title.level6.mobile.lineHeight};
    @media (min-width: ${props.theme.breakpoints.desktopMin}) {
      font-size: ${props.theme.title.level6.desktop.fontSize};
      letter-spacing: ${props.theme.title.level6.desktop.letterSpacing};
      line-height: ${props.theme.title.level6.desktop.lineHeight};
    }
  `}
  ${props =>
    props.bold &&
    `
    font-family: ${props.theme.title.fontFamilies.bold};
  `}
  ${props =>
    props.mono &&
    `
    ${TITLE.MONO.FONT_FAMILY_STYLES}
  `}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}

  @media (min-width: ${props => props.theme.breakpoints.desktopMin}) {
    ${props => props.fontSize && `font-size: ${props.fontSize};`}
    ${props => props.lineHeight && `line-height: ${props.lineHeight};`}
  }

  @media (max-width: ${props => props.theme.breakpoints.mobileMax}) {
    ${props =>
      props.fontSizeOnMobile && `font-size: ${props.fontSizeOnMobile};`}
    ${props =>
      props.lineHeightOnMobile && `line-height: ${props.lineHeightOnMobile};`}
    ${levelOnMobileMixin}
  }
`;

export const CopyTitle: React.FC<TitleProps> = ({
  children,
  level = 1,
  bold = true,
  ...props
}) => {
  const component = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <StyledCopyTitle as={component} level={level} bold={bold} {...props}>
      {children}
    </StyledCopyTitle>
  );
};
