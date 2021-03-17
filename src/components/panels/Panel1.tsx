import { FC, Fragment } from 'react';
import { useRouter } from '@happysanta/router';
import { Button, Div, Panel, PanelHeader, PanelProps } from '@vkontakte/vkui';

import {
  ROUTE_SECOND,
  MODAL_FIRST,
  POPOUT_ACTION_SHEET_FIRST,
} from '../providers/RouterProvider';

export const Panel1: FC<PanelProps> = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      <Panel {...props}>
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
        <Div>
          <Button
            size="l"
            stretched
            onClick={() => router.pushModal(MODAL_FIRST, { id: '1' })}
          >
            Открыть модалку 1
          </Button>
        </Div>
        <Div>
          <Button
            size="l"
            stretched
            onClick={() => router.pushPopup(POPOUT_ACTION_SHEET_FIRST)}
          >
            Открыть попап
          </Button>
        </Div>
      </Panel>
    </Fragment>
  );
};
