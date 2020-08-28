/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";

const GRAPHQL_ENDPOINT = 'ws://localhost:7500/graphql';

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const link = new WebSocketLink(client);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient as any}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);