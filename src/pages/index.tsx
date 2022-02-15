import { Wallet as EthersWallet } from "@ethersproject/wallet";
import {
  JsonRpcRequest,
  JsonRpcResponse,
  RequestArguments
} from "@json-rpc-tools/types";
import {
  ChainId,
  StoredTransaction,
  TransactionStatus,
  useEthers,
  useTransactions
} from "@usedapp/core";
import WalletConnectType from "@walletconnect/client";
import { ProviderRpcError } from "eip1193-provider";
import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useCopyToClipboard } from "react-use";
import { Abi as Abi721 } from "src/abis/ERC721";
import { Abi as Abi1155 } from "src/abis/ERC1155";
import { Button } from "src/components/atoms/Button";
import { Card } from "src/components/atoms/Card";
import { Flex } from "src/components/atoms/Flex";
import { Image } from "src/components/atoms/Image";
import { LinearGradient } from "src/components/atoms/LinearGradient";
import { Link } from "src/components/atoms/Link";
import { LoadingIndicator } from "src/components/atoms/LoadingIndicator";
import { CenteredModal } from "src/components/atoms/Modal";
import { NumericalInput } from "src/components/atoms/NumericalInput";
import { Spacing } from "src/components/atoms/Spacing";
import { DappNavLayout } from "src/components/layouts/DappNavLayout";
import { InputWithButton } from "src/components/molecules/InputWithButton";
import { Span, Text, Title } from "src/components/typography";
import { middleTruncate } from "src/helpers/text";
import {DharmaWalletClaimer, useClaimDSW } from "src/hooks/useClaimDSW";
import { useClaimedWallets } from "src/hooks/useClaimedWallets";
import { useDappScreen } from "src/hooks/useDappScreen";
import {
  ERC721,
  ERC1155,
  Token,
  useBaseTokenInfo,
  useImportTokens,
  useImportTokensERC721,
  useImportTokensERC1155,
  useImportedTokens,
  useImportedTokensERC721,
  useImportedTokensERC1155,
  useTokenInfo
} from "src/hooks/useImportTokens";
import { useIsDSWClaimed } from "src/hooks/useIsDSWClaimed";
import {
  useERC721Transfer,
  useERC1155Transfer,
  useTransfer
} from "src/hooks/useTransfer";
import { useWalletConnect } from "src/hooks/useWalletConnect";
import styled, {useTheme} from "styled-components/macro";

const DappCardWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 520px;
`;

const NumberWrapper = styled.div`
  background-color: ${props => props.theme.colors.accentedBackground};
  height: 50px;
  width: 50px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

interface NumberedStepProps {
  number: number;
  title: string;
  text: string;
}

const NumberedStep: React.FC<NumberedStepProps> = ({ number, title, text }) => (
  <Card type="flat-no-button" css="width: 100%">
    <Spacing
      $flexDirection="row"
      $alignItems="center"
      $size="small"
      $spaceChildrenSize="medium"
    >
      <NumberWrapper>
        <Title level={3} accented>
          {number}
        </Title>
      </NumberWrapper>
      <Spacing>
        <Title level={4}>{title}</Title>
        <Text type="secondary">{text}</Text>
      </Spacing>
    </Spacing>
  </Card>
);

const BLOCK_EXPLORERS_CONFIG = {
  [ChainId.Mainnet]: {
    blockExplorerName: "Etherscan",
    blockExplorerUrl: "https://etherscan.io"
  },
  [ChainId.Polygon]: {
    blockExplorerName: "Polygonscan",
    blockExplorerUrl: "https://polygonscan.com"
  }
};

const ViewOnBlockExplorerLink: React.FC<{
  hash: string;
  type: "tx" | "address";
}> = ({ hash, type }) => {
  const { chainId } = useEthers();
  const blockExplorerConfig =
    BLOCK_EXPLORERS_CONFIG[chainId as ChainId.Mainnet | ChainId.Polygon];
  return (
    <Link
      href={`${blockExplorerConfig?.blockExplorerUrl}/${type}/${hash}`}
      target="_blank"
    >
      View on {blockExplorerConfig?.blockExplorerName}
    </Link>
  );
};

const WhatYouWillNeedScreen: React.FC = () => (
  <DappCardWrapper>
    <Card css="display: flex; flex: 1; flex-direction: column;">
      <Spacing $size="medium" $borderedBottom $center>
        <Title level={4}>What you will need</Title>
      </Spacing>
      <Flex flexDirection={"column"} flex={1}>
        <Spacing $spaceChildrenSize="medium" $size="medium">
          <Spacing $flexDirection="row" $justifyContent="space-between">
            <div>
              <Title level={4}>A Metamask wallet</Title>
              <Text type="secondary">
                This experience is only accessible via desktop
              </Text>
            </div>
            <Link href="https://metamask.io/download/" target="_blank">
              <Button buttonType="secondary" size="small">
                Get Metamask
              </Button>
            </Link>
          </Spacing>
          <div>
            <Title level={4}>Hexidecimal Secret(s)</Title>
            <Text type="secondary">
              Delivered to the email address associated with your Dharma
              account(s).
            </Text>
          </div>
          <div>
            <Title level={4}>
              ETH and or MATIC to submit your transactions.
            </Title>
            <Link href="">Learn about network fees</Link>
          </div>
          <Spacing $spaceChildrenSize="medium">
            <NumberedStep
              number={1}
              title="Connect with Metamask"
              text="Connect your wallet and select Ethereum or Polygon network"
            />
            <NumberedStep
              number={2}
              title="Link your Dharma smart wallet to your Metamask address"
              text="Paste your secret sent to your email and submit a transaction"
            />
            <NumberedStep
              number={3}
              title="Transfer or interact with your funds on chain."
              text="Transactions will be submitted through your Metamask."
            />
          </Spacing>
        </Spacing>
      </Flex>
    </Card>
  </DappCardWrapper>
);

const RightArrow = () => {
  const theme = useTheme();
  return <FiArrowRight size={24} color={theme.text.colors.secondary} />;
};

interface YourWalletsScreenProps {
  onImport: (secret: DharmaWalletClaimer) => void;
  switchWallet: (address: string) => void;
}

