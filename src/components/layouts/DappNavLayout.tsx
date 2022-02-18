import { DAppProvider, useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { FiChevronRight } from "react-icons/fi";
import metamaskLogoWithBackground from "src/assets/images/wallets/metamask";
import metamaskLogo from "src/assets/images/wallets/metamask_no_background";
import { Background } from "src/components/atoms/Background";
import { Button } from "src/components/atoms/Button";
import { Card } from "src/components/atoms/Card";
import { CloseButton } from "src/components/atoms/CloseButton";
import { Image } from "src/components/atoms/Image";
import { CenteredModal } from "src/components/atoms/Modal";
import { NavMenuButton } from "src/components/atoms/NavMenuButton";
import { Spacing } from "src/components/atoms/Spacing";
import { Nav } from "src/components/molecules/Nav";
import { SwitchNetworkButton } from "src/components/molecules/SwitchNetworkButton";
import { Text, Title } from "src/components/typography";
import { middleTruncate } from "src/helpers/text";
import { useDappScreen } from "src/hooks/useDappScreen";
import { NavButtons } from "src/types/components";
import styled, { useTheme } from "styled-components/macro";

const { useGlobalState } = createGlobalState<{
  connectWalletModalOpen: boolean;
}>({
  connectWalletModalOpen: false
});

interface ConnectWalletButtonProps {
  iconUrl: string;
  title: string;
  text: string;
  onClick: () => void;
}

const WalletImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  iconUrl,
  onClick,
  title,
  text
}) => {
  const { text: textTheme } = useTheme();
  return (
    <Button block buttonType="unstyled" onClick={onClick}>
      <Card
        type="flat-no-button"
        css="width: 100%;box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.05);"
      >
        <Spacing
          $flexDirection="row"
          $alignItems="center"
          $size="small"
          $spaceChildrenSize="medium"
        >
          <WalletImage src={iconUrl} alt={title} />
          <Spacing $alignItems="flex-start">
            <Title level={4}>{title}</Title>
            <Text type="secondary">{text}</Text>
          </Spacing>
          <FiChevronRight size={42} color={textTheme.colors.secondary} />
        </Spacing>
      </Card>
    </Button>
  );
};

const Buttons: NavButtons = ({ breakpoint }) => {
  const [, setConnectWalletModalOpen] = useGlobalState(
    "connectWalletModalOpen"
  );
  const { account } = useEthers();
  const truncatedAddress = account && middleTruncate(account, 13);
  const buttonText = truncatedAddress ?? "Connect Wallet";
  const onClick = account ? () => null : () => setConnectWalletModalOpen(true);

  const buttonContent = truncatedAddress ? (
    <Spacing
      $flexDirection="row"
      $spaceChildrenSize="small"
      $alignItems={"center"}
    >
      <Image src={metamaskLogo} css="width: 32px; height: 32px;" />
      <SwitchNetworkButton disabled />
      <div>{buttonText}</div>
    </Spacing>
  ) : (
    <>{buttonText}</>
  );

  if (breakpoint === "mobile") {
    return (
      <NavMenuButton
        block
        buttonType={account ? "light" : "primary"}
        onClick={onClick}
      >
        {buttonContent}
      </NavMenuButton>
    );
  }

  return (
    <Button buttonType={account ? "light" : "primary"} onClick={onClick}>
      {buttonContent}
    </Button>
  );
};

const ConnectMetamaskButton: React.FC<{ onConnect: () => void }> = ({
  onConnect
}) => {
  const { account, activateBrowserWallet } = useEthers();
  const [, setScreen] = useDappScreen();

  useEffect(() => {
    if (account) {
      onConnect();
      setScreen("YOUR_WALLETS");
    }
  }, [account]);

  return (
    <ConnectWalletButton
      iconUrl={metamaskLogo}
      onClick={async () => {
        try {
          // @ts-ignore
          window.showEthereumAlertErrors = false;
          await activateBrowserWallet();
          // @ts-ignore
          window.showEthereumAlertErrors = true;
        } catch (e) {
          alert(e);
          // @ts-ignore
          window.showEthereumAlertErrors = true;
        }
      }}
      title="Metamask"
      text="Connect browser based wallet"
    />
  );
};

export const DappNavLayout: React.FC = ({ children }) => {
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useGlobalState(
    "connectWalletModalOpen"
  );
  const onCloseWalletModal = () => setConnectWalletModalOpen(false);

  // config={{ networks: [Mainnet, Polygon], pollingInterval: 20000 }}
  return (
    <DAppProvider
      config={{ pollingInterval: 20000 }}
    >
      <div className="container">
        <main>
          <Background css="display: flex; flex-direction: column;">
            <Spacing $size="medium">
              <Nav links={[]} Buttons={Buttons} />
            </Spacing>
            {children}
            <CenteredModal
              isOpen={connectWalletModalOpen}
              onRequestClose={onCloseWalletModal}
            >
              <Card>
                <Spacing
                  $size="medium"
                  $flexDirection="row"
                  $justifyContent="flex-end"
                  $borderedBottom
                >
                  <CloseButton onClose={onCloseWalletModal} />
                </Spacing>
                <Spacing
                  $size="medium"
                  $center
                  $textAlign="center"
                  $spaceChildrenSize="medium"
                >
                  <Image
                    css="width: 80px; height: 80px;"
                    src={metamaskLogoWithBackground}
                    alt="Ethereum Icon"
                  />
                  <Title>Connect your wallet</Title>
                  <Text type="secondary">
                    Connect the wallet you want to use to claim remaining funds
                    in your Dharma wallet.
                  </Text>
                  <ConnectMetamaskButton onConnect={onCloseWalletModal} />
                </Spacing>
              </Card>
            </CenteredModal>
          </Background>
        </main>
      </div>
    </DAppProvider>
  );
};
