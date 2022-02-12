import { Spacing } from "../atoms/Spacing";
import { useCurrentChain } from "src/hooks/useCurrentChain";
import styled from "styled-components/macro";

const NETWORK_ICON_SIZE = 28;

interface SwitchNetworkButtonProps {
  disabled?: boolean;
}

const NetworkLogoWrapper = styled.div`
  width: ${NETWORK_ICON_SIZE}px;
  height: ${NETWORK_ICON_SIZE}px;
`;

export const SwitchNetworkButton: React.FC<SwitchNetworkButtonProps> = () => {
  const { ICON, NETWORK_NAME } = useCurrentChain();

  return (
    <Spacing>
      <NetworkLogoWrapper>
        <img src={ICON} alt={`${NETWORK_NAME} logo`} width={32} height={32} />
      </NetworkLogoWrapper>
    </Spacing>
  );
};
