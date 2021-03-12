import React, { Fragment, PureComponent } from 'react';
import { Store } from 'redux';
import { Provider as StoreProvider, ReactReduxContext } from 'react-redux';
import { Dictionary } from '@vkontakte/vkjs';
import vkBridge, { VKBridgeSubscribeHandler } from '@vkontakte/vk-bridge';
import { ScreenSpinner } from '@vkontakte/vkui';

import { ApolloProvider } from '../providers/ApolloProvider';
import { AppCrash } from '../views/AppCrash';
import { App } from '../App';
import { ServicePanel } from '../misc/ServicePanel';
import { VKStorageProvider } from '../providers/VKStorageProvider';
import { createReduxStore, ReduxState } from '../../redux';
import { getStorageKeys } from '@/utils';
import config from '@/config';
import { LaunchParams, StorageFieldEnum, StorageValuesMap } from '@/types';
import { RouterProvider } from '../providers/RouterProvider';

// Assign human-readable store provider name for debugging purposes
ReactReduxContext.displayName = 'StoreProvider';

export interface AppRootProps {
  launchParamsString: string;
  launchParamsDictionary: LaunchParams;
}

export interface AppRootState {
  loading: boolean;
  error?: string;
  storage?: Dictionary<any>;
}

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here
 */
export class AppRoot extends PureComponent<AppRootProps, AppRootState> {
  readonly state: AppRootState = {
    loading: true,
  };

  async componentDidMount() {
    // When component did mount, we are waiting for application config from
    // bridge and add event listeners
    vkBridge.subscribe(this.onVKBridgeEvent);

    await this.init();
  }

  componentDidCatch(error: Error) {
    // Catch error if it did not happen before
    this.setState({ error: error.message });
  }

  componentWillUnmount() {
    vkBridge.unsubscribe(this.onVKBridgeEvent);
  }

  render() {
    const { loading, error, storage } = this.state;

    if (loading || error || !storage) {
      return (
        <Fragment>
          {error && <AppCrash onRestartClick={this.init} error={error} />}
          {!error && <ScreenSpinner />}
        </Fragment>
      );
    }

    return (
      <StoreProvider store={this.store}>
        <VKStorageProvider storage={storage}>
          <ApolloProvider
            httpUrl={config.gqlHttpUrl}
            launchParams={this.props.launchParamsString}
          >
            <RouterProvider>
              <App />
            </RouterProvider>
            <ServicePanel />
          </ApolloProvider>
        </VKStorageProvider>
      </StoreProvider>
    );
  }

  onVKBridgeEvent: VKBridgeSubscribeHandler = (event) => {
    if (event.detail && event.detail.type === 'VKWebAppUpdateConfig') {
      const scheme = event.detail.data.scheme || 'bright_light';

      document.body.setAttribute('scheme', scheme);
    }
  };

  store: Store<ReduxState> = createReduxStore();

  init = async () => {
    this.setState({ loading: true, error: undefined });

    try {
      // Performing all async operations and getting data to launch application
      const [storage] = await Promise.all([
        getStorageKeys<StorageValuesMap>(...Object.values(StorageFieldEnum)),
      ]);

      this.store = createReduxStore({
        launchParams: this.props.launchParamsDictionary,
      });

      this.setState({ loading: false, storage });
    } catch (error) {
      // In case error appears, catch it and display
      this.setState({
        error: error.message || 'Error',
        loading: false,
      });
    }
  };
}
