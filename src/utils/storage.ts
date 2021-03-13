import vkBridge from '@vkontakte/vk-bridge';

import { StringKeys } from '../types';

export async function getStorageKeys<S extends {}>(
  ...keys: StringKeys<S>[]
): Promise<Partial<S>> {
  const { keys: storageKeys } = await vkBridge.send('VKWebAppStorageGet', {
    keys,
  });

  return storageKeys.reduce<Partial<S>>((acc, k) => {
    try {
      acc[k.key as keyof S] = JSON.parse(decodeURIComponent(k.value));
    } catch (e) {}
    return acc;
  }, {});
}
