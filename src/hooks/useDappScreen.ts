import { createGlobalState } from "react-hooks-global-state";
import { DAPP_SCREENS } from "src/constants";

type DappScreen = typeof DAPP_SCREENS[number];

const { useGlobalState } = createGlobalState<{ screen: DappScreen }>({
  screen: "WALLET"
});

export const useDappScreen = () => {
  return useGlobalState("screen");
};
