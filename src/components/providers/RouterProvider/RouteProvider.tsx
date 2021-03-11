import React, { FC } from 'react';
import { RouterContext } from '@happysanta/router';

import { router } from './config';

export const RouterProvider: FC = ({ children }) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};
