import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import About from '../components/About'
import Home from '../components/Home'
import PageContainer from '../components/PageContainer'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/case" component={PageContainer} />
    <Route path="/about" component={About}/>
  </Route>
)