import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import ExecutionEnvironment from 'exenv';
// import routes and pass them into <Router/>
import routes from './config/routes'

render(
  <Router
    onUpdate={() => {
      window.scrollTo(0, 0);
      if (ExecutionEnvironment.canUseDOM) {
        document.getElementById('app').focus();
      }
    }}
    routes={routes}
    history={browserHistory} />,
  document.getElementById('app')
)