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
    this.getCaseStudies = this.getCaseStudies.bind(this);
    this.getHomePage = this.getHomePage.bind(this);
    this.query = [
      Prismic.Predicates.at('my.casestudy.uid', "test-page")
    ];
  }

  componentWillMount() {
    this.getPrismicData(this.query);
  }

  getCaseStudies(data){
    this.setState({
      caseStudies: data.filter(doc => doc.type === 'casestudy')
    });
  }

  getHomePage(data){
    this.setState({
      homePage: data.find(doc => doc.type === 'homepage')
    });
  }

  setPrismicData(data) {
    console.log('data', data);
    this.getCaseStudies(data);
    this.getHomePage(data);
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
        caseStudies: this.state.caseStudies,
        homePage: this.state.homePage
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
