import React, { FC } from 'react';
import { Page, Router, RouterContext } from '@happysanta/router';

export const ROUTE_FIRST = '/';
export const ROUTE_SECOND = '/something';

export const VIEW_MAIN = 'view_main';
export const PANEL_FIRST = 'panel_first';
export const PANEL_SECOND = 'panel_second';

const routes = {
  [ROUTE_FIRST]: new Page(PANEL_FIRST, VIEW_MAIN),
  [ROUTE_SECOND]: new Page(PANEL_SECOND, VIEW_MAIN),
};

const router = new Router(routes);

router.start();

export const RouterProvider: FC = ({ children }) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};
