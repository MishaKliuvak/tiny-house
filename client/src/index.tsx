import React from 'react'
import { render } from 'react-dom'
import { Listings } from './sections'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './styles/index.css'

const client = new ApolloClient({
  uri: '/api'
})

render(
  <ApolloProvider client={client}>
    <Listings title='Tiny House'/>
  </ApolloProvider>,
  document.getElementById('root')
);
