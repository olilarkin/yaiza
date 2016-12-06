// React
import React from 'react';
// Prismic
import Prismic from 'prismic.io';
// Config
import config from '../config/config';
// Components
import Header from '../components/Header/Header';

if (process.env.APP_ENV === 'browser') {
  // Styles
  require('../styles/index.scss');
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasLoaded: false,
      menuIsOpen: false
    };
    this.getPrismicData = this.getPrismicData.bind(this);
    this.setPrismicData = this.setPrismicData.bind(this);
    this.getCaseStudies = this.getCaseStudies.bind(this);
    this.getHomePage = this.getHomePage.bind(this);
    this.handleHideSplash = this.handleHideSplash.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.query = [
      Prismic.Predicates.at('my.casestudy.uid', "test-page")
    ];
  }

  componentWillMount() {
    this.getPrismicData(this.query);
  }

  getCaseStudies(data) {
    this.setState({
      caseStudies: data.filter(doc => doc.type === 'casestudy')
    });
  }

  getHomePage(data) {
    this.setState({
      homePage: data.find(doc => doc.type === 'homepage')
    });
  }

  setPrismicData(data) {
    console.log('data', data);
    this.getCaseStudies(data);
    this.getHomePage(data);
    this.setState({
      hasLoaded: true
    });
  }

  handleHideSplash() {
    this.setState({
      hideSplash: true
    });
  }

  handleToggleMenu(e) {
    e.preventDefault();
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    })
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
        homePage: this.state.homePage,
        hasLoaded: this.state.hasLoaded,
        handleHideSplash: this.handleHideSplash,
        hideSplash: this.state.hideSplash
      })
    );

    return (
      <div>
        <Header 
        toggleMenu={this.handleToggleMenu}
        menuIsOpen={this.state.menuIsOpen} />
        <div>{childrenWithProps}</div>
      </div>
    );
  }
}

export default App
