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

import { AppRootWithRouter } from './components/AppRoot';
import { getLaunchParams } from './utils/launchParams';
import config from './config';
import { RouterProvider } from './components/providers/RouterProvider';
import { ApolloProvider } from './components/providers/ApolloProvider';
// import { Platform } from './types';

// Notify native application, initialization done. It will make native
// application hide loader and display this application.
vkBridge.send('VKWebAppInit');

window.onload = () => {
  const { isDevelopment, gqlHttpUrl } = config;

  const launchParamsString = window.location.search.slice(1);
  const launchParamsDictionary = getLaunchParams(launchParamsString);

  if (isDevelopment) {
    require('eruda').init();
  }

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
    <RouterProvider>
      <ConfigProvider isWebView={isDevelopment ? true : undefined}>
        <AdaptivityProvider>
          <VKUIAppRoot>
            <ApolloProvider
              httpUrl={gqlHttpUrl}
              launchParams={launchParamsString}
            >
              <AppRootWithRouter
                launchParamsDictionary={launchParamsDictionary}
              />
            </ApolloProvider>
          </VKUIAppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </RouterProvider>,
    document.getElementById('root'),
  );
};
