import { AssetIcon } from "src/components/atoms/AssetIcon";
import { Button, ButtonProps } from "src/components/atoms/Button";
import { Flex } from "src/components/atoms/Flex";
import { Icon } from "src/components/atoms/Icon";
import { Text } from "src/components/typography";
import { STYLES } from "src/constants";
import { TokenDisplayData } from "src/types/token";
import styled, {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
  css
} from "styled-components/macro";

// TODO -- move this to @/__generated__/modern/types once backend has a type defined
interface BankTokenDisplayData {
  institute: string;
  last4: string;
}

const { BUTTON, BOX_SHADOWS, CARD, LINEAR_GRADIENTS } = STYLES;

const ASSET_ICON_SIZE = 40;
const PADDING = 5;

const SELECT_TOKEN_WITH_TOKEN_STYLES = css`
  padding-left: ${PADDING}px;
  padding-top: ${PADDING}px;
  padding-bottom: ${PADDING}px;
  padding-right: ${BUTTON.SIZE_SMALL.PADDING};
  background: ${CARD.DEFAULT.BACKGROUND};
  color: ${props => props.theme.text.colors.normal};
  box-shadow: ${BOX_SHADOWS.GRAY};
  max-height: ${ASSET_ICON_SIZE + 10}px;
`;

const USD_BUTTON_STYLES = css`
  color: ${props => props.theme.button.primary.color};
  background: ${LINEAR_GRADIENTS.USD};
`;

const TokenLogoWrapper = styled.div<{ assetIconSize: number }>`
  margin-right: 5px;
  width: ${props => props.assetIconSize}px;
  height: ${props => props.assetIconSize}px;
`;

const DownCaretIconWrapper = styled.div`
  margin-left: 5px;
  display: inline-flex;
  align-items: center;
`;

interface StyledSelectATokenButtonProps {
  $withToken: boolean;
}

const StyledSelectATokenButton = styled(Button)<StyledSelectATokenButtonProps>`
  max-height: ${ASSET_ICON_SIZE + PADDING * 2}px;
  ${props => props.$withToken && SELECT_TOKEN_WITH_TOKEN_STYLES}
`;

interface SelectATokenManualOverride {
  logo: React.ReactNode;
  symbol: string;
}

interface BaseSelectATokenButtonProps extends ButtonProps {
  cssOverride?: string | FlattenInterpolation<ThemeProps<DefaultTheme>>;
  onClick?: () => void;
  children?: never;
  iconSize?: number;
  loading?: boolean;
}

type SelectATokenButtonProps =
  | ({
      tokenOverride?: never;
      token?: TokenDisplayData;
      bank?: never;
    } & BaseSelectATokenButtonProps)
  | ({
      tokenOverride?: SelectATokenManualOverride;
      token?: never;
      bank?: never;
    } & BaseSelectATokenButtonProps)
  | ({
      tokenOverride?: never;
      token?: never;
      bank?: BankTokenDisplayData;
    } & BaseSelectATokenButtonProps);

const DownCaretIcon: React.FC = () => (
  <DownCaretIconWrapper>
    <Icon name="downCaretIcon" width={16} height={8} />
  </DownCaretIconWrapper>
);

const bankToIconMap: { [index: string]: string } = {
  Chase: "/assets/images/banks/chase.png",
  "Bank of America": "/assets/images/banks/bankOfAmerica.png",
  "Wells Fargo": "/assets/images/banks/wellsFargo.png",
  Chime: "/assets/images/banks/chime.png",
  "Capital One": "/assets/images/banks/capitalOne.png",
  USAA: "/assets/images/banks/usaa.png",
  "Navy Federal Credit Union": "/assets/images/banks/navy.png",
  "Ally Bank": "/assets/images/banks/ally.png",
  "TD Bank": "/assets/images/banks/td.png",
  Citi: "/assets/images/banks/citi.png"
};
const fallbackBankAccountIcon = "/assets/images/banks/fallback.png";

const BankAccountInfoWrapper = styled(Flex)`
  margin-right: ${({ theme }) => theme.spacing.small};
`;
BankAccountInfoWrapper.defaultProps = {
  flexDirection: "column"
};

const getBankAccountIconFromInstitute = (institute: string) => {
  return bankToIconMap[institute] || fallbackBankAccountIcon;
};

export const SelectATokenButton: React.FC<SelectATokenButtonProps> = ({
  cssOverride,
  tokenOverride,
  token,
  onClick,
  iconSize,
  loading,
  bank,
  ...props
}) => {
  let logo;
  let symbol;
  const assetIconSize = iconSize ?? ASSET_ICON_SIZE;

  if (tokenOverride) {
    logo = tokenOverride.logo;
    symbol = tokenOverride.symbol;
  } else if (token) {
    const { iconUrl } = token;
    symbol = token.symbol;
    logo = (
      <AssetIcon
        src={iconUrl}
        symbol={symbol}
        size={assetIconSize}
        withDropShadow={false}
      />
    );
  } else if (bank) {
    symbol = (
      <BankAccountInfoWrapper>
        <Text size="smedium" bold>
          {bank.institute}
        </Text>
        <Text size="standard" type="secondary">
          {bank.last4}
        </Text>
      </BankAccountInfoWrapper>
    );
    logo = (
      <AssetIcon
        src={getBankAccountIconFromInstitute(bank.institute)}
        symbol={bank.institute}
        size={assetIconSize}
        withDropShadow={false}
      />
    );
  } else {
    return (
      <StyledSelectATokenButton
        loading={loading}
        buttonType="primary"
        size="small"
        onClick={onClick}
        $withToken={false}
        {...props}
      >
        Select a Token <DownCaretIcon />
      </StyledSelectATokenButton>
    );
  }
  return (
    <StyledSelectATokenButton
      buttonType="primary"
      size="small"
      css={cssOverride}
      $withToken={Boolean(logo && symbol)}
      onClick={onClick}
      {...props}
    >
      <TokenLogoWrapper assetIconSize={assetIconSize}>{logo}</TokenLogoWrapper>
      {symbol}
      {onClick && (
        <>
          {" "}
          <DownCaretIcon />
        </>
      )}
    </StyledSelectATokenButton>
  );
};

type USDButtonProps = Pick<SelectATokenButtonProps, "iconSize" | "children">;

export const USDButton: React.FC<USDButtonProps> = props => (
  <SelectATokenButton
    cssOverride={USD_BUTTON_STYLES}
    tokenOverride={{
      symbol: "USD",
      logo: (
        <Icon
          name="usdIcon"
          width={props.iconSize ?? ASSET_ICON_SIZE}
          height={props.iconSize ?? ASSET_ICON_SIZE}
        />
      )
    }}
    disabled
    {...props}
  />
);
