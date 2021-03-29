import { useSelector as useReduxSelector } from 'react-redux';

import { ReduxState } from '../redux/types';

export const useSelector = () => useReduxSelector((state: ReduxState) => state);
