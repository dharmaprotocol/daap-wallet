import { MotionProps, motion } from "framer-motion";
import { LoadingIndicator } from "src/components/atoms/LoadingIndicator";
import { STYLES } from "src/constants";
import styled, { StyledComponentPropsWithRef } from "styled-components/macro";

export type ButtonProps = StyledComponentPropsWithRef<typeof StyledButton> & {
  buttonType?:
    | "primary"
    | "secondary"
    | "light"
    | "unstyled"
    | "unstyled-no-motion";
  block?: boolean;
  disabled?: boolean;
  thin?: boolean;
  $rectangle?: boolean;
  size?: "default" | "small" | "tiny";
  inlineBlock?: boolean;
  loading?: boolean;
  innerRef?: any;
};

const { BUTTON } = STYLES;

interface StyledButtonProps {
  $buttonType?:
    | "primary"
    | "secondary"
    | "light"
    | "unstyled"
    | "unstyled-no-motion";
  $block?: boolean;
  $thin?: boolean;
  $rectangle?: boolean;
  $inlineBlock?: boolean;
  $size?: "default" | "small" | "tiny";
  $loading?: boolean;
}

const StyledButton = styled(motion.button)<StyledButtonProps>`
  display: flex;
  ${props =>
    !["unstyled", "unstyled-no-motion"].includes(props.$buttonType ?? "") &&
    `
    font-family: ${props.theme.text.fontFamilies.bold};
    border-radius: ${BUTTON.DEFAULT.BORDER_RADIUS};
    align-items: center;
    justify-content: center;
    padding: ${BUTTON.DEFAULT.PADDING_VERTICAL} ${BUTTON.DEFAULT.PADDING_HORIZONTAL};
    font-size: ${BUTTON.DEFAULT.FONT_SIZE};
  `}
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  text-decoration: none;

  ${props =>
    props.$rectangle && `border-radius: ${BUTTON.RECTANGLE.BORDER_RADIUS};`}
  ${props => (props.$block ? "width: 100%;" : "width: fit-content;")}
  ${props => props.$inlineBlock && "display: inline-block;"}
  ${props =>
    props.$buttonType === "primary" &&
    `
    background: ${props.theme.button.primary.background};
    color: ${props.theme.button.primary.color};
    box-shadow: ${props.theme.button.primary.boxShadow};
    border: ${props.theme.button.primary.border};
  `}
  ${props =>
    props.$buttonType === "secondary" &&
    `
    background: ${props.theme.button.secondary.background};
    color: ${props.theme.button.secondary.color};
    box-shadow: ${props.theme.button.secondary.boxShadow};
    border: ${props.theme.button.secondary.border};
  `}
  ${props =>
    props.$buttonType === "light" &&
    `
    background: ${props.theme.button.light.background};
    color: ${props.theme.button.light.color};
    box-shadow: ${props.theme.button.light.boxShadow};
    border: ${props.theme.button.light.border};
  `}
  ${props =>
    ["unstyled", "unstyled-no-motion"].includes(props.$buttonType ?? "") &&
    `
    background: transparent;
    padding: 0;
  `}
  ${props =>
    (props.disabled || props.$loading) &&
    `
    background: ${props.theme.button.disabled.background};
    color: ${props.theme.button.disabled.color};
    box-shadow: ${props.theme.button.disabled.boxShadow};
    border: ${props.theme.button.disabled.border};
    cursor: default;
  `}
  ${props =>
    props.$thin &&
    `
    height: 42px;
  `}
  ${props =>
    props.$size === "small" &&
    `
    padding: ${BUTTON.SIZE_SMALL.PADDING};
    font-size: ${BUTTON.SIZE_SMALL.FONT_SIZE};
  `}
  ${props =>
    props.$size === "small" &&
    `
    padding: ${BUTTON.SIZE_TINY.PADDING};
    font-size: ${BUTTON.SIZE_TINY.FONT_SIZE};
  `}
  ${props =>
    props.$size === "tiny" &&
    `
    padding: ${BUTTON.SIZE_TINY.PADDING};
    font-size: ${BUTTON.SIZE_TINY.FONT_SIZE};
  `}
  ${props =>
    props.$size === "tiny" &&
    `
    padding: ${BUTTON.SIZE_TINY.PADDING};
    font-size: ${BUTTON.SIZE_TINY.FONT_SIZE};
  `}
`;

const buttonMotionProps = (props: ButtonProps): MotionProps => ({
  whileTap: {
    scale: props.disabled ? 1 : 0.94,
    transition: { duration: 0.1 }
  },
  whileHover: {
    translateY: props.disabled ? 0 : -2
  }
});

export const Button: React.FC<ButtonProps> = ({
  children,
  innerRef,
  loading,
  buttonType,
  block,
  size,
  inlineBlock,
  thin,
  ...props
}) => (
  <StyledButton
    role="button"
    {...(buttonType !== "unstyled-no-motion" ? buttonMotionProps(props) : {})}
    $buttonType={buttonType}
    $block={block}
    $loading={loading}
    $size={size}
    $inlineBlock={inlineBlock}
    $thin={thin}
    ref={innerRef}
    {...props}
  >
    {loading ? <LoadingIndicator useCurrentColor /> : children}
  </StyledButton>
);
