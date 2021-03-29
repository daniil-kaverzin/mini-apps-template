import { useAdaptivity, ViewWidth } from '@vkontakte/vkui';
import { useMemo } from 'react';

export const useIsMobile = () => {
  const { viewWidth } = useAdaptivity();

  return useMemo(() => {
    return viewWidth && viewWidth <= ViewWidth.MOBILE;
  }, [viewWidth]);
};
