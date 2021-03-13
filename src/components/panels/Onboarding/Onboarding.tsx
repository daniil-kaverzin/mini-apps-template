import React, { FC, useCallback } from 'react';
import {
  Button,
  Div,
  FixedLayout,
  Panel,
  PanelHeader,
  PanelProps,
} from '@vkontakte/vkui';
import { useRouter } from '@happysanta/router';
import { ROUTE_FIRST } from '@/components/providers/RouterProvider';
import { useVKStorage } from '@/hooks/useVKStorage';
import { StorageFieldEnum } from '@/types';

export const Onboarding: FC<PanelProps> = (props) => {
  const router = useRouter();
  const vkStorage = useVKStorage();

  const closeOnboarding = useCallback(() => {
    if (vkStorage) {
      vkStorage.memoize(StorageFieldEnum.ONBOARDING_DISABLED, true);
    }
    router.replacePage(ROUTE_FIRST);
  }, [vkStorage, router]);

  return (
    <Panel {...props} centered>
      <PanelHeader separator={false} />
      Hello World
      <FixedLayout vertical="bottom">
        <Div>
          <Button size="l" stretched onClick={closeOnboarding}>
            Продолжить
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
};
