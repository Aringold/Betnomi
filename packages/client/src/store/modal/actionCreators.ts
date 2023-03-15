import { ModalActionTypes } from './actionsTypes';
import { ModalState } from '../../types/store/modal';
import { ModalType } from './types';

export const modalSetState = (payload: Partial<ModalState>) => ({
  type: ModalActionTypes.SetState,
  payload,
});

export const modalShow = (current: ModalType, data?: any) => ({
  type: ModalActionTypes.Show,
  payload: { current, data },
});

export const modalProps = (props: { [key: string]: any }) => ({
  type: ModalActionTypes.props,
  payload: { props },
});

export const modalHide = () => ({
  type: ModalActionTypes.Hide,
});
