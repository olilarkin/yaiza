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
      menuIsOpen: false,
      currentPage: '',
      isYoutubeVideoPlaying: false
    };
    this.getPrismicData = this.getPrismicData.bind(this);
    this.setPrismicData = this.setPrismicData.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.getHomePageContent = this.getHomePageContent.bind(this);
    this.handleHideSplash = this.handleHideSplash.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleToggleYoutubeVideo = this.handleToggleYoutubeVideo.bind(this);
  }

  componentWillMount() {
    this.getPrismicData(this.query);
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
    console.log('data', data);
    this.getProjects(data);
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

  handleToggleYoutubeVideo(isVideoPlaying){
    this.setState({
      isYoutubeVideoPlaying: isVideoPlaying
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
        projects: this.state.projects,
        homepageContent: this.state.homepageContent,
        hasLoaded: this.state.hasLoaded,
        handleHideSplash: this.handleHideSplash,
        hideSplash: this.state.hideSplash,
        toggleYoutubeVideo: this.handleToggleYoutubeVideo,
        isYoutubeVideoPlaying: this.state.isYoutubeVideoPlaying,
        videoURL: config.videoURL
      })
    );

    return (
      <div>
        {this.state.hasLoaded && <Header
          toggleMenu={this.handleToggleMenu}
          menuIsOpen={this.state.menuIsOpen}
          projects={this.state.projects}
          pathname={this.props.location.pathname}
          />
        }
        <div>{childrenWithProps}</div>
      </div>
    );
  }
}

export default App
