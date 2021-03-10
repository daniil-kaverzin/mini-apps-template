import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export function createApolloClient(
  httpURI: string,
  launchParams: string,
): ApolloClient<any> {
  // We can authenticate users only with launch parameters sent from VKontakte.
  // To check them on server side, we send them in header
  const httpLink = new HttpLink({
    uri: httpURI,
    headers: { 'x-launch-params': launchParams },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}
