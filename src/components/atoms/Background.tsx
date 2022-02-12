import { CONSTANTS } from "src/constants";
import styled from "styled-components/macro";

const { COLORS } = CONSTANTS;

export const Background = styled.div<{ accented?: boolean }>`
  background-color: ${COLORS.MAIN_BACKGROUND};
  min-height: 100vh;
  ${props =>
    props.accented &&
    `background-color: ${props.theme.colors.accentedBackground}`}
`;
