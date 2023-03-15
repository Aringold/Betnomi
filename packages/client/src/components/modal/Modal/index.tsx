import React, { FC, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import ReactModal from 'react-modal';
import { GameLiveStatsModal } from '@betnomi/client/src/pages/Game/GameLiveStatsModal';
import { FiatCurrencyModal } from 'containers/FiatCurrencyModal';
import { SignUpTelegramModal } from '../../../containers/auth/SignupTelegramModal';
import { SignUpMetamaskModal } from '../../../containers/auth/SignUpMetamaskModal';
import { RestorePasswordModal } from '../../../containers/RestorePasswordModal';
import { ModalType } from '../../../store/modal/types';
import { SignInModal } from '../../../containers/SignInModal';
import { TwoFAModal } from '../../../containers/TwoFAModal';
import { SignUpModal } from '../../../containers/SignUpModal';
import { ChatRainModal } from '../../../containers/chat/ChatRainModal';
import { ChatTippingModal } from '../../../containers/chat/ChatTippingModal';
import { OAuthSignupModal } from '../../../containers/auth/OAuthSignupModal';
import { SelectDateTransactionModal } from '../../../containers/profile/transaction/SelectDateModal';
import { SelectDateDepositModal } from '../../../containers/profile/transaction/Deposit/SelectDateModal';
import { WithdrawConfirmModal } from '../../../containers/profile/wallet/WithdrawConfirmModal';
import { WithdrawModal } from '../../../containers/profile/wallet/WithdrawModal';
import { WithdrawSuccessModal } from '../../../containers/profile/wallet/WithdrawSuccessModal';
import { SportBetsDateModal } from '../../../containers/profile/sportbets/SportBetsDateModal';
import { SportBetsFilterModal } from '../../../containers/profile/sportbets/SportBetsFilterModal';
import { TransactionFilterModal } from '../../../containers/profile/transaction/TransactionFilterModal';
import { DepositFilterModal } from '../../../containers/profile/transaction/Deposit/DepositFilterModal';
import { DepositDetailsModal } from '../../../containers/profile/transaction/Deposit/DepositDetailModal';
import { CurrencyManage } from '../../../containers/profile/settings/CurrencyManageModal';
import { DeletePhotoModal } from '../../../containers/profile/settings/DeletePhotoModal';
import { EditAvatarModal } from '../../../containers/profile/settings/EditAvatarModal';
import { AddBonusModal } from '../../../containers/profile/bonuses/AddBonusModal';
import { CreateCampaignsModal } from '../../../containers/affiliate/Campaigns/CreateCampaignsModal';
import { ReferralsFilterModal } from '../../../containers/affiliate/Referrals/ReferralsFilterModal';

import styles from './styles.module.scss';

ReactModal.setAppElement('#root');

export type ModalComponentProps = { 
  onCloseModal: () => void;
  params: { [key: string]: any };
};

const modalRenderers: Record<ModalType, FC<ModalComponentProps>> = {
  [ModalType.SignIn]: SignInModal,
  [ModalType.SignUp]: SignUpModal,
  [ModalType.RestorePassword]: RestorePasswordModal,
  [ModalType.ChatRain]: ChatRainModal,
  [ModalType.ChatTipping]: ChatTippingModal,
  [ModalType.OAuthSignup]: OAuthSignupModal,
  [ModalType.SignUpMetamask]: SignUpMetamaskModal,
  [ModalType.SignUpTelegram]: SignUpTelegramModal,
  [ModalType.SelectDateDeposit]: SelectDateDepositModal,
  [ModalType.SelectDateTransaction]: SelectDateTransactionModal,
  [ModalType.Withdrawal]: WithdrawModal,
  [ModalType.WithdrawalConfirm]: WithdrawConfirmModal,
  [ModalType.WithdrawalSuccess]: WithdrawSuccessModal,
  [ModalType.SportBetsDate]: SportBetsDateModal,
  [ModalType.SportBetsFilter]: SportBetsFilterModal,
  [ModalType.TransactionFilter]: TransactionFilterModal,
  [ModalType.DepositFilter]: DepositFilterModal,
  [ModalType.DepositDetailsModal]: DepositDetailsModal,
  [ModalType.GameLiveStats]: GameLiveStatsModal,
  [ModalType.ManageCurrency]: CurrencyManage,
  [ModalType.DeletePhoto]: DeletePhotoModal,
  [ModalType.EditAvatar]: EditAvatarModal,
  [ModalType.AddBonus]: AddBonusModal,
  [ModalType.CreateCampaign]: CreateCampaignsModal,
  [ModalType.FiatCurrency]: FiatCurrencyModal,
  [ModalType.ReferralFilter]: ReferralsFilterModal,
  [ModalType.TwoFA]: TwoFAModal,
};

interface IProps {}

export const Modal: FC<IProps> = () => {
  const {
    current, active, onCloseModal, params,
  } = useModal();

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [active]);

  if (!active || !current) {
    return null;
  }

  return (
    <ReactModal
      isOpen={active}
      className={styles.modal}
      overlayClassName={styles.modal_overlay}
      shouldCloseOnOverlayClick
      onRequestClose={onCloseModal}
      preventScroll
    >
      {React.createElement(modalRenderers[current], { onCloseModal, params })}
    </ReactModal>
  );
};
