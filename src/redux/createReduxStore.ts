import { Store, createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { ReduxState } from './types';
import { launchParams } from './reducers/launchParams';

const reducers = combineReducers<ReduxState>({
  launchParams,
});

export function createReduxStore(
  state?: Partial<ReduxState>,
): Store<ReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}
