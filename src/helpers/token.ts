import { BigNumber } from "bignumber.js";
import { formatToUSD } from "src/helpers/currency";
import { TokenData, TokenDisplayData } from "src/types/token";

const getPriceChangeType = (priceChange: BigNumber) => {
  if (priceChange.isPositive()) {
    return "+";
  }

  if (priceChange.isNegative()) {
    return "-";
  }
  return null;
};

const getPriceChangeDisplay = (priceChange: BigNumber) => {
  if (priceChange.isNaN() || !priceChange.isFinite()) {
    return "";
  }

  return `${priceChange.gt(0) ? "+" : ""}${priceChange.toFixed(2)}%`;
};

export const getTokenDisplayData = (tokenData: TokenData): TokenDisplayData => {
  const { iconUrl, id, name, price, priceChange, symbol, verificationStatus } =
    tokenData;
  return {
    id,
    name,
    price: formatToUSD(price, 2),
    symbol,
    priceChange: getPriceChangeDisplay(priceChange),
    priceChangeType: getPriceChangeType(priceChange),
    iconUrl,
    verificationStatus
  };
};
