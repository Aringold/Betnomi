import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { selectIsSmallScreen } from 'store/global/selectors';
import { useShallowSelector } from './index';
import { selectAuthUI } from '../store/auth/selectors';
import { authSetUI } from '../store/auth/actionCreators';

export const useUserUI = () => {
  const dispatch = useDispatch();

  const { isChatActive, isMenuActive, isShowMoreActive } = useShallowSelector(selectAuthUI);
  const isSmallScreen = useShallowSelector(selectIsSmallScreen);

  const [prevMenuStatus, setPrevMenuStatus]: any = useState(isMenuActive);
  const [prevChatStatus, setPrevChatStatus]: any = useState(isChatActive);

  const setIsChatActive = useCallback(
    (val: boolean) => {
      if (isSmallScreen) {
        dispatch(authSetUI({ isChatActive: val }));
        setPrevChatStatus(val);

        if (prevMenuStatus && val) {
          dispatch(authSetUI({ isMenuActive: false }));
        }
        if (prevMenuStatus && !val) {
          dispatch(authSetUI({ isMenuActive: true }));
        }
      } else {
        dispatch(authSetUI({ isChatActive: val }));
      }
    },
    [dispatch, isMenuActive, isSmallScreen],
  );

  const setIsMenuActive = useCallback(
    (val: boolean) => {
      if (isSmallScreen) {
        dispatch(authSetUI({ isMenuActive: val }));
        setPrevMenuStatus(val);

        if (prevChatStatus && val) {
          dispatch(authSetUI({ isChatActive: false }));
        }
        if (prevChatStatus && !val) {
          dispatch(authSetUI({ isChatActive: true }));
        }
      } else {
        dispatch(authSetUI({ isMenuActive: val }));
      }
    },
    [dispatch, isChatActive, isSmallScreen],
  );

  const setIsShowMoreActive = useCallback(
    (val: boolean) => {
      dispatch(authSetUI({ isShowMoreActive: val }));
    }, [],
  );

  return {
    isChatActive,
    isMenuActive,
    isShowMoreActive,
    setIsChatActive,
    setIsMenuActive,
    setIsShowMoreActive,
  };
};
