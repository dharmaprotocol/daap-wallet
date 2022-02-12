import { useLocalStorage } from 'react-use'

export const useIsLoggedIn = () => {
  return useLocalStorage('logged-in', false)
}