const decodeWalletData = (dharmaSmartWalletPrivateKey: string): DharmaWalletClaimer => {
    const data = window.atob(dharmaSmartWalletPrivateKey);
    const object = JSON.parse(data);
    const wallet = new EthersWallet(object[0]);
    const walletClaimerData = object[1];
    if (!walletClaimerData.merkleProof) {
        throw "There isn't merkleProof present"
    }
    return {
      wallet,
      walletClaimerData,
    }
};

const YourWalletsScreen: React.FC<YourWalletsScreenProps> = ({
  onImport,
  switchWallet
}) => {
  const { account, chainId } = useEthers();
  const { getClaimedWallets, claimedWallets, loading } = useClaimedWallets();
  const [dharmaSmartWalletPrivateKey, setDharmaSmartWalletPrivateKey] =
    useState<string>("");
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (dharmaSmartWalletPrivateKey) {
      try {
        decodeWalletData(dharmaSmartWalletPrivateKey);
        setIsValid(true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        alert("We have an issue trying to decode your secret.");
        setIsValid(false);
      }
    }
  }, [dharmaSmartWalletPrivateKey]);

  useEffect(() => {
    getClaimedWallets().catch(alert);
  }, [account, chainId]);

  const existingWalletsCount = claimedWallets.length;

  return (
    <DappCardWrapper>
      <Spacing $spaceChildrenSize="medium">
        <Card
          type="default-no-button"
          css="display: flex; flex: 1; flex-direction: column;"
        >
          {loading ? (
            <Spacing $size="medium" $center>
              <LoadingIndicator />
            </Spacing>
          ) : (
            <>
              <Spacing $size="medium" $center>
                <Title level={4} secondary={existingWalletsCount === 0}>
                  You have claimed {existingWalletsCount} Dharma smart wallet
                  {existingWalletsCount !== 1 && "s"}
                </Title>
              </Spacing>
              {claimedWallets.map(address => (
                <Button
                  buttonType="unstyled"
                  block
                  key={address}
                  onClick={() => switchWallet(address)}
                >
                  <Spacing
                    $size="medium"
                    $center
                    $borderedTop
                    $flexDirection="row"
                    $justifyContent="space-between"
                    $alignItems="center"
                  >
                    <Title level={4}>{middleTruncate(address, 13)}</Title>
                    <RightArrow />
                  </Spacing>
                </Button>
              ))}
            </>
          )}
        </Card>
        <Card css="display: flex; flex: 1; flex-direction: column;">
          <Spacing $size="medium" $center $borderedBottom>
            <Title level={4}>Access your funds</Title>
          </Spacing>
          <Spacing $size="medium" $spaceChildrenSize="xxlarge">
            <Spacing $spaceChildrenSize="medium">
              <Text bold>
                To interact with your Dharma smart wallet, please paste the
                secret that was sent to the email address associated
                with your Dharma account.
              </Text>
              <Text type="secondary">
                This will link your Dharma wallet with your Metamask giving you
                access to your wallet and the tokens within.
              </Text>
              <InputWithButton
                placeholder="Secret (Hexadecimal String)"
                value={dharmaSmartWalletPrivateKey}
                onChange={e => setDharmaSmartWalletPrivateKey(e.target.value)}
                button={
                  <Button
                    buttonType="secondary"
                    size="tiny"
                    $rectangle
                    onClick={async () => {
                      const text = await navigator.clipboard.readText();
                      setDharmaSmartWalletPrivateKey(text);
                    }}
                  >
                    Paste
                  </Button>
                }
              />
            </Spacing>
            <Button
              buttonType="primary"
              block
              disabled={!isValid}
              onClick={() =>
                onImport(decodeWalletData(dharmaSmartWalletPrivateKey))
              }
            >
              Import secret
            </Button>
          </Spacing>
        </Card>
      </Spacing>
    </DappCardWrapper>
  );
};

interface FoundWalletScreenProps {
  foundWalletAddress: string;
  onClaim: () => void;
  state: TransactionStatus;
}

const FoundWalletScreen: React.FC<FoundWalletScreenProps> = ({
  foundWalletAddress,
  onClaim,
  state
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <DappCardWrapper>
      <Spacing $spaceChildrenSize="medium">
        <Card
          type="default-no-button"
          css="display: flex; flex: 1; flex-direction: column;"
        >
          <Spacing $size="medium" $center $borderedBottom>
            <Title level={4}>We found your wallet</Title>
          </Spacing>
          <Spacing $size="medium" $spaceChildrenSize="medium">
            <Text bold>
              You can now claim ownership of this Dharma Smart Wallet:{" "}
            </Text>
            <InputWithButton
              readOnly
              placeholder="Secret (Hexadecimal String)"
              value={foundWalletAddress}
              button={
                <Button
                  buttonType="primary"
                  size="small"
                  $rectangle
                  onClick={() => {
                    copyToClipboard(foundWalletAddress);
                  }}
                >
                  Copy
                </Button>
              }
            />
            <Text type="secondary">
              By clicking “Claim wallet” you will be asked to sign a message via
              Metamask which will give your Metamask control over the funds
              within.
            </Text>
            <Spacing $center $textAlign="center">
              {state?.status && state?.status !== "None" && (
                <Text>Status: {state.status}</Text>
              )}
              {state?.errorMessage && (
                <Text error>Error: {state.errorMessage}</Text>
              )}
            </Spacing>
            <Button
              buttonType="primary"
              block
              onClick={() => {
                onClaim();
              }}
            >
              Claim wallet
            </Button>
            <Spacing $center $textAlign="center">
              <ViewOnBlockExplorerLink
                hash={foundWalletAddress}
                type="address"
              />
            </Spacing>
          </Spacing>
        </Card>
      </Spacing>
    </DappCardWrapper>
  );
};

interface MissingTokensProps {
  onClick: () => void;
  title: string;
  secondaryTitle: string;
}

