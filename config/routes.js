import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from '../components/App'
import About from '../components/About'
import Home from '../components/Home'
import ProjectContainer from '../components/ProjectContainer'
import ProjectsContainer from '../components/ProjectsContainer'
import My404Component from '../components/My404Component'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/projects" component={ProjectsContainer} />
    <Route path="/projects/:id" component={ProjectContainer} />
    <Route path="/about" component={About}/>
    <Route path='/404' component={My404Component} />
    <Redirect from='*' to='/404' />
  </Route>
)
