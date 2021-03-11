import vkBridge, { TapticNotificationType } from '@vkontakte/vk-bridge';

// Посылает тактильное уведомление если оно поддерживается
export async function tapticNotification(type: TapticNotificationType) {
  if (vkBridge.supports('VKWebAppTapticNotificationOccurred')) {
    return vkBridge.send('VKWebAppTapticNotificationOccurred', { type });
  }
}

// Посылает тактильное уведомление об изменении если оно поддерживается
export async function tapticSelectionChanged() {
  if (vkBridge.supports('VKWebAppTapticSelectionChanged')) {
    return vkBridge.send('VKWebAppTapticSelectionChanged', {});
  }
}
