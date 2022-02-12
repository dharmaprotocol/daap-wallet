import { OptimizedImage } from "src/components/atoms/Image";
import { STYLES } from "src/constants/index";
import dharmaLogo from "src/assets/images/dharma_logo_no_shadow.png";
import dharmaLogoText from "src/assets/images/dharma_logo_text.png";
import styled from "styled-components/macro";

const { BOX_SHADOWS } = STYLES;

interface LogoProps {
  width: number;
  noText?: boolean;
}

const DharmaLogoWrapper = styled.div<LogoProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${props => props.width}px;
`;

const LogoImage = styled(OptimizedImage)<{ $fullWidth: boolean }>`
  border-radius: 12px;
  ${({ $fullWidth: fullWidth }) => `width: ${fullWidth ? "100%" : "40%"};`}
  margin-right: 7.5%;
  box-shadow: ${BOX_SHADOWS.ACCENTED};
`;

const LogoTextImage = styled(OptimizedImage)`
  width: 60%;
`;

export const DharmaLogo: React.FC<LogoProps> = ({ width, noText }) => (
  <DharmaLogoWrapper width={width}>
    <LogoImage
      src={dharmaLogo}
      layout="responsive"
      priority
      alt="Dharma Logo"
      $fullWidth={Boolean(noText)}
    />
    {!noText && (
      <LogoTextImage
        src={dharmaLogoText}
        layout="responsive"
        priority
        alt="dharma"
      />
    )}
  </DharmaLogoWrapper>
);
