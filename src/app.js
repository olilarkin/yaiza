'use strict';

// React
const React = require('react');
const ReactDOM = require('react-dom');

// Components
const PageContainer = require('./PageContainer');

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

ReactDOM.render(<App />, document.getElementById('root'));
