import React from 'react';
import ReactDOM from 'react-dom';
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot as VKUIAppRoot,
  // WebviewType,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import vkBridge from '@vkontakte/vk-bridge';

import { AppRoot } from './components/AppRoot';
import { getLaunchParams } from './utils/launchParams';
import config from './config';
// import { Platform } from './types';

// Notify native application, initialization done. It will make native
// application hide loader and display this application.
vkBridge.send('VKWebAppInit');

window.onload = () => {
  const launchParamsString = window.location.search.slice(1);
  const launchParamsDictionary = getLaunchParams(launchParamsString);

  // if vk mini app header hidden
  // const getWebViewType = (platform: Platform) => {
  //   switch (platform) {
  //     case 'mobile_android':
  //     case 'mobile_iphone':
  //       return WebviewType.INTERNAL;
  //     default:
  //       return WebviewType.VKAPPS;
  //   }
  // };
  // const webViewType = getWebViewType(launchParamsDictionary.platform);

  ReactDOM.render(
    <ConfigProvider isWebView={config.isDevelopment ? true : undefined}>
      <AdaptivityProvider>
        <VKUIAppRoot>
          <AppRoot
            launchParamsString={launchParamsString}
            launchParamsDictionary={launchParamsDictionary}
          />
        </VKUIAppRoot>
      </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById('root'),
  );
};
