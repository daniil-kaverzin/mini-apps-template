import React, { FC, memo, useMemo } from 'react';
import { ModalRoot, Root, View } from '@vkontakte/vkui';
import { useThrottlingLocation, useRouter } from '@happysanta/router';

import {
  MODAL_FIRST,
  PANEL_FIRST,
  PANEL_SECOND,
  POPOUT_ACTION_SHEET_FIRST,
  VIEW_MAIN,
} from '../providers/RouterProvider';
import { Panel1 } from '../panels/Panel1';
import { Panel2 } from '../panels/Panel2';
import { Modal1 } from '../modals/Modal1';
import { ActionSheet1 } from '../popouts/ActionSheet1';

export const App: FC = memo(() => {
  const router = useRouter();
  const [location] = useThrottlingLocation();

  const renderModal = useMemo(() => {
    return (
      <ModalRoot
        activeModal={location.getModalId()}
        onClose={() => router.popPage()}
      >
        <Modal1 id={MODAL_FIRST} onClose={() => router.popPage()} />
      </ModalRoot>
    );
  }, [router, location]);

  const renderPopout = useMemo(() => {
    switch (location.getPopupId()) {
      case POPOUT_ACTION_SHEET_FIRST:
        return <ActionSheet1 onClose={() => router.popPage()} />;
      default:
        return null;
    }
  }, [router, location]);

  return (
    <Root
      activeView={location.getViewId()}
      modal={renderModal}
      popout={renderPopout}
    >
      <View
        id={VIEW_MAIN}
        onSwipeBack={() => router.popPage()}
        history={
          location.hasOverlay() ? [] : location.getViewHistory(VIEW_MAIN)
        }
        activePanel={location.getPanelId()}
      >
        <Panel1 id={PANEL_FIRST} />
        <Panel2 id={PANEL_SECOND} />
      </View>
    </Root>
  );
});
