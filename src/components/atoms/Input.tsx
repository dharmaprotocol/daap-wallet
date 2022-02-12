import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { INPUT } = STYLES;

interface InputProps {
  hasError?: boolean;
  accent?: boolean;
  isValid?: boolean;
  textAlign?: "left" | "center" | "right";
}

export const Input = styled.input<InputProps>`
  ${props => props.theme.input.fontFamilyStyles}
  padding: ${INPUT.PADDING};
  outline: none;
  border-radius: ${INPUT.BORDER_RADIUS};
  -webkit-appearance: none;
  width: 100%;
  border: ${INPUT.DEFAULT.BORDER};
  box-shadow: ${INPUT.DEFAULT.BOX_SHADOW};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}

  ${props =>
    props.accent &&
    `
    border: ${INPUT.ACCENT.BORDER};
    box-shadow: ${INPUT.ACCENT.BOX_SHADOW};
  `}

  ${props =>
    props.hasError &&
    `
    border: ${INPUT.ERROR.BORDER};
    box-shadow: ${INPUT.ERROR.BOX_SHADOW};
  `}

  ${props =>
    props.isValid &&
    `
    border: ${INPUT.VALID.BORDER};
    box-shadow: ${INPUT.VALID.BOX_SHADOW};
  `}

  &::placeholder {
    color: ${INPUT.PLACEHOLDER_COLOR};
  }
`;
Input.defaultProps = {
  type: "text"
};
