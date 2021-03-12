import { Page, Router, RouterContext } from '@happysanta/router';
import React, { FC } from 'react';

export const ROUTE_FIRST = '/';
export const ROUTE_SECOND = '/something';

export const VIEW_MAIN = 'view_main';
export const PANEL_FIRST = 'panel_first';
export const PANEL_SECOND = 'panel_second';

export const MODAL_FIRST = 'modal_first';

export const POPOUT_ACTION_SHEET_FIRST = 'popout_action_sheet_first';

const routes = {
  [ROUTE_FIRST]: new Page(PANEL_FIRST, VIEW_MAIN),
  [ROUTE_SECOND]: new Page(PANEL_SECOND, VIEW_MAIN),
};

export const router = new Router(routes);

router.start();

export const RouterProvider: FC = ({ children }) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};
