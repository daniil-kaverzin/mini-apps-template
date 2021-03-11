import { shallowEqual, useSelector as useReduxSelector } from 'react-redux';

import { ReduxState } from '../redux/types';

export function useSelector<Selected = unknown>(
  selector: (state: ReduxState) => Selected,
  equalityFn: (left: Selected, right: Selected) => boolean = shallowEqual,
): Selected {
  return useReduxSelector(selector, equalityFn);
}
