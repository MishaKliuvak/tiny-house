import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Listings, Home, Host, Listing, NotFound, User } from './sections'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './styles/index.css'

const client = new ApolloClient({
  uri: '/api'
})

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/host" component={Host} exact />
        <Route path="/listing/:id" component={Listing} exact />
        <Route path="/listings/:location?" component={Listings} exact />
        <Route path="/user/:id" component={User} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
