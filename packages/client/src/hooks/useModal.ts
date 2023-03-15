import { useDispatch } from 'react-redux';
import { modalHide, modalShow, modalProps } from 'store/modal/actionCreators';
import { useCallback } from 'react';
import { ModalType } from '../store/modal/types';
import { useShallowSelector } from './index';
import { selectModal } from '../store/modal/selectors';

export const useModal = () => {
  const dispatch = useDispatch();
  const { active, current, props: params } = useShallowSelector(selectModal);
  const onCloseModal = useCallback(() => dispatch(modalHide()), [dispatch]);
  const showModal = useCallback(
    (modal: ModalType, props?: { [key: string]: any }) => () => {
      dispatch(modalProps({ ...props }));
      dispatch(modalShow(modal));
    }, [dispatch],
  ); 
  return {
    current, active, onCloseModal, showModal, params,
  };
};
