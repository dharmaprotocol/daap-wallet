import { Icon } from "src/components/atoms/Icon";
import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { BORDERS, CARD } = STYLES;

const ArrowBoxWrapper = styled.div`
  border: ${BORDERS.NORMAL};
  border-radius: 8px;
  padding: 5px;
  width: 32px;
  height: 32px;
  background: ${CARD.DEFAULT.BACKGROUND};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowBox: React.FC = () => (
  <ArrowBoxWrapper>
    <ArrowWrapper>
      <Icon name="downArrowIcon" width={16} height={16} />
    </ArrowWrapper>
  </ArrowBoxWrapper>
);
