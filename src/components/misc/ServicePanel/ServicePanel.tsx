import React, {
  FC,
  Fragment,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { noop } from '@vkontakte/vkjs';

import './ServicePanel.scss';
import { tapticNotification } from '@/utils';
import { vkStorageContext } from '../../providers/VKStorageProvider';

const TOUCHES_COUNT_TO_SHOW = 3;

declare global {
  interface Window {
    showServicePanel: () => void;
  }
}

export const ServicePanel: FC = memo(() => {
  const [show, setShow] = useState(false);
  const storage = useContext(vkStorageContext);
  const showTimeoutRef = useRef<number | null>(null);

  const handleChangeScheme = () => {
    document.body.setAttribute(
      'scheme',
      document.body.getAttribute('scheme') === 'bright_light'
        ? 'space_gray'
        : 'bright_light',
    );
  };

  useEffect(() => {
    // Wait for simultaneous touch of N fingers during a second and show
    // service panel
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === TOUCHES_COUNT_TO_SHOW) {
        showTimeoutRef.current = window.setTimeout(() => {
          setShow(true);
        }, 1000);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      // Decline service panel show in case when touches count is not equal to N
      if (e.touches.length !== TOUCHES_COUNT_TO_SHOW) {
        if (showTimeoutRef.current) {
          clearTimeout(showTimeoutRef.current);
        }
      }
    };

    window.showServicePanel = () => setShow(true);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);

      window.showServicePanel = noop;
    };
  }, []);

  useEffect(() => {
    // When service panel is shown, send taptic notification
    if (show) {
      tapticNotification('success');
    }
  }, [show]);

  return (
    <Fragment>
      {show && (
        <ActionSheet
          className="ServicePanel"
          iosCloseItem={
            <ActionSheetItem autoclose mode="cancel">
              Закрыть
            </ActionSheetItem>
          }
          onClose={() => setShow(false)}
        >
          <ActionSheetItem autoclose onClick={window.reinitApp}>
            Перезагрузить страницу
          </ActionSheetItem>
          <ActionSheetItem
            autoclose
            onClick={() => window.location.reload(true)}
          >
            Жёстко перезагрузить страницу
          </ActionSheetItem>
          <ActionSheetItem autoclose onClick={() => window.throwError('Test')}>
            Открыть экран с ошибкой
          </ActionSheetItem>
          <ActionSheetItem autoclose onClick={() => storage?.clear()}>
            Очистить хранилище ВКонтакте
          </ActionSheetItem>
          <ActionSheetItem autoclose onClick={handleChangeScheme}>
            Сменить тему
          </ActionSheetItem>
        </ActionSheet>
      )}
    </Fragment>
  );
});
