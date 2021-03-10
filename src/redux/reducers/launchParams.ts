export interface LaunchParams {
  accessTokenSettings: string;
  appId: string;
  areNotificationsEnabled: string;
  isAppUser: string;
  isFavorite: string;
  language: 'ru' | 'uk' | 'ua' | 'en' | 'be' | 'kz' | 'pt' | 'es';
  platform:
    | 'mobile_android'
    | 'mobile_iphone'
    | 'mobile_web'
    | 'desktop_web'
    | 'mobile_android_messenger'
    | 'mobile_iphone_messenger';
  ref: string;
  userId: string;
  groupId: string;
  viewerGroupRole: string;
  sign: string;
}

const initialLaunchParams: Partial<LaunchParams> = {
  accessTokenSettings: '',
  appId: '0',
  areNotificationsEnabled: '0',
  isAppUser: '0',
  isFavorite: '0',
  language: 'ru',
  platform: 'desktop_web',
  ref: 'other',
  userId: '0',
  groupId: '0',
  viewerGroupRole: '',
  sign: '',
};

export const launchParams = (
  state: Partial<LaunchParams> = initialLaunchParams,
) => {
  return state;
};
