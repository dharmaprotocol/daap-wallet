import styled, { css } from "styled-components/macro";

const imgStyles = css`
  user-drag: none;
`;

const ImageWrapper = styled.div`
  position: relative;

  img {
    ${imgStyles}
  }
`;

export const OptimizedImage: React.FC<any> = ({ className, ...props }) => (
  <ImageWrapper className={className}>
    <img {...props} />
  </ImageWrapper>
);

export const Image = styled.img`
  ${imgStyles}
`;
