// React
import React from 'react';
// Prismic
import Prismic from 'prismic.io';
// Config
import config from '../config/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.getPrismicData = this.getPrismicData.bind(this);
    this.setPrismicData = this.setPrismicData.bind(this);
    this.query = [
      Prismic.Predicates.at('my.casestudy.uid', "test-page")
    ];
  }

  componentWillMount() {
    if (!this.state.data) this.getPrismicData(this.query);
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
      return api.query('');
    }).then((response) => {
      return this.setPrismicData(response.results);
    }, (err) => {
      console.log('Something went wrong: ', err);
    });
  }
  
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        data: this.state.data
      })
    );

    return (
      <div>
        <h1>Yaiza</h1>
        <div>{childrenWithProps}</div>
      </div>
    );
  }
}

export default App
