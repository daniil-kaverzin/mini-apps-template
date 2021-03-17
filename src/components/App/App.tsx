import { FC, memo, useMemo } from 'react';
import { ModalRoot, Root, View } from '@vkontakte/vkui';
import { useThrottlingLocation, useRouter } from '@happysanta/router';

import {
  MODAL_FIRST,
  PANEL_FIRST,
  PANEL_ONBOARDING,
  PANEL_SECOND,
  POPOUT_ACTION_SHEET_FIRST,
  VIEW_MAIN,
  VIEW_ONBOARDING,
} from '../providers/RouterProvider';
import { Panel1 } from '../panels/Panel1';
import { Panel2 } from '../panels/Panel2';
import { Modal1 } from '../modals/Modal1';
import { ActionSheet1 } from '../popouts/ActionSheet1';
import { Onboarding } from '../panels/Onboarding';

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
        activePanel={location.getViewActivePanel(VIEW_MAIN) || ''}
      >
        <Panel1 id={PANEL_FIRST} />
        <Panel2 id={PANEL_SECOND} />
      </View>
      <View
        id={VIEW_ONBOARDING}
        onSwipeBack={() => router.popPage()}
        history={
          location.hasOverlay() ? [] : location.getViewHistory(PANEL_ONBOARDING)
        }
        activePanel={location.getViewActivePanel(VIEW_ONBOARDING) || ''}
      >
        <Onboarding id={PANEL_ONBOARDING} />
      </View>
    </Root>
  );
});
