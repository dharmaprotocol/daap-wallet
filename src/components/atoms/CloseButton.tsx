import { HiOutlineX } from "react-icons/hi";
import { Button } from "src/components/atoms/Button";
import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { CLOSE_BUTTON } = STYLES;

interface CloseButtonProps {
  onClose: () => void;
  size?: number;
}

const StyledCloseButton = styled(Button)<{ $size: number }>`
  ${({ $size }) => `
    width: ${$size}px;
    height: ${$size}px;
    padding: ${$size / 5}px;
  `}
  background: ${CLOSE_BUTTON.BACKGROUND};
`;

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClose,
  size = 20
}) => (
  <StyledCloseButton onClick={onClose} $size={size}>
    <HiOutlineX color={CLOSE_BUTTON.COLOR} />
  </StyledCloseButton>
);
