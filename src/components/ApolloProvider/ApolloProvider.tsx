import React, { memo, ReactNode, ReactNodeArray, useMemo } from 'react';

import { ApolloProvider as ReactApolloProvider } from '@apollo/react-hooks';

import { createApolloClient } from './utils';

export interface ApolloProviderProps {
  children: ReactNode | ReactNodeArray;
  launchParams: string;
  httpUrl: string;
}

export const ApolloProvider = memo(function ApolloProvider(
  props: ApolloProviderProps,
) {
  const { httpUrl, launchParams, children } = props;

  // Create Apollo client
  const client = useMemo<any>(() => createApolloClient(httpUrl, launchParams), [
    httpUrl,
    launchParams,
  ]);

  return <ReactApolloProvider client={client}>{children}</ReactApolloProvider>;
});
