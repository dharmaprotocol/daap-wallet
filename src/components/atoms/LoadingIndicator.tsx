import { BeatLoader, FadeLoader, PuffLoader } from "react-spinners";
import styled from "styled-components/macro";

interface LoadingIndicatorProps {
  useCurrentColor?: boolean;
  inline?: boolean;
}

const LoadingIndicatorWrapper = styled.span<{ inline?: boolean }>`
  > span {
    display: flex;
    padding-top: 6px;
    padding-bottom: 7px;
  }

  ${({ inline }) =>
    inline &&
    `
    > span {
      display: inline-flex;
      vertical-align: middle;
    }
  `}
`;

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  inline,
  useCurrentColor = false
}) => (
  <LoadingIndicatorWrapper inline={inline}>
    <BeatLoader
      size={10}
      color={useCurrentColor ? "currentColor" : "#BBBBBB"}
    />
  </LoadingIndicatorWrapper>
);

interface WaitingIndicatorProps {
  useCurrentColor?: boolean;
}

export const WaitingIndicator: React.FC<WaitingIndicatorProps> = ({
  useCurrentColor = false
}) => (
  <LoadingIndicatorWrapper css="display: inline-block;">
    <PuffLoader
      size={60}
      color={useCurrentColor ? "currentColor" : "#BBBBBB"}
    />
  </LoadingIndicatorWrapper>
);

interface SpinningIndicatorProps {
  useCurrentColor?: boolean;
}

export const SpinningIndicator: React.FC<SpinningIndicatorProps> = ({
  useCurrentColor = false
}) => (
  <LoadingIndicatorWrapper css="transform: scale(0.6); width: 38px; height: 36px; display: flex; align-items: center; justify-content: center;">
    <FadeLoader color={useCurrentColor ? "currentColor" : "#BBBBBB"} />
  </LoadingIndicatorWrapper>
);
