import { State } from '../../types/store';

export const selectIsMobile = (state: State) => state.global.isMobile;
export const selectIsSmallScreen = (state: State) => state.global.isSmallScreen;
export const newAvatar = (state: State) => state.global.newAvatar;
export const currentAvatar = (state: State) => state.auth.user.image;
