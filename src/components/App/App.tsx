import React, { FC, memo } from 'react';
import {
  Button,
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Root,
  View,
} from '@vkontakte/vkui';
import { useThrottlingLocation, useRouter } from '@happysanta/router';
import {
  PANEL_FIRST,
  PANEL_SECOND,
  ROUTE_SECOND,
  VIEW_MAIN,
} from '../providers/RouteProvider';

export const App: FC = memo(() => {
  const router = useRouter();
  const [location] = useThrottlingLocation();

  return (
    <Root activeView={location.getViewId()}>
      <View id={VIEW_MAIN} activePanel={location.getPanelId()}>
        <Panel id={PANEL_FIRST}>
          <PanelHeader>Панель 1</PanelHeader>
          <Div>
            <Button
              size="l"
              stretched
              onClick={() => router.pushPage(ROUTE_SECOND)}
            >
              Перейти к панели 2
            </Button>
          </Div>
        </Panel>
        <Panel id={PANEL_SECOND}>
          <PanelHeader
            left={<PanelHeaderBack onClick={() => router.popPage()} />}
          >
            Панель 2
          </PanelHeader>
        </Panel>
      </View>
    </Root>
  );
});
