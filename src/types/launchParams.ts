type Language = 'ru' | 'uk' | 'ua' | 'en' | 'be' | 'kz' | 'pt' | 'es';

type ViewerGroupRole = 'none' | 'member' | 'moder' | 'editor' | 'admin';

export type Platform =
  | 'mobile_android'
  | 'mobile_iphone'
  | 'mobile_web'
  | 'desktop_web'
  | 'mobile_android_messenger'
  | 'mobile_iphone_messenger';

export interface LaunchParams {
  accessTokenSettings: string[];
  appId: number;
  areNotificationsEnabled: boolean;
  isAppUser: boolean;
  isFavorite: boolean;
  language: Language;
  platform: Platform;
  ref: string;
  userId: number;
  groupId: number | null;
  viewerGroupRole: ViewerGroupRole | null;
  sign: string;
}
