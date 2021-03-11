import React, { Fragment, PureComponent } from 'react';
import { Store } from 'redux';
import { Provider as StoreProvider, ReactReduxContext } from 'react-redux';
import { Dictionary, noop } from '@vkontakte/vkjs';
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
import { RouterProvider } from '../providers/RouterProvider/RouterProvider';

declare global {
  interface Window {
    reinitApp: () => void;
    throwError: (message: string) => void;
  }
}

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
  private store: Store<ReduxState> = createReduxStore();

  public state: AppRootState = {
    loading: true,
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
