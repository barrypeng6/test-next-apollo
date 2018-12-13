import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

const isServer = !process.browser;

if (isServer) {
  global.fetch = fetch;
}


const create = initialState => (
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !isServer,
    link: new HttpLink({
      uri: 'https://api.stage.meepcloud.com/graphql',
      credentials: 'include',
      headers: {
        'x-meepshop-domain': 'bellatest.stage.meepcloud.com',
      },
    }),
    cache: new InMemoryCache().restore(initialState || {})
  })
);

export default (initialState) => {
  if (isServer) return create(initialState);
  if (!apolloClient)
    apolloClient = create(initialState);
  return apolloClient;
}