'use strict';

// React
import React from 'react';
import ReactDOM from 'react-dom';
// Prismic
import Prismic from 'prismic.io';
// Config
import config from './config/config';

// Components
import PageContainer from './components/PageContainer'

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.getPrismicData = this.getPrismicData.bind(this);
    this.setPrismicData = this.setPrismicData.bind(this);
    this.query = [
      Prismic.Predicates.at('my.casestudy.uid', "testing")
    ];
  }

  componentWillMount() {
    this.getPrismicData(this.query);
  }

  createMarkup(markup) {
    return { __html: markup };
  }

  setPrismicData(data) {
    console.log('data', data);
    this.setState({
      data
    });
  }

  getPrismicData(query) {
    Prismic.api(config.apiURL).then((api) => {
      return api.query(query);
    }).then((response) => {
      return this.setPrismicData(response.results);
    }, (err) => {
      console.log('Something went wrong: ', err);
    });
  }

  render() {
    return (
      <PageContainer data={this.state.data} createMarkup={this.createMarkup} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('appContainer'));
