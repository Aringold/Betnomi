/* eslint-disable no-console */
import { call, put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';

import { removeAvatar, uploadNewAvatar } from '../api';
import { avatarErrorResponseToError } from '../../../utils/api/transforms';

import { Unwrap } from '../../../types/unwrap';
import { setUserAvatar, uploadUserAvatar, removeUserAvatar } from '../actionCreators';

export function* setUserAvatarSaga({
  payload: { file },
  callback,
}: ReturnType<typeof uploadUserAvatar>) {
  try {
    const { data }: Unwrap<typeof setUserAvatar> = yield call(uploadNewAvatar, file);

    const image: string = data.filePath;

    yield put(setUserAvatar({ image }));
    yield put(modalHide());
    callback();
  } catch (error) {
    callback(avatarErrorResponseToError(error.response.data));
  }
}

export function* removeUserAvatarSaga({
  callback,
}: ReturnType<typeof removeUserAvatar>) {
  try {
    yield call(removeAvatar);
    const image: string = '';

    yield put(setUserAvatar({ image }));
    yield put(modalHide());
    callback();
  } catch (error) {
    callback(avatarErrorResponseToError(error.response.data));
  }
}
