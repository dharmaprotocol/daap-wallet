import { motion } from "framer-motion";
import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { BORDERS, COLORS } = STYLES;

interface SpacingProps {
  $backgroundColor?: string;
  $center?: boolean;
  $bordered?: boolean;
  $borderedTop?: boolean;
  $borderedBottom?: boolean;
  $largeBorder?: boolean;
  $size?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $sizeOnMobile?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $verticalSize?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $bottomSize?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $topSize?:
    | "none"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $horizontalSize?:
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $clickable?: boolean;
  $accented?: boolean;
  $spaceChildrenSize?:
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "hero"
    | "xxhero";
  $textAlign?: "left" | "center" | "right";
  $textAlignOnMobile?: "left" | "center" | "right";
  $flexDirection?: "row" | "column";
  $flexDirectionOnMobile?: "row" | "column";
  $alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  $justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  $alignItemsOnMobile?: "flex-start" | "flex-end" | "center" | "stretch";
  $justifyContentOnMobile?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between";
  $flex?: number;
}

export const Spacing = styled(motion.div)<SpacingProps>`
  display: flex;
  flex-direction: ${props => props.$flexDirection};
  width: 100%;
  ${props => props.$flex && `flex: ${props.$flex};`}
  ${props => props.$backgroundColor && `background: ${props.$backgroundColor};`}
  ${props => props.$center && "align-items: center;"}
  ${props =>
    (props.$bordered || props.$borderedTop) &&
    `border-top: ${BORDERS.SECONDARY};`}
  ${props =>
    (props.$bordered || props.$borderedBottom) &&
    `border-bottom: ${BORDERS.SECONDARY};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "xsmall" || verticalSize === "xsmall" || topSize === "xsmall") &&
    `padding-top: ${theme.spacing.xsmall};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "xsmall" ||
      verticalSize === "xsmall" ||
      bottomSize === "xsmall") &&
    `padding-bottom: ${theme.spacing.xsmall};`}
  ${props =>
    (props.$size === "xsmall" || props.$horizontalSize === "xsmall") &&
    `padding-left: ${props.theme.spacing.xsmall}; padding-right: ${props.theme.spacing.xsmall};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "small" || verticalSize === "small" || topSize === "small") &&
    `padding-top: ${theme.spacing.small};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "small" || verticalSize === "small" || bottomSize === "small") &&
    `padding-bottom: ${theme.spacing.small};`}
  ${props =>
    (props.$size === "small" || props.$horizontalSize === "small") &&
    `padding-left: ${props.theme.spacing.small}; padding-right: ${props.theme.spacing.small};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "medium" || verticalSize === "medium" || topSize === "medium") &&
    `padding-top: ${theme.spacing.medium};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "medium" ||
      verticalSize === "medium" ||
      bottomSize === "medium") &&
    `padding-bottom: ${theme.spacing.medium};`}
  ${props =>
    (props.$size === "medium" || props.$horizontalSize === "medium") &&
    `padding-left: ${props.theme.spacing.medium}; padding-right: ${props.theme.spacing.medium};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "large" || verticalSize === "large" || topSize === "large") &&
    `padding-top: ${theme.spacing.large};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "large" || verticalSize === "large" || bottomSize === "large") &&
    `padding-bottom: ${theme.spacing.large};`}
  ${props =>
    (props.$size === "large" || props.$horizontalSize === "large") &&
    `padding-left: ${props.theme.spacing.large}; padding-right: ${props.theme.spacing.large};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "xlarge" || verticalSize === "xlarge" || topSize === "xlarge") &&
    `padding-top: ${theme.spacing.xlarge};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "xlarge" ||
      verticalSize === "xlarge" ||
      bottomSize === "xlarge") &&
    `padding-bottom: ${theme.spacing.xlarge};`}
  ${props =>
    (props.$size === "xlarge" || props.$horizontalSize === "xlarge") &&
    `padding-left: ${props.theme.spacing.xlarge}; padding-right: ${props.theme.spacing.xlarge};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "xxlarge" ||
      verticalSize === "xxlarge" ||
      topSize === "xxlarge") &&
    `padding-top: ${theme.spacing.xxlarge};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "xxlarge" ||
      verticalSize === "xxlarge" ||
      bottomSize === "xxlarge") &&
    `padding-bottom: ${theme.spacing.xxlarge};`}
  ${props =>
    (props.$size === "xxlarge" || props.$horizontalSize === "xxlarge") &&
    `padding-left: ${props.theme.spacing.xxlarge}; padding-right: ${props.theme.spacing.xxlarge};`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "hero" || verticalSize === "hero" || topSize === "hero") &&
    `padding-top: ${theme.spacing.hero};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "hero" || verticalSize === "hero" || bottomSize === "hero") &&
    `padding-bottom: ${theme.spacing.hero};`}
  ${props =>
    (props.$size === "hero" || props.$horizontalSize === "hero") &&
    `padding-left: ${props.theme.spacing.hero}; padding-right: ${props.theme.spacing.hero};`}
  ${props => props.$largeBorder && `border-width: 3px;`}
  ${({ $size: size, $verticalSize: verticalSize, $topSize: topSize, theme }) =>
    (size === "xxhero" || verticalSize === "xxhero" || topSize === "xxhero") &&
    `padding-top: ${theme.spacing.xxhero};`}
  ${({
    $size: size,
    $verticalSize: verticalSize,
    $bottomSize: bottomSize,
    theme
  }) =>
    (size === "xxhero" ||
      verticalSize === "xxhero" ||
      bottomSize === "xxhero") &&
    `padding-bottom: ${theme.spacing.xxhero};`}
  ${props =>
    (props.$size === "xxhero" || props.$horizontalSize === "xxhero") &&
    `padding-left: ${props.theme.spacing.xxhero}; padding-right: ${props.theme.spacing.xxhero};`}
  ${props => props.$largeBorder && `border-width: 3px;`}

  ${props => props.$accented && `background: ${COLORS.PALE_GREEN};`}

  ${props =>
    props.$spaceChildrenSize &&
    props.$flexDirection === "column" &&
    `
    > *:not(:last-child) {
      margin-bottom: ${props.theme.spacing[props.$spaceChildrenSize]};
    }
  `}
  ${props =>
    props.$spaceChildrenSize &&
    props.$flexDirection === "row" &&
    `
    > *:not(:last-child) {
      margin-right: ${props.theme.spacing[props.$spaceChildrenSize]};
    }
  `}
  @media (max-width: ${({ theme }) => theme.breakpoints.mobileMax}) {
    ${props =>
      props.$flexDirectionOnMobile &&
      `
      flex-direction: ${props.$flexDirectionOnMobile};
    `}
    ${props =>
      props.$spaceChildrenSize &&
      props.$flexDirectionOnMobile == "row" &&
      `
      > *:not(:last-child) {
        margin: 0;
        margin-right: ${props.theme.spacing[props.$spaceChildrenSize]};
      }
    `}
    ${props =>
      props.$spaceChildrenSize &&
      props.$flexDirectionOnMobile == "column" &&
      `
      > *:not(:last-child) {
        margin: 0;
        margin-bottom: ${props.theme.spacing[props.$spaceChildrenSize]};
      }
    `}
    ${props =>
      props.$alignItemsOnMobile && `align-items: ${props.$alignItemsOnMobile};`}
    ${props =>
      props.$justifyContentOnMobile &&
      `justify-content: ${props.$justifyContentOnMobile};`}
  }
  ${props => props.$clickable && "cursor: pointer;"}
  ${props => props.$textAlign && `text-align: ${props.$textAlign};`}
  @media (max-width: ${props => props.theme.breakpoints.mobileMax}) {
    ${props =>
      props.$sizeOnMobile &&
      `
      padding: ${props.theme.spacing[props.$sizeOnMobile]};
    `}
    ${props =>
      props.$textAlignOnMobile &&
      `
      text-align: ${props.$textAlignOnMobile};
    `}
  }
  ${props => props.$alignItems && `align-items: ${props.$alignItems};`}
  ${props =>
    props.$justifyContent && `justify-content: ${props.$justifyContent};`}
`;

Spacing.defaultProps = {
  $size: "none",
  $flexDirection: "column"
};
