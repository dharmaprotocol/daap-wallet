import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { RADIO_BUTTON } = STYLES;

const StyledRadioButton = styled.div<{ checked: boolean }>`
  border-radius: 100%;
  border: ${RADIO_BUTTON.BORDER};
  background: ${RADIO_BUTTON.BACKGROUND};
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: grid;
  place-items: center;

  ${props =>
    props.checked &&
    `
    &::before {
      content: "";
      width: 16px;
      height: 16px;
      box-shadow: inset 16px 16px currentColor;
      border-radius: 50%;
    }
  `}
`;

interface RadioButtonProps {
  checked: boolean;
  onClick: () => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onClick
}) => <StyledRadioButton checked={checked} onClick={onClick} />;
