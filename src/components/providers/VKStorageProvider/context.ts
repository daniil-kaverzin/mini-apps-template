import { createContext } from 'react';

import { VKStorageContext } from './types';

export const vkStorageContext = createContext<VKStorageContext<any> | null>(
  null,
);

vkStorageContext.displayName = 'VKStorageContext';
