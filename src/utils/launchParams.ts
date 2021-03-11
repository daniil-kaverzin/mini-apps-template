import { Dictionary } from '@vkontakte/vkjs';

import { LaunchParams } from '../types';

const asIs = <T>(value: T): T => {
  return value;
};

const parseBoolean = (value: string) => {
  return value === '1';
};

const parseArray = (value: string) => {
  return value.length === 0 ? [] : value.split(',');
};

const paramParsers: Dictionary<[string, (value: string) => void]> = {
  vk_user_id: ['userId', parseInt],
  vk_app_id: ['appId', parseInt],
  vk_is_app_user: ['isAppUser', parseInt],
  vk_are_notifications_enabled: ['areNotificationsEnabled', parseBoolean],
  vk_language: ['language', asIs],
  vk_ref: ['ref', asIs],
  vk_access_token_settings: ['accessTokenSettings', parseArray],
  vk_group_id: ['groupId', parseInt],
  vk_viewer_group_role: ['viewerGroupRole', asIs],
  vk_platform: ['platform', asIs],
  vk_is_favorite: ['isFavorite', parseBoolean],
  sign: ['sign', asIs],
};

export function getLaunchParams(queriesString: string): LaunchParams {
  return queriesString.split('&').reduce<any>((acc, pair) => {
    const [key, value] = pair.split('=');

    if (key in paramParsers) {
      const [field, parse] = paramParsers[key];
      acc[field] = parse(value);
    }

    return acc;
  }, {});
}
