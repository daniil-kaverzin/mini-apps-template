import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouter } from '@happysanta/router';

export const Panel2: FC<PanelProps> = (props) => {
  const router = useRouter();

  return (
    <Panel {...props}>
      <PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
        Панель 2
      </PanelHeader>
    </Panel>
  );
};
