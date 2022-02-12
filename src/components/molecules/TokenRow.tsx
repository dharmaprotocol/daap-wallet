import { AssetIcon } from "src/components/atoms/AssetIcon";
import { Button } from "src/components/atoms/Button";
import { Spacing } from "src/components/atoms/Spacing";
import { Text } from "src/components/typography";
import { STYLES } from "src/constants";
import styled from "styled-components/macro";

const { SPACINGS } = STYLES;

interface PriceChangeProps {
  priceChange: string;
  priceChangeType: "+" | "-" | null;
}

const PriceChange: React.FC<PriceChangeProps> = ({
  priceChange,
  priceChangeType
}) => {
  if (!priceChange) {
    return null;
  }

  if (priceChangeType === "+") {
    return (
      <Text type="secondary" mono gain>
        {priceChange}
      </Text>
    );
  }

  if (priceChangeType === "-") {
    return (
      <Text type="secondary" mono loss>
        {priceChange}
      </Text>
    );
  }

  return (
    <Text type="secondary" mono>
      {priceChange}
    </Text>
  );
};

const TokenRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoAndImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  margin-right: ${SPACINGS.SMALL};
  flex-shrink: 0;
`;
const PriceData = styled.div`
  text-align: right;
`;

interface TokenRowProps {
  name: string;
  symbol: string;
  price: string;
  priceChange: string;
  priceChangeType: "+" | "-" | null;
  iconUrl: string;
  onClick: () => void;
}

export const TokenRow: React.FC<TokenRowProps> = ({
  name,
  symbol,
  price,
  priceChange,
  priceChangeType,
  iconUrl,
  onClick
}) => (
  <Button onClick={onClick} buttonType="unstyled" block data-testid="token-row">
    <Spacing $size="small">
      <TokenRowWrapper>
        <InfoAndImage>
          <IconWrapper>
            <AssetIcon src={iconUrl} symbol={symbol} />
          </IconWrapper>
          <Info>
            <Text
              size="smedium"
              css={`
                width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                white-space: nowrap;
              `}
              data-testid="token-row-name"
            >
              {name}
            </Text>
            <Text type="secondary" mono data-testid="token-row-symbol">
              {symbol}
            </Text>
          </Info>
        </InfoAndImage>
        <PriceData>
          <Text size="smedium" mono>
            {price}
          </Text>
          <PriceChange
            priceChange={priceChange}
            priceChangeType={priceChangeType}
          />
        </PriceData>
      </TokenRowWrapper>
    </Spacing>
  </Button>
);
