import { useContractFunction, useEthers } from "@usedapp/core";
import WalletConnect from "@walletconnect/client";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { Abi } from "src/abis/Wallet";

export interface WalletConnectRequest {
    message: string,
    onAccept: () => void
    onReject: () => void
}

export const useWalletConnect = (smartWalletAddress: string, onWalletConnectRequest: (walletConnectRequest: WalletConnectRequest) => void) => {
  const { chainId, library } = useEthers();

  const contract = new ethers.Contract(
    smartWalletAddress,
    Abi,
    library?.getSigner()
  );

  const { send, state } = useContractFunction(contract, "execute", {
    transactionName: `WalletConnect Execution`
  });

  const refTransactionCall = useRef<{ id: number } | null>();
  const connectorRef = useRef<WalletConnect>();
  const [connected, setConnected] = useState(false);

  const disconnect = () => {
    connectorRef.current?.killSession();
    setConnected(false);
  };

  const connect = async (uri: string): Promise<boolean> => {
    // eslint-disable-next-line no-console
    console.log("Connecting", uri);

    window.Buffer = window.Buffer || require('buffer').Buffer;

    const connector = new WalletConnect({
      uri,
      clientMeta: {
        description: "Dharma Smart Wallet",
        url: "https://dharma.io",
        icons: [
          "https://www.dharma.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdharma_logo_no_shadow.d4709170.png&w=3840&q=75"
        ],
        name: "Dharma"
      }
    });

    if (!connector.connected) {
      connectorRef.current = connector;
      await connector.createSession();
    } else {
      await connector.killSession();
      return connect(uri);
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      // eslint-disable-next-line no-console
      console.log("connect", payload);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      // eslint-disable-next-line no-console
      console.log("disconnect", payload);
    });

    // Subscribe to session requests
    connector.on("session_request", (error, payload) => {
      // eslint-disable-next-line no-console
      console.log("session_request", error, payload);
      if (error) {
        throw error;
      }
      const peerMeta = payload?.params?.[0]?.peerMeta;
      onWalletConnectRequest({
        message: `Do you want to accept this WalletConnect connection? ${peerMeta?.name} ${peerMeta?.url}`,
        onAccept: () => {
          connector.approveSession({
            accounts: [smartWalletAddress],
            // @ts-ignore
            chainId
          });
          setConnected(true);
        },
        onReject: () => {
          connector.rejectSession();
        },
      })
      // Handle Session Request

      /* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'session_request',
        params: [{
          peerId: '15d8b6a3-15bd-493e-9358-111e3a4e6ee4',
          peerMeta: {
            name: "WalletConnect Example",
            description: "Try out WalletConnect v1.0",
            icons: ["https://example.walletconnect.org/favicon.ico"],
            url: "https://example.walletconnect.org"
          }
        }]
      }
      */
    });

    // Subscribe to call requests
    connector.on("call_request", (error, payload) => {
      // eslint-disable-next-line no-console
      console.log("call_request", error, payload);
      if (error) {
        throw error;
      }

      const confirmDialog = async (callback: () => void) => {
        onWalletConnectRequest({
          message: `Do you want to accept this WalletConnect request? ${JSON.stringify(payload)}`,
          onAccept: async () => {
            try {
              await callback();
            } catch (e) {
              alert(e);
              connector.rejectRequest({
                id: payload.id,
                error: {
                  code: 0,
                  // @ts-ignore
                  message: (e?.message || e.toString()) || "There was an issue."
                }
              });
            }
          },
          onReject: () => {
            connector.rejectRequest({
              id: payload.id,
              error: {
                code: 1,
                message:
                  "User rejected request."
              }
            });
          },
        })
      };

      // @ts-ignore
      const parseTxParams = payload => {
        let txParams: ethers.providers.TransactionRequest = {
          from: payload.params[0].from,
          data: payload.params[0].data,
          chainId
        };
        if (payload.params[0].gas) {
          txParams = {
            ...txParams,
            gasLimit: payload.params[0].gas
          };
        }
        if (payload.params[0].to) {
          txParams = {
            ...txParams,
            to: payload.params[0].to
          };
        }
        return txParams;
      };

      const sendTransaction = () => {
        confirmDialog(async () => {
          refTransactionCall.current = payload;
          // eslint-disable-next-line no-console
          console.log({ payload });
          send(payload.params).catch(alert);
        }).catch(alert);
      };

      const eth_sendRawTransaction = () => {
        confirmDialog(async () => {
          refTransactionCall.current = payload;
          send(payload.params[0]).catch(alert);
        });
      };

      const personal_sign = () => {
        confirmDialog(async () => {
          try {
            const message = payload.params[0];
            const result = await library
              ?.getSigner()
              ?.signMessage(ethers.utils.arrayify(message));
            connectorRef.current?.approveRequest({
              id: payload.id,
              result
            });
          } catch (e) {
            alert(e);
          }
        }).catch(alert);
      };

      const eth_sign = () => {
        confirmDialog(async () => {
          try {
            const message = payload.params[1];
            const result = await library
              ?.getSigner()
              ?.signMessage(ethers.utils.arrayify(message));
            connectorRef.current?.approveRequest({
              id: payload.id,
              result
            });
          } catch (e) {
            alert(e);
          }
        }).catch(alert);
      };

      const eth_signTypedData_v4 = () => {
        confirmDialog(async () => {
          try {
            const from = payload.params[0];
            const data = payload.params[1];
            // @ts-ignore
            const result = await library?.provider?.request?.({
              method: "eth_signTypedData_v4",
              params: [from, data]
            });
            connectorRef.current?.approveRequest({
              id: payload.id,
              result
            });
          } catch (e) {
            alert(e);
          }
        }).catch(alert);
      };

      const eth_signTransaction = () => {
        confirmDialog(async () => {
          const txParams = await library
            ?.getSigner()
            ?.populateTransaction?.(parseTxParams(payload));
          if (txParams) {
            const result = await library
              ?.getSigner()
              ?.signTransaction(txParams);
            connectorRef.current?.approveRequest({
              id: payload.id,
              result
            });
          }
        }).catch(alert);
      };

      switch (payload.method) {
        case "personal_sign":
          // sign
          personal_sign();
          break;
        case "eth_sign":
          // sign
          eth_sign();
          break;
        case "eth_signTypedData":
          // sign
          eth_signTypedData_v4();
          break;
        case "eth_signTypedData_v4":
          // sign
          eth_signTypedData_v4();
          break;
        case "eth_signTransaction":
          // sign
          eth_signTransaction();
          break;
        case "eth_sendRawTransaction":
          eth_sendRawTransaction();
          break;
        case "eth_sendTransaction":
          sendTransaction();
          break;
      }

      // Handle Call Request

      /* payload:
      {
        id: 1,
        jsonrpc: '2.0'.
        method: 'eth_sign',
        params: [
          "0xbc28ea04101f03ea7a94c1379bc3ab32e65e62d3",
          "My email is john@doe.com - 1537836206101"
        ]
      }
      */
    });

    return true;
  };

  useEffect(() => {
    if (
      state.transaction?.hash &&
      refTransactionCall.current?.id
    ) {
      connectorRef.current?.approveRequest({
        id: refTransactionCall.current?.id,
        result: state.transaction?.hash
      });
      refTransactionCall.current = null;
    }
  }, [state.transaction?.hash]);

  // TODO: Maybe add a useEffect here with returned function that disconnects session if component is removed?  Might help with need to clear site data/use incognito?
  return {
    connect,
    connected,
    disconnect,
    connector: connectorRef.current
  };
};
