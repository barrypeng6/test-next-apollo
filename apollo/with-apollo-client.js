import React from "react";
import initApollo from "./init-apollo";
import Head from "next/head";

import { getDataFromTree } from "react-apollo";

export default App =>
  class extends React.Component {
    static displayName = "withApollo(App)";
    static getInitialProps = async ctx => {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo();
      if (!process.browser) {
        try {
          // The getDataFromTree function takes your React tree,
          // determines which queries are needed to render them, and then fetches them all.
          // It does this recursively down the whole tree if you have nested queries.
          // It returns a promise which resolves when the data is ready in your Apollo Client store.
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }
        Head.rewind();
      }
      const apolloState = apollo.cache.extract(); // Equals to apollo.extract ?
      return { ...appProps, apolloState };
    };
    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