const MissingTokens: React.FC<MissingTokensProps> = ({
  title,
  secondaryTitle,
  onClick
}) => {
  return (
    <Button buttonType="unstyled" onClick={onClick} block>
      <Spacing
        $size="medium"
        $flexDirection="row"
        $alignItems="center"
        $borderedBottom
        $spaceChildrenSize="small"
      >
        <Spacing
          $size="medium"
          $justifyContent="center"
          $alignItems="center"
          css="border: 2px dashed rgba(0, 0, 0, 0.3); border-radius: 100px; width: 40px; height: 40px;"
        >
          <Title secondary level={3}>
            ?
          </Title>
        </Spacing>
        <Spacing $horizontalSize="small" $alignItems={"flex-start"}>
          <Title level={4}>{title}</Title>
          <Text type="secondary">{secondaryTitle}</Text>
        </Spacing>
        <RightArrow />
      </Spacing>
    </Button>
  );
};

interface WalletConnectProps {
  onClick: () => void;
  connector: WalletConnectType | undefined;
  disconnect: () => void;
  connected: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  connected,
  onClick,
  disconnect,
  connector
}) => {
  if (connected && connector) {
    return (
      <Spacing
        $size="medium"
        $flexDirection="row"
        $alignItems="center"
        $justifyContent="flex-start"
        $spaceChildrenSize="small"
      >
        <Image
          src={"/assets/images/wallets/wallet_connect.png"}
          css="width: 40px; height: 40px"
        />
        <Spacing $horizontalSize="small" $alignItems={"flex-start"}>
          <Title level={4}>
            Connected to {connector.peerMeta?.name || "-Name Unavailable-"}
          </Title>
          <Text type="secondary">
            {connector.peerMeta?.url || "-Url Unavailable-"}
          </Text>
        </Spacing>
        <Button
          buttonType="secondary"
          size="small"
          $rectangle
          onClick={disconnect}
        >
          Disconnect
        </Button>
      </Spacing>
    );
  }
  return (
    <Button buttonType="unstyled" onClick={onClick} block>
      <Spacing
        $size="medium"
        $flexDirection="row"
        $alignItems="center"
        $justifyContent="flex-start"
        $spaceChildrenSize="small"
      >
        <Image
          src={"/assets/images/wallets/wallet_connect.png"}
          css="width: 40px; height: 40px"
        />
        <Spacing $horizontalSize="small" $alignItems={"flex-start"}>
          <Title level={4}>WalletConnect</Title>
          <Text type="secondary">Connect to any Dapp</Text>
        </Spacing>
        <RightArrow />
      </Spacing>
    </Button>
  );
};

interface WalletAddressProps {
  walletAddress: string;
}

const WalletAddress: React.FC<WalletAddressProps> = ({ walletAddress }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  return (
    <Card type="default-no-button" css="display: flex; flex-direction: column;">
      <Spacing $size="medium" $center $borderedBottom>
        <Title level={4}>
          You have claimed control of your Dharma Smart Wallet.
        </Title>
      </Spacing>
      <Spacing $size="medium" $spaceChildrenSize="medium">
        <Text type="secondary">
          Your connected Metamask wallet{" "}
          <Span default bold>
            {middleTruncate(walletAddress, 14)}
          </Span>{" "}
          now controls funds in your Dharma Smart Wallet. You can transfer
          tokens and connect to dapps.
        </Text>
        <InputWithButton
          readOnly
          value={walletAddress}
          button={
            <Button
              buttonType="primary"
              size="small"
              $rectangle
              onClick={() => {
                copyToClipboard(walletAddress);
              }}
            >
              Copy
            </Button>
          }
        />
        <Spacing $center $textAlign="center">
          <ViewOnBlockExplorerLink hash={walletAddress} type="address" />
        </Spacing>
      </Spacing>
    </Card>
  );
};

interface WalletTokenProps {
  token: Token;
  onClick: (token: Token) => void;
  onUnimport: (address: string) => void;
  noUnimport: boolean;
}

const WalletToken: React.FC<WalletTokenProps> = ({
  onClick,
  token,
  onUnimport,
  noUnimport
}) => {
  return (
    <Spacing $size="medium" css="flex-direction: row; align-items: center;">
      <Spacing $horizontalSize="small">
        <Title level={4}>{token.name}</Title>
        <Text mono>
          {token.balance
            ? token.decimals
              ? ethers.utils.formatUnits(token.balance, token.decimals)
              : token.balance
            : "..."}{" "}
          {token.symbol}
        </Text>
      </Spacing>
      <div>
        <Button
          buttonType="primary"
          size="small"
          $rectangle
          onClick={() => onClick(token)}
        >
          Transfer
        </Button>
      </div>
      {!noUnimport && (
        <div style={{ marginLeft: 10 }}>
          <Button
            buttonType="secondary"
            size="small"
            $rectangle
            onClick={() => onUnimport(token.address || "")}
          >
            Remove
          </Button>
        </div>
      )}
    </Spacing>
  );
};

interface ImportTokenModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  walletAddress: string;
}

