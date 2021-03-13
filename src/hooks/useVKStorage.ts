import { useContext } from 'react';

import { vkStorageContext } from '@/components/providers/VKStorageProvider';

export const useVKStorage = () => useContext(vkStorageContext);
