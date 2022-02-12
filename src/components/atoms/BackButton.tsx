import { Button, ButtonProps } from "src/components/atoms/Button";
import { Icon } from "src/components/atoms/Icon";
import styled from "styled-components/macro";

const ArrowWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton: React.FC<ButtonProps> = props => (
  <Button buttonType="unstyled" {...props}>
    <ArrowWrapper>
      <Icon name="leftArrowIcon" width={16} height={16} />
    </ArrowWrapper>
  </Button>
);
