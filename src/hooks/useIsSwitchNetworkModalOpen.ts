import { createGlobalState } from 'react-hooks-global-state'

const INITIAL_STATE = {
  isSwitchNetworkModalOpen: false,
}

const { useGlobalState } = createGlobalState(INITIAL_STATE)

export const useIsSwitchNetworkModalOpen = () => {
  return useGlobalState('isSwitchNetworkModalOpen')
}
