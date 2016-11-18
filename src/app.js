'use strict';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import PageContainer from './PageContainer'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PageContainer />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('appContainer'));
