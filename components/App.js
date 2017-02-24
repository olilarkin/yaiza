// React
import React from 'react';
// Prismic
import Prismic from 'prismic.io';
// Config
import config from '../config/config';
// Components
import ExecutionEnvironment from 'exenv';
import Header from '../components/Header/Header';
import Nav from './Nav'
import Footer from '../components/Footer';

Array.prototype.findIndex = Array.prototype.findIndex || function (evaluator, thisArg) {
  'use strict';
  if (!this) {
    throw new TypeError('Array.prototype.some called on null or undefined');
  }

  if (typeof (evaluator) !== 'function') {
    if (typeof (evaluator) === 'string') {
      // Attempt to convert it to a function
      if (!(evaluator = eval(evaluator))) {
        throw new TypeError();
      }
    } else {
      throw new TypeError();
    }
  }

  var i;
  if (thisArg === undefined) {  // Optimize for thisArg
    for (i in this) {
      if (evaluator(this[i], i, this)) {
        return i;
      }
    }
    return -1;
  }
  for (i in this) {
    if (evaluator.call(thisArg, this[i], i, this)) {
      return i;
    }
  }
  return -1;
};

let MobileDetect = require('mobile-detect');
let md;
if (typeof window !== 'undefined') {
  md = new MobileDetect(window.navigator.userAgent);
}

if (process.env.APP_ENV === 'browser') {
  // Styles
  require('../styles/index.scss');
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasLoaded: false,
      menuIsOpen: false,
      headerIsActive: false,
      currentPage: '',
      isYoutubeVideoPlaying: false,
      homepageSlide: 0,
      headerHeight: 70
    };
    this.getPrismicData = this.getPrismicData.bind(this);
    this.setPrismicData = this.setPrismicData.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.getProjectOverview = this.getProjectOverview.bind(this);
    this.getHomePageContent = this.getHomePageContent.bind(this);
    this.handleHideSplash = this.handleHideSplash.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleToggleYoutubeVideo = this.handleToggleYoutubeVideo.bind(this);
    this.handleSetHomepageSlide = this.handleSetHomepageSlide.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.getPrismicData(this.query);
  }

   componentDidMount() {
    if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > this.state.headerHeight) {
      this.setState({headerIsActive: true});
    }
    else { 
      this.setState({headerIsActive: false});
    }
  }


  getProjectOverview(data) {
    this.setState({
      projectOverview: data
        .filter(doc => doc.type === 'project-overview')
    });
  }
  getProjects(data) {
    this.setState({
      projects: data
        .filter(doc => doc.type === 'casestudy')
        .sort(function (a, b) {
          return a.fragments["casestudy.navigation-order"]
            && b.fragments["casestudy.navigation-order"]
            && a.fragments["casestudy.navigation-order"].value - b.fragments["casestudy.navigation-order"].value
        })
    });
  }

  getHomePageContent(data) {
    this.setState({
      homepageContent: data.filter(doc => doc.tags.find(tag => 'homepage'))
    });
  }

  setPrismicData(data) {
    this.getProjects(data);
    this.getProjectOverview(data);
    this.getHomePageContent(data);
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

  handleToggleYoutubeVideo(isVideoPlaying) {
    this.setState({
      isYoutubeVideoPlaying: isVideoPlaying
    })
  }

  handleSetHomepageSlide(index) {
    this.setState({
      homepageSlide: index
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
        projects: this.state.projects,
        projectOverview: this.state.projectOverview,
        homepageContent: this.state.homepageContent,
        setHomepageSlide: this.handleSetHomepageSlide,
        homepageSlide: this.state.homepageSlide,
        hasLoaded: this.state.hasLoaded,
        handleHideSplash: this.handleHideSplash,
        hideSplash: this.state.hideSplash,
        toggleYoutubeVideo: this.handleToggleYoutubeVideo,
        isYoutubeVideoPlaying: this.state.isYoutubeVideoPlaying,
        videoURL: config.videoURL,
        mobile: md && md.mobile(),
        headerHeight: this.state.headerHeight
      })
    );

    return (
      
      <div id="wrapper">
      <div>MOBILE: --- {md.mobile()}</div>
        {this.state.hasLoaded &&
          <Header
            toggleMenu={this.handleToggleMenu}
            menuIsOpen={this.state.menuIsOpen}
            headerIsActive={this.state.headerIsActive}
            projects={this.state.projects}
            pathname={this.props.location.pathname}
            headerHeight={this.state.headerHeight}
            />
        }
        {this.state.hasLoaded &&
          <Nav
            toggleMenu={this.handleToggleMenu}
            menuIsOpen={this.state.menuIsOpen}
            projects={this.state.projects}
            pathname={this.props.location.pathname}
            />
        }
        {childrenWithProps}
        {this.state.hasLoaded && this.props.location.pathname !== '/' &&
          <Footer />
        }
      </div>
    );
  }
}

export default App
