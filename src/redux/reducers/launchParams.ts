import { LaunchParams } from '@/types';

const initialLaunchParams: Partial<LaunchParams> = {
  accessTokenSettings: [],
  appId: 0,
  areNotificationsEnabled: false,
  isAppUser: false,
  isFavorite: false,
  language: 'ru',
  platform: 'desktop_web',
  ref: 'other',
  userId: 0,
  groupId: 0,
  viewerGroupRole: null,
  sign: '',
};

export const launchParams = (state = initialLaunchParams) => {
  return state;
};
