/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import { showErrorToast, showSuccessToast } from '@betnomi/libs/components/Toaster';
import i18n from '@betnomi/libs/utils/i18n';
import { Unwrap } from '../../../types/unwrap';
import {
  affiliateGetUserAccount,
  getAffiliateReferrals,
  getAffiliateCampaigns,
  getAffiliateCreateCampaigns,
  AffiliateWithdrawTransfer,
} from '../api';
import {
  affiliateSetAccount,
  affiliateSetReferrals,
  affiliateGetReferrals,
  affiliateGetCampaigns,
  affiliateSetCampaigns,
  affiliateCreateCampaigns,
  WithdrawTransfer,
} from '../actionCreators';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import {
  AffiliateCampaignsCreateRequest,
  AffiliateCampaignsRequest,
  AffiliateReferralRequest,
} from '../types';
import { modalHide } from '../../modal/actionCreators';
import { campaignsAllInitialValues } from '../../../hooks/formik/useCampaignsForm';

export function* fetchAffiliates() {
  try {
    yield put(affiliateSetAccount({ isLoading: true }));

    const { data }: Unwrap<typeof affiliateGetUserAccount> = yield call(
      affiliateGetUserAccount,
    );

    yield put(affiliateSetAccount({
      list: data.list,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(affiliateSetAccount({ isLoading: false }));
  }
}

export function* fetchReferrals({
  payload,
}: ReturnType<typeof affiliateGetReferrals>) {
  try {
    yield put(affiliateSetReferrals({
      isLoading: true,
      limit: payload.limit,
      offset: payload.offset,
    }));

    const modifiedData: AffiliateReferralRequest = {
      limit: payload.limit,
      offset: payload.offset,
    };

    const { data }: Unwrap <typeof getAffiliateReferrals> = yield call(
      getAffiliateReferrals, modifiedData,
    );

    yield put(affiliateSetReferrals({
      total: data.total,
      list: data.list,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(affiliateSetReferrals({ isLoading: false }));
  }
}

export function* fetchCampaigns({
  payload,
}: ReturnType<typeof affiliateGetCampaigns>) {
  try {
    yield put(affiliateSetCampaigns({
      isLoading: true,
      limit: payload?.limit ?? undefined,
      offset: payload?.offset ?? undefined,
    }));

    const modifiedData: AffiliateCampaignsRequest = {
      limit: payload?.limit ?? undefined,
      offset: payload?.offset ?? undefined,
    };

    const { data }: Unwrap <typeof getAffiliateCampaigns> = yield call(
      getAffiliateCampaigns, modifiedData,
    );

    yield put(affiliateSetCampaigns({
      total: data.total,
      code: data.code,
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(affiliateSetCampaigns({ isLoading: false }));
  }
}

export function* fetchCreateCampaigns({ payload }: ReturnType<typeof affiliateCreateCampaigns>) {
  try {
    yield put(affiliateSetCampaigns({
      isLoading: true,
    }));

    const modifiedData: AffiliateCampaignsCreateRequest = {
      code: payload.code,
      campaignName: payload.campaignName,
    };

    const { data }: Unwrap <typeof getAffiliateCreateCampaigns> = yield call(
      getAffiliateCreateCampaigns, modifiedData,
    );

    if (data?.id) {
      yield fetchCampaigns(affiliateGetCampaigns(campaignsAllInitialValues));
      showSuccessToast(
        i18n.t('Your referral campaign and URL has been successfully created.'),
        i18n.t('Success'),
      );
    }

    yield put(modalHide());
  } catch (e) {
    showErrorToast(transformBackendErrorToString(e));
  } finally {
    yield put(affiliateSetCampaigns({ isLoading: false }));
  }
}

export function* fetchTransferWithdraw({ payload: { currency } }: ReturnType<typeof WithdrawTransfer>) {
  try {
    yield call(AffiliateWithdrawTransfer, currency);
    yield call(fetchAffiliates);
    showSuccessToast(
      i18n.t('Your affiliate withdrawal request has been successfully processed.'),
      i18n.t('Success'),
    );
  } catch (e) {
    showErrorToast(
      i18n.t('Your withdrawal request was unable to complete. Please try again.'),
      i18n.t('Error'),
    );
  }
}
