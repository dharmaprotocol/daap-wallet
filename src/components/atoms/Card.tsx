import { motion } from "framer-motion";
import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { CARD } = STYLES;

interface CardProps {
  type?:
    | "default"
    | "default-no-button"
    | "inner-floating"
    | "flat"
    | "flat-no-button"
    | "flat-no-button-shadow";
  accented?: boolean;
  veryAccented?: boolean;
}

export const Card = styled(motion.div)<CardProps>`
  ${props =>
    props.type === "default" &&
    `
    background-color: ${CARD.DEFAULT.BACKGROUND};
    border-radius: ${CARD.DEFAULT.BORDER_RADIUS};
    box-shadow: ${CARD.DEFAULT.BOX_SHADOW};
    `}
  ${props =>
    props.type === "default-no-button" &&
    `
    background-color: ${CARD.DEFAULT_NO_BUTTON.BACKGROUND};
    border-radius: ${CARD.DEFAULT_NO_BUTTON.BORDER_RADIUS};
    box-shadow: ${CARD.DEFAULT_NO_BUTTON.BOX_SHADOW};
    `}
  ${props =>
    props.type === "inner-floating" &&
    `
    background-color: ${CARD.INNER_FLOATING.BACKGROUND};
    border-radius: ${CARD.INNER_FLOATING.BORDER_RADIUS};
    box-shadow: ${CARD.INNER_FLOATING.BOX_SHADOW};
    `}

  ${props =>
    props.type === "flat" &&
    `
    background-color: ${CARD.FLAT.BACKGROUND};
    border-radius: ${CARD.FLAT.BORDER_RADIUS};
    border: ${CARD.FLAT.BORDER};
    `}

  ${props =>
    props.type === "flat-no-button-shadow" &&
    `
    background-color: ${CARD.FLAT_NO_BUTTON.BACKGROUND};
    border-radius: ${CARD.FLAT_NO_BUTTON.BORDER_RADIUS};
    border: ${CARD.FLAT_NO_BUTTON.BORDER};
    box-shadow: ${CARD.DEFAULT.BOX_SHADOW};
    `}

  ${props =>
    props.type === "flat-no-button" &&
    `
    background-color: ${CARD.FLAT_NO_BUTTON.BACKGROUND};
    border-radius: ${CARD.FLAT_NO_BUTTON.BORDER_RADIUS};
    border: ${CARD.FLAT_NO_BUTTON.BORDER};
    `}

  ${props => props.accented && `box-shadow: ${CARD.ACCENTED.BOX_SHADOW};`}
  ${props =>
    props.veryAccented && `box-shadow: ${CARD.VERY_ACCENTED.BOX_SHADOW};`}

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

Card.defaultProps = {
  type: "default"
};
