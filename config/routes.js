import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import About from '../components/About'
import Home from '../components/Home'
import CaseStudyContainer from '../components/CaseStudyContainer'
import CaseStudiesContainer from '../components/CaseStudiesContainer'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/case-studies" component={CaseStudiesContainer} />
    <Route path="/case-studies/:id" component={CaseStudyContainer} />
    <Route path="/about" component={About}/>
  </Route>
)
