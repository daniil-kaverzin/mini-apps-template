import React from 'react';
import ReactDOM from 'react-dom';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot as VKUIAppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import vkBridge from '@vkontakte/vk-bridge';

import { AppRoot } from './components/AppRoot';

// Notify native application, initialization done. It will make native
// application hide loader and display this application.
vkBridge.send('VKWebAppInit');

window.onload = () => {
  ReactDOM.render(
    <ConfigProvider>
      <AdaptivityProvider>
        <VKUIAppRoot>
          <AppRoot />
        </VKUIAppRoot>
      </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById('root'),
  );
};
