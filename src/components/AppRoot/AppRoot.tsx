import React, { Fragment, PureComponent } from 'react';
import { Store } from 'redux';
import { Provider as StoreProvider, ReactReduxContext } from 'react-redux';
import { Dictionary, noop } from '@vkontakte/vkjs';
import vkBridge, { VKBridgeSubscribeHandler } from '@vkontakte/vk-bridge';
import { ScreenSpinner } from '@vkontakte/vkui';
import qs from 'qs';

import { ApolloProvider } from '../ApolloProvider';
import { AppCrash } from '../views/AppCrash';
import { App } from '../App';
import { ServicePanel } from '../misc/ServicePanel';
import { VKStorageProvider } from '../VKStorageProvider';
import { createReduxStore, ReduxState } from '../../redux';
import { getStorageKeys } from '../../utils';
import config from '../../config';
import { StorageFieldEnum, StorageValuesMap } from '../../types';
import { RouterProvider } from '../providers/RouteProvider';

declare global {
  interface Window {
    reinitApp: () => void;
    throwError: (message: string) => void;
  }
}

// Assign human-readable store provider name for debugging purposes
ReactReduxContext.displayName = 'StoreProvider';

export interface AppRootProps {}

export interface AppRootState {
  loading: boolean;
  queriesString: string;
  error?: string;
  storage?: Dictionary<any>;
}

/**
 * Root application component. Everything application requires for showing
 * first screen is being loaded here
 */
export class AppRoot extends PureComponent<AppRootProps, AppRootState> {
  /**
   * Redux store
   * @type {Store<ReduxState>}
   */
  private store: Store<ReduxState> = createReduxStore();

  /**
   * Application launch parameters
   * @type {LaunchParams}
   */

  public state: AppRootState = {
    loading: true,
    queriesString: window.location.search.slice(1),
  };

  public async componentDidMount() {
    // When component did mount, we are waiting for application config from
    // bridge and add event listener
    vkBridge.subscribe(this.onVKBridgeEvent);

    window.reinitApp = () => this.init();
    window.throwError = (message) => this.throwError(message);

    // Init application
    await this.init();
  }

  private throwError = (error: string) => {
    this.setState({ error });
  };

  public componentDidCatch(error: Error) {
    // Catch error if it did not happen before
    this.setState({ error: error.message });
  }

  public componentWillUnmount() {
    // When component unloads, remove all event listeners
    vkBridge.unsubscribe(this.onVKBridgeEvent);
    window.reinitApp = noop;
    window.throwError = noop;
  }

  public render() {
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
            launchParams={this.state.queriesString}
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

  /**
   * Checks if event is VKWebAppUpdateConfig to know application config
   * sent from bridge
   * @param {VKBridgeEvent<ReceiveMethodName>} event
   */
  private onVKBridgeEvent: VKBridgeSubscribeHandler = (event) => {
    if (event.detail && event.detail.type === 'VKWebAppUpdateConfig') {
      const scheme = event.detail.data.scheme || 'bright_light';

      document.body.setAttribute('scheme', scheme);
    }
  };

  /**
   * Initializes application
   */
  private init = async () => {
    this.setState({ loading: true, error: undefined });

    try {
      // Performing all async operations and getting data to launch application
      const [storage] = await Promise.all([
        getStorageKeys<StorageValuesMap>(...Object.values(StorageFieldEnum)),
      ]);

      this.store = createReduxStore({
        launchParams: qs.parse(this.state.queriesString),
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
