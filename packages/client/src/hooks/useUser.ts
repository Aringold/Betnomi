import { isExpired } from 'react-jwt';
import useShallowSelector from './useShallowSelector';
import {
  selectAuthTokens, selectAuthUser, selectAuthUserBalances, 
} from '../store/auth/selectors';
import { usePlayerProgress } from './usePlayerProgress';

export const useUser = () => {
  const {
    name, confirmed, image, id, bcCurrency, email, intercomHash,
  } = useShallowSelector(
    selectAuthUser,
  );

  const balances = useShallowSelector(selectAuthUserBalances);
  const { access, refresh, game } = useShallowSelector(selectAuthTokens);
  const isLoggedIn = !isExpired(access) && !!refresh;

  const { level, progress } = usePlayerProgress();

  return {
    name,
    level,
    progress,
    access,
    refresh,
    game,
    isAuthorized: isLoggedIn,
    confirmed,
    image,
    balances,
    id,
    bcCurrency,
    email,
    intercomHash,
  };
};
