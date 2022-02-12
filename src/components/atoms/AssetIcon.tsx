import { useEffect, useState } from "react";
import { Image } from "src/components/atoms/Image";
import { Text } from "src/components/typography";
import { STYLES } from "src/constants";
import styled, { css } from "styled-components/macro";

const { ASSET_ICON } = STYLES;

interface AssetIconProps {
  src: string;
  symbol?: string;
  size?: number;
  withDropShadow?: boolean;
}

const baseImageStyles = css<{ size: number; withDropShadow: boolean }>`
  ${props =>
    props.withDropShadow ? `box-shadow: ${ASSET_ICON.DEFAULT.BOX_SHADOW};` : ""}
  border-radius: ${ASSET_ICON.DEFAULT.BORDER_RADIUS};
  background: ${ASSET_ICON.DEFAULT.BACKGROUND};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FallbackAssetImage = styled.div<{
  size: number;
  withDropShadow: boolean;
}>`
  ${baseImageStyles}
`;

const AssetImage = styled(Image)<{ size: number; withDropShadow: boolean }>`
  ${baseImageStyles}
  background: ${ASSET_ICON.LOADING.BACKGROUND};
`;

export const AssetIcon: React.FC<AssetIconProps> = ({
  src,
  symbol,
  size = 36,
  withDropShadow = true
}) => {
  const [hasErrored, setHasErrored] = useState(false);

  // Reset errored state when src changes
  useEffect(() => setHasErrored(false), [src]);

  return (
    <>
      {hasErrored ? (
        <FallbackAssetImage size={size} withDropShadow={withDropShadow}>
          <Text bold color={ASSET_ICON.DEFAULT.COLOR}>
            {symbol?.slice(0, 3) ?? ""}
          </Text>
        </FallbackAssetImage>
      ) : (
        <AssetImage
          src={src}
          onError={() => setHasErrored(true)}
          width={size}
          height={size}
          size={size}
          withDropShadow={withDropShadow}
          alt={`${symbol} logo`}
        />
      )}
    </>
  );
};