const ImportTokenERC20Modal: React.FC<ImportTokenModalProps> = ({
  isOpen,
  onRequestClose,
  walletAddress
}) => {
  const [address, setAddress] = useState<string>("");

  const { importToken, loading } = useImportTokens(walletAddress);

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Import tokens ERC20</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text>
            Please locate the token you are trying to import and supply its
            contract address.
          </Text>
          <Text type="secondary">Token Contract Address</Text>
          <InputWithButton
            value={address}
            onChange={e => setAddress(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setAddress(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={async () => {
              if (await importToken(address)) {
                onRequestClose();
              }
            }}
          >
            Add Custom Token
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

const ImportTokenERC721Modal: React.FC<ImportTokenModalProps> = ({
  isOpen,
  onRequestClose,
  walletAddress
}) => {
  const [address, setAddress] = useState<string>("");
  const [id, setId] = useState<string>("");

  const { importToken, loading } = useImportTokensERC721(walletAddress);

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Import tokens 721</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text>
            Please locate the token you are trying to import and supply its
            contract address and id.
          </Text>
          <Text type="secondary">Token Contract Address</Text>
          <InputWithButton
            value={address}
            onChange={e => setAddress(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setAddress(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Text type="secondary">Token ID</Text>
          <InputWithButton
            value={id}
            onChange={e => setId(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setId(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={async () => {
              if (await importToken({ contract: address, id })) {
                onRequestClose();
              }
            }}
          >
            Add Custom Token
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

const ImportTokenERC1155Modal: React.FC<ImportTokenModalProps> = ({
  isOpen,
  onRequestClose,
  walletAddress
}) => {
  const [address, setAddress] = useState<string>("");
  const [id, setId] = useState<string>("");

  const { importToken, loading } = useImportTokensERC1155(walletAddress);

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Import tokens ERC1155</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text>
            Please locate the token you are trying to import and supply its
            contract address and id.
          </Text>
          <Text type="secondary">Token Contract Address</Text>
          <InputWithButton
            value={address}
            onChange={e => setAddress(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setAddress(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Text type="secondary">Token ID</Text>
          <InputWithButton
            value={id}
            onChange={e => setId(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setId(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={async () => {
              if (await importToken({ contract: address, id })) {
                onRequestClose();
              }
            }}
          >
            Add Custom Token
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

interface WalletConnectModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  connect: (uri: string) => Promise<boolean>;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  connect,
  isOpen,
  onRequestClose
}) => {
  const [uri, setUri] = useState<string>("");

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>WalletConnect</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text>How to connect to a Dapp.</Text>
          <Text type="secondary">
            1. Open a Dapp with WalletConnect support.
            <br />
            2. Select WalletConnect when prompted to connect a wallet.
            <br />
            3. A modal will popup with a QR code. Click the link that says
            &quot;Copy to clipboard&quot;
            <br />
            4. Click the &quot;Paste&quot; button in the text field below, and
            click the &quot;Connect&quot; button.
            <br />
            5. WalletConnect connection will be established automatically.
            <br />
            6. Now you can trigger transactions via the Dapp.
            <br />
          </Text>
          <InputWithButton
            placeholder="Paste WalletConnect URI"
            value={uri}
            onChange={e => setUri(e.target.value)}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setUri(text);
                }}
              >
                Paste
              </Button>
            }
          />
          <Button
            buttonType="primary"
            disabled={!uri}
            block
            onClick={async () => {
              const valid = await connect(uri);
              if (valid) {
                onRequestClose();
              }
            }}
          >
            Connect
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

interface Transfer1155ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  erc1155: ERC1155 | null;
  smartWalletAddress: string;
}

const Transfer1155Modal: React.FC<Transfer1155ModalProps> = ({
  erc1155,
  isOpen,
  onRequestClose,
  smartWalletAddress
}) => {
  const theme = useTheme();
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { loading, transfer } = useERC1155Transfer(
    smartWalletAddress,
    address,
    erc1155,
    amount
  );

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Transfer ERC1155</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text css="word-break: break-all;">
            Item contract
            <br />
            <Span style={{ color: theme.text.colors.secondary }}>
              {erc1155?.contract}
            </Span>
          </Text>
          <Text css="word-break: break-all;">
            Item id
            <br />
            <Span style={{ color: theme.text.colors.secondary }}>
              {erc1155?.id}
            </Span>
          </Text>
          <Spacing $flexDirection="row" $alignItems="center" $borderedBottom>
            <Text>Number of items</Text>
            <NumericalInput
              prefix=""
              placeholder="0.00"
              value={amount ? `${amount}` : ""}
              onChange={value => {
                setAmount(value);
              }}
            />
          </Spacing>
          <Spacing>
            <Text type="secondary">Destination address</Text>
            <InputWithButton
              value={address}
              onChange={e => setAddress(e.target.value)}
              button={
                <Button
                  buttonType="primary"
                  size="small"
                  $rectangle
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setAddress(text);
                  }}
                >
                  Paste
                </Button>
              }
            />
          </Spacing>
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={() => {
              transfer().catch(alert);
              onRequestClose();
            }}
          >
            Transfer
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

interface Transfer721ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  erc721: ERC721 | null;
  smartWalletAddress: string;
}

const Transfer721Modal: React.FC<Transfer721ModalProps> = ({
  erc721,
  isOpen,
  onRequestClose,
  smartWalletAddress
}) => {
  const theme = useTheme();
  const [address, setAddress] = useState<string>("");

  const { loading, transfer } = useERC721Transfer(
    smartWalletAddress,
    address,
    erc721
  );

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Transfer ERC721</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Text>
            Item contract
            <br />
            <Span style={{ color: theme.text.colors.secondary }}>
              {erc721?.contract}
            </Span>
          </Text>
          <Text>
            Item id
            <br />
            <Span style={{ color: theme.text.colors.secondary }}>
              {erc721?.id}
            </Span>
          </Text>
          <Spacing>
            <Text type="secondary">Destination address</Text>
            <InputWithButton
              value={address}
              onChange={e => setAddress(e.target.value)}
              button={
                <Button
                  buttonType="primary"
                  size="small"
                  $rectangle
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setAddress(text);
                  }}
                >
                  Paste
                </Button>
              }
            />
          </Spacing>
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={() => {
              transfer().catch(alert);
              onRequestClose();
            }}
          >
            Transfer
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

interface TransferModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  token: Token | null;
  smartWalletAddress: string;
}

const TransferModal: React.FC<TransferModalProps> = ({
  token,
  isOpen,
  onRequestClose,
  smartWalletAddress
}) => {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { loading, transfer } = useTransfer(
    smartWalletAddress,
    amount,
    address,
    token
  );

  return (
    <CenteredModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Card
        type="default-no-button"
        css="display: flex; flex-direction: column;width: 375px;"
      >
        <Spacing $size="medium" $center $borderedBottom>
          <Title level={4}>Transfer</Title>
        </Spacing>
        <Spacing $size="medium" $spaceChildrenSize="medium">
          <Spacing $flexDirection="row" $alignItems="center" $borderedBottom>
            <Text>{token?.symbol}</Text>
            <NumericalInput
              prefix=""
              placeholder="0.00"
              value={amount ? `${amount}` : ""}
              onChange={value => {
                setAmount(value);
              }}
            />
          </Spacing>
          <Spacing>
            <Text type="secondary">Destination address</Text>
            <InputWithButton
              value={address}
              onChange={e => setAddress(e.target.value)}
              button={
                <Button
                  buttonType="primary"
                  size="small"
                  $rectangle
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setAddress(text);
                  }}
                >
                  Paste
                </Button>
              }
            />
          </Spacing>
          <Button
            buttonType="primary"
            disabled={!address || loading}
            block
            onClick={() => {
              transfer().catch(alert);
              onRequestClose();
            }}
          >
            Transfer
          </Button>
        </Spacing>
      </Card>
    </CenteredModal>
  );
};

interface WalletScreenProps {
  walletAddress: string;
  viewAllWallets: () => void;
}

interface WalletsListProps {
  onClick: (token: Token) => void;
  walletAddress: string;
  onUnimport: (address: string) => void;
}

const WalletsList: React.FC<WalletsListProps> = ({
  onClick,
  onUnimport,
  walletAddress
}) => {
  const baseTokenBalance = useBaseTokenInfo(walletAddress);
  const [addresses] = useImportedTokens(walletAddress);
  return (
    <Card type="default-no-button" css="display: flex; flex-direction: column;">
      <Spacing $alignItems={"center"} css="margin-top: 15px">
        <Title level={4}>Tokens</Title>
      </Spacing>
      <WalletToken
        key={"ethereum-matic"}
        token={baseTokenBalance}
        onClick={() => onClick(baseTokenBalance)}
        onUnimport={onUnimport}
        noUnimport
      />
      {addresses.map(address => {
        return (
          <WalletTokenElement
            key={address}
            address={address}
            onClick={onClick}
            walletAddress={walletAddress}
            onUnimport={onUnimport}
          />
        );
      })}
    </Card>
  );
};

interface WalletTokenERC1155ElementProps {
  erc1155: ERC1155;
  onClick: (token: ERC1155) => void;
  walletAddress: string;
  onUnimport: (token: ERC1155) => void;
}

const WalletTokenERC1155Element: React.FC<WalletTokenERC1155ElementProps> = ({
  walletAddress,
  erc1155,
  onClick,
  onUnimport
}) => {
  const { library } = useEthers();
  const contract = new ethers.Contract(
    erc1155.contract,
    Abi1155,
    library?.getSigner()
  );
  const [metadata, setMetadata] = useState<any | null>();
  const [balance, setBalance] = useState<string>("0");

  const [metadataError, setMetadataError] = useState("");
  const [balanceError, setBalanceError] = useState("");

  useEffect(() => {
    const fun = async () => {
      if (!window.fetch) {
        alert("Please use a browser that supports window.fetch");
      } else {
        try {
          const balance = await contract.balanceOf(walletAddress, erc1155.id);
          setBalance(balance.toString());
          setBalanceError("");
        } catch (e) {
          alert(e);
          setBalanceError(JSON.stringify(e));
        }
        try {
          const uri = await contract.uri(erc1155.id);
          // @ts-ignore
          const abiCoder = new ethers.utils.AbiCoder(Abi1155);
          const uint256Id = abiCoder.encode(["uint256"], [erc1155.id]);
          const uriReal1 = uri.replace("0x{id}", uint256Id);
          const uriReal2 = uriReal1.replace("{id}", uint256Id);
          await window.fetch(uriReal2).then(async response => {
            const json = await response.json();
            setMetadata(json);
            setMetadataError("");
          });
        } catch (e) {
          alert(e);
          setMetadataError(JSON.stringify(e));
        }
      }
    };
    fun().catch(alert);
  }, []);

  const [, copyToClipboard] = useCopyToClipboard();

  const theme = useTheme();

  return (
    <>
      <Spacing $size="medium" css="align-items: center;">
        {balanceError && <Text error>{balanceError}</Text>}
        {metadataError && <Text error>{metadataError}</Text>}
        {metadata?.name && <Title level={4}>{metadata?.name}</Title>}
        {metadata?.description && (
          <Text type="secondary">{metadata?.description}</Text>
        )}
        {erc1155 && (
          <Text type="secondary" css="word-break: break-all;">
            {erc1155.id}
          </Text>
        )}
      </Spacing>
      <Spacing $size="medium" css="align-items: center;">
        {metadata?.image && (
          <Image style={{ height: 200, width: 200 }} src={metadata?.image} />
        )}
        {metadata?.animation_url?.includes?.(".mp3") && (
          <audio
            controls
            controlsList="nodownload"
            preload="none"
            src={metadata?.animation_url}
          />
        )}
        {balance && <Text css="margin-top: 5px;">Balance: {balance}</Text>}
      </Spacing>
      {!!metadata && (
        <Spacing $horizontalSize="medium" css="align-items: center;">
          <Spacing css="align-items: center;">
            <Text type="secondary">Metadata</Text>
          </Spacing>
          <InputWithButton
            css={`
              color: ${theme.text.colors.secondary};
            `}
            readOnly
            value={`${JSON.stringify(metadata).slice(0, 14)}...`}
            button={
              <Button
                buttonType="primary"
                size="small"
                $rectangle
                onClick={() => {
                  copyToClipboard(JSON.stringify(metadata));
                }}
              >
                Copy
              </Button>
            }
          />
        </Spacing>
      )}
      <Spacing
        $size="medium"
        css="flex-direction: row; align-items: center;justify-content: center;"
      >
        <Spacing css="align-items: flex-end; margin-right: 10px">
          <Button
            buttonType="primary"
            size="small"
            $rectangle
            onClick={() => onClick(erc1155)}
          >
            Transfer
          </Button>
        </Spacing>
        <Spacing>
          <Button
            buttonType="secondary"
            size="small"
            $rectangle
            onClick={() => onUnimport(erc1155)}
          >
            Remove
          </Button>
        </Spacing>
      </Spacing>
    </>
  );
};

interface WalletsListERC1155Props {
  onClick: (erc1155: ERC1155) => void;
  onUnimport: (erc1155: ERC1155) => void;
  walletAddress: string;
}

const WalletsListERC1155: React.FC<WalletsListERC1155Props> = ({
  onClick,
  onUnimport,
  walletAddress
}) => {
  const [erc1155s] = useImportedTokensERC1155(walletAddress);
  return (
    <Card type="default-no-button" css="display: flex; flex-direction: column;">
      <Spacing $alignItems={"center"} css="margin-top: 15px">
        <Title level={4}>Tokens ERC1155</Title>
      </Spacing>
      {erc1155s?.length === 0 && (
        <Spacing
          $alignItems={"center"}
          css="margin-top: 5px;margin-bottom: 15px;"
        >
          <Text>- Empty -</Text>
        </Spacing>
      )}
      {erc1155s.map((erc1155, index) => {
        return (
          <>
            {index !== 0 && (
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F5F5F5"
                }}
              />
            )}
            <WalletTokenERC1155Element
              key={`${erc1155.contract}-${erc1155.id}`}
              erc1155={erc1155}
              onClick={onClick}
              walletAddress={walletAddress}
              onUnimport={onUnimport}
            />
          </>
        );
      })}
    </Card>
  );
};

interface WalletsListERC721Props {
  onClick: (erc721: ERC721) => void;
  onUnimport: (erc721: ERC721) => void;
  walletAddress: string;
}

const WalletsListERC721: React.FC<WalletsListERC721Props> = ({
  onClick,
  onUnimport,
  walletAddress
}) => {
  const [erc721s] = useImportedTokensERC721(walletAddress);
  return (
    <Card type="default-no-button" css="display: flex; flex-direction: column;">
      <Spacing $alignItems={"center"} css="margin-top: 15px">
        <Title level={4}>Tokens ERC721</Title>
      </Spacing>
      {erc721s?.length === 0 && (
        <Spacing
          $alignItems={"center"}
          css="margin-top: 5px;margin-bottom: 15px;"
        >
          <Text>- Empty -</Text>
        </Spacing>
      )}
      {erc721s.map((erc721, index) => {
        return (
          <>
            {index !== 0 && (
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#F5F5F5"
                }}
              />
            )}
            <WalletTokenERC721Element
              key={`${erc721.contract}-${erc721.id}`}
              erc721={erc721}
              onClick={onClick}
              walletAddress={walletAddress}
              onUnimport={onUnimport}
            />
          </>
        );
      })}
    </Card>
  );
};

interface WalletTokenERC721ElementProps {
  erc721: ERC721;
  onClick: (token: ERC721) => void;
  walletAddress: string;
  onUnimport: (token: ERC721) => void;
}

const WalletTokenERC721Element: React.FC<WalletTokenERC721ElementProps> = ({
  onUnimport,
  onClick,
  walletAddress,
  erc721
}) => {
  const { library } = useEthers();
  const contract = new ethers.Contract(
    erc721.contract,
    Abi721,
    library?.getSigner()
  );
  const [metadata, setMetadata] = useState<any | null>();
  const [metadataError, setMetadataError] = useState("");

  const [isOwner, setOwnser] = useState<boolean | null>();
  const [isOwnerError, setIsOwnerError] = useState("");

  useEffect(() => {
    const fun = async () => {
      if (walletAddress) {
        if (!window.fetch) {
          alert("Please use a browser that supports window.fetch");
        } else {
          try {
            const owner = await contract.ownerOf(erc721.id);
            setOwnser(walletAddress === owner);
          } catch (e) {
            alert(e);
            setIsOwnerError(JSON.stringify(e));
          }
          try {
            const uri = await contract.tokenURI(erc721.id);
            // @ts-ignore
            const abiCoder = new ethers.utils.AbiCoder(Abi721);
            const uint256Id = abiCoder.encode(["uint256"], [erc721.id]);
            const uriReal1 = uri.replace("0x{id}", uint256Id);
            const uriReal2 = uriReal1.replace("{id}", erc721.id);
            await window.fetch(uriReal2).then(async response => {
              const json = await response.json();
              setMetadata(json);
              setMetadataError("");
            });
          } catch (e) {
            alert(e);
            setMetadataError(JSON.stringify(e));
          }
        }
      }
    };
    fun().catch(alert);
  }, [walletAddress]);

  const [, copyToClipboard] = useCopyToClipboard();
  const theme = useTheme();

  return (
    <>
      <Spacing $size="medium" css="align-items: center;">
        {metadataError && <Text error>{metadataError}</Text>}
        {isOwnerError && <Text error>{isOwnerError}</Text>}
        {metadata?.name && <Title level={4}>{metadata?.name}</Title>}
        {metadata?.description && (
          <Text type="secondary">{metadata?.description}</Text>
        )}
        {erc721 && (
          <Text type="secondary" css="word-break: break-all;">
            {erc721.id}
          </Text>
        )}
        {(metadata?.image || metadata?.image_url) && (
          <Image
            style={{ height: 200, width: 200 }}
            src={metadata?.image || metadata?.image_url}
          />
        )}
        {isOwner !== null && (
          <Text css="margin-top: 5px;">Owner: {isOwner ? "Yes" : "No"}</Text>
        )}
      </Spacing>
      {!!metadata && (
        <Spacing $horizontalSize="medium" css="align-items: center;">
          <Spacing css="align-items: center;">
            <Text type="secondary">Metadata</Text>
          </Spacing>
          <InputWithButton
            css={`
              color: ${theme.text.colors.secondary};
            `}
            readOnly
            value={`${JSON.stringify(metadata).slice(0, 14)}...`}
            button={
              <Button
                buttonType="secondary"
                size="tiny"
                $rectangle
                onClick={() => {
                  copyToClipboard(JSON.stringify(metadata));
                }}
              >
                Copy
              </Button>
            }
          />
        </Spacing>
      )}
      <Spacing
        $size="medium"
        css="flex-direction: row; align-items: center;justify-content: center;"
      >
        <Spacing css="align-items: flex-end; margin-right: 10px">
          <Button
            buttonType="primary"
            size="small"
            $rectangle
            onClick={() => onClick(erc721)}
          >
            Transfer
          </Button>
        </Spacing>
        <Spacing>
          <Button
            buttonType="secondary"
            size="small"
            $rectangle
            onClick={() => onUnimport(erc721)}
          >
            Remove
          </Button>
        </Spacing>
      </Spacing>
    </>
  );
};

interface WalletTokenElementProps {
  onClick: (token: Token) => void;
  address: string;
  walletAddress: string;
  onUnimport: (address: string) => void;
}

const WalletTokenLoading: React.FC<{
  address: string;
  onUnimport: (address: string) => void;
}> = ({ onUnimport, address }) => {
  return (
    <Spacing $size="medium" css="flex-direction: row; align-items: center;">
      <Spacing $horizontalSize="small">
        <Title level={4}>Loading token...</Title>
        <Text type="secondary" mono>
          {address}
        </Text>
      </Spacing>
      <Button
        buttonType="secondary"
        size="small"
        $rectangle
        onClick={() => onUnimport(address)}
      >
        Remove
      </Button>
    </Spacing>
  );
};

const WalletTokenElement: React.FC<WalletTokenElementProps> = ({
  address,
  onClick,
  walletAddress,
  onUnimport
}) => {
  const token = useTokenInfo(address, walletAddress);

  if (token) {
    return (
      <WalletToken
        token={token}
        onClick={() => onClick(token)}
        onUnimport={onUnimport}
        noUnimport={false}
      />
    );
  } else {
    return <WalletTokenLoading address={address} onUnimport={onUnimport} />;
  }
};

const Transaction: React.FC<{ transaction: StoredTransaction }> = ({
  transaction
}) => {
  return (
    <Spacing $size="medium" css="flex-direction: row; align-items: center;">
      <Spacing $horizontalSize="small">
        <Text>
          {transaction.transactionName || "- No tranction detail available -"}
        </Text>
        <Spacing $flexDirection="row" $spaceChildrenSize="medium">
          {!transaction.receipt ? (
            <LoadingIndicator />
          ) : (
            <Text
              error={transaction.receipt?.status === 0}
              accented={transaction.receipt?.status === 1}
            >
              {transaction.receipt?.status === 0 ? "Fail" : "Success"}
            </Text>
          )}
          <ViewOnBlockExplorerLink
            hash={transaction.transaction.hash}
            type="tx"
          />
        </Spacing>
      </Spacing>
    </Spacing>
  );
};

const TransactionList: React.FC = () => {
  const { transactions } = useTransactions();
  return (
    <Card type="default-no-button" css="display: flex; flex-direction: column;">
      {transactions?.map(transaction => {
        return (
          <>
            <Transaction
              key={transaction.submittedAt}
              transaction={transaction}
            />
          </>
        );
      })}
    </Card>
  );
};

const WalletScreen: React.FC<WalletScreenProps> = ({
  walletAddress,
  viewAllWallets
}) => {
  const [isWalletConnectOpen, setIsWalletConnectOpen] =
    useState<boolean>(false);
  const [isImportTokensERC20Open, setIsImportTokensERC20Open] =
    useState<boolean>(false);
  const [isImportTokensERC721Open, setIsImportTokensERC721Open] =
    useState<boolean>(false);
  const [isImportTokensERC1155Open, setIsImportTokensERC1155Open] =
    useState<boolean>(false);
  const [transferModalState, setTransferModalState] = useState<{
    isOpen: boolean;
    token: Token | null;
  }>({
    isOpen: false,
    token: null
  });
  const [transfer721ModalState, setTransfer721ModalState] = useState<{
    isOpen: boolean;
    erc721: ERC721 | null;
  }>({
    isOpen: false,
    erc721: null
  });
  const [transfer1155ModalState, setTransfer1155ModalState] = useState<{
    isOpen: boolean;
    erc1155: ERC1155 | null;
  }>({
    isOpen: false,
    erc1155: null
  });

  const { unimportToken: unimportToken20 } = useImportTokens(walletAddress);
  const { unimportToken: unimportToken1155 } =
    useImportTokensERC1155(walletAddress);
  const { unimportToken: unimportToken721 } =
    useImportTokensERC721(walletAddress);

  const { connect, disconnect, connector, connected } =
    useWalletConnect(walletAddress);

  return (
    <>
      <DappCardWrapper>
        <Spacing $spaceChildrenSize="medium" css="padding-bottom: 40px">
          <WalletAddress walletAddress={walletAddress} />
          <Card
            type="default-no-button"
            css="display: flex; flex-direction: column;"
          >
            <MissingTokens
              title="Missing Tokens (ERC20)?"
              secondaryTitle="Import the contract address of the token you want to add."
              onClick={() => setIsImportTokensERC20Open(true)}
            />
            <MissingTokens
              title="Missing NFTs (ERC721)?"
              secondaryTitle="Import the contract address of the token you want to add."
              onClick={() => setIsImportTokensERC721Open(true)}
            />
            <MissingTokens
              title="Missing Multi Tokens (ERC1155)?"
              secondaryTitle="Import the contract address of the token you want to add."
              onClick={() => setIsImportTokensERC1155Open(true)}
            />
            <WalletConnect
              connected={connected}
              connector={connector}
              disconnect={disconnect}
              onClick={() => setIsWalletConnectOpen(true)}
            />
          </Card>
          <WalletsList
            walletAddress={walletAddress}
            onClick={token => setTransferModalState({ isOpen: true, token })}
            onUnimport={address => unimportToken20(address)}
          />
          <WalletsListERC1155
            walletAddress={walletAddress}
            onClick={erc1155 =>
              setTransfer1155ModalState({ isOpen: true, erc1155 })
            }
            onUnimport={erc1155 => unimportToken1155(erc1155)}
          />
          <WalletsListERC721
            walletAddress={walletAddress}
            onClick={erc721 =>
              setTransfer721ModalState({ isOpen: true, erc721 })
            }
            onUnimport={erc721 => unimportToken721(erc721)}
          />
          <TransactionList />
          <WalletConnectModal
            connect={connect}
            isOpen={isWalletConnectOpen}
            onRequestClose={() => setIsWalletConnectOpen(false)}
          />
          <ImportTokenERC20Modal
            isOpen={isImportTokensERC20Open}
            onRequestClose={() => setIsImportTokensERC20Open(false)}
            walletAddress={walletAddress}
          />
          <ImportTokenERC721Modal
            isOpen={isImportTokensERC721Open}
            onRequestClose={() => setIsImportTokensERC721Open(false)}
            walletAddress={walletAddress}
          />
          <ImportTokenERC1155Modal
            isOpen={isImportTokensERC1155Open}
            onRequestClose={() => setIsImportTokensERC1155Open(false)}
            walletAddress={walletAddress}
          />
          <TransferModal
            smartWalletAddress={walletAddress}
            token={transferModalState.token}
            isOpen={transferModalState.isOpen}
            onRequestClose={() =>
              setTransferModalState({ isOpen: false, token: null })
            }
          />
          <Transfer721Modal
            smartWalletAddress={walletAddress}
            erc721={transfer721ModalState.erc721}
            isOpen={transfer721ModalState.isOpen}
            onRequestClose={() =>
              setTransfer721ModalState({ isOpen: false, erc721: null })
            }
          />
          <Transfer1155Modal
            smartWalletAddress={walletAddress}
            erc1155={transfer1155ModalState.erc1155}
            isOpen={transfer1155ModalState.isOpen}
            onRequestClose={() =>
              setTransfer1155ModalState({ isOpen: false, erc1155: null })
            }
          />
        </Spacing>
      </DappCardWrapper>
      <Button
        buttonType="secondary"
        block
        size="small"
        onClick={() => viewAllWallets()}
        css="position: absolute; right: 15px; width: 200px;"
      >
        Switch Dharma smart wallet
      </Button>
    </>
  );
};

type JsonRpcCallback = (error: Error, response: JsonRpcResponse) => unknown;

export const Wallet = (): JSX.Element => {
  const ethereumSetup = useRef(false);
  useEffect(() => {
    // @ts-ignore
    const ethereum = window.ethereum;
    if (!ethereumSetup.current && ethereum) {
      ethereumSetup.current = true;
      try {
        // @ts-ignore
        window.showEthereumAlertErrors = true;
        const errorLog = (
          e: ProviderRpcError | any,
          payload: RequestArguments | string | JsonRpcRequest
        ) => {
          // @ts-ignore
          if (window.showEthereumAlertErrors) {
            if (e?.message || e?.data || payload) {
              alert(
                `Metamask error ${e?.message ? ` -- ${e?.message}` : ""}${
                  e?.data ? ` -- ${JSON.stringify(e?.data)}` : ""
                } -- payload: ${JSON.stringify(payload)}`
              );
              // eslint-disable-next-line no-console
              console.log({
                error: e,
                payload
              });
            } else {
              alert("There was an issue calling Metamask");
            }
          }
          throw e;
        };

        // @ts-ignore
        const request = ethereum.request;
        ethereum.request = async (
          payload: RequestArguments
        ): Promise<unknown> => {
          try {
            return await request(payload);
          } catch (e) {
            errorLog(e, payload);
          }
        };

        // @ts-ignore
        const send = ethereum.send;
        ethereum.send = (
          payload: string | JsonRpcRequest,
          callback: Array<unknown> | JsonRpcCallback
        ) => {
          try {
            return send(payload, callback);
          } catch (e) {
            errorLog(e, payload);
          }
        };

        // @ts-ignore
        const sendAsync = ethereum.sendAsync;
        ethereum.sendAsync = (
          payload: JsonRpcRequest,
          callback: JsonRpcCallback
        ) => {
          try {
            return sendAsync(payload, callback);
          } catch (e) {
            errorLog(e, payload);
          }
        };
      } catch (e) {
        alert("An error happened loading the app -- please reload this page");
      }
    }
  });
  const [screen, setScreen] = useDappScreen();
  const [viewedWallet, setViewedWallet] = useState<string>();
  const [walletToImport, setWalletToImport] = useState<DharmaWalletClaimer>();

  const { account, chainId } = useEthers();
  useEffect(() => {
    if (account && chainId) {
      setScreen("YOUR_WALLETS");
    } else {
      setScreen("WHAT_YOU_WILL_NEED");
    }
  }, [account, chainId]);

  const switchWallet = (address: string) => {
    setViewedWallet(address);
    setScreen("WALLET");
  };

  const { send: isDSWClaimed } = useIsDSWClaimed();
  const { state, send: claimDSW, resetState } = useClaimDSW(walletToImport);

  useEffect(() => {
    if (state?.status === "Success" && walletToImport?.walletClaimerData.wallet) {
      setViewedWallet(walletToImport?.walletClaimerData.wallet);
      resetState();
      setScreen("WALLET");
    }
  }, [walletToImport?.walletClaimerData.wallet, state?.status]);

  return (
    <>
      <LinearGradient
        type="primaryToAccented"
        css={`
          display: flex;
          flex: 1;
          height: 100%;
          ${screen !== "WALLET" &&
          "align-items: center;" +
          "justify-content: center;"}
        `}
      >
        {screen === "WHAT_YOU_WILL_NEED" && <WhatYouWillNeedScreen />}
        {screen === "YOUR_WALLETS" && (
          <YourWalletsScreen
            onImport={async (dharmaWalletClaimer: DharmaWalletClaimer) => {
              if (!dharmaWalletClaimer) {
                return;
              }
              const isClaimed = await isDSWClaimed(dharmaWalletClaimer);
              if (isClaimed) {
                alert("Wallet is already claimed.");
              } else {
                setWalletToImport(dharmaWalletClaimer);
                setScreen("FOUND_WALLET");
              }
            }}
            switchWallet={switchWallet}
          />
        )}
        {screen === "FOUND_WALLET" && walletToImport && account && (
          <FoundWalletScreen
            foundWalletAddress={walletToImport?.walletClaimerData.wallet}
            state={state}
            onClaim={() => {
              claimDSW().catch(alert);
            }}
          />
        )}
        {screen === "WALLET" && viewedWallet && (
          <WalletScreen
            walletAddress={viewedWallet}
            viewAllWallets={() => {
              setScreen("YOUR_WALLETS");
            }}
          />
        )}
      </LinearGradient>
    </>
  );
};

Wallet.getLayout = function getLayout(page: React.ReactElement) {
  return <DappNavLayout>{page}</DappNavLayout>;
};

export default Wallet;
