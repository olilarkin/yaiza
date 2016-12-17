import React from 'react';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import Youtube from './Video/react-youtube/dist/YouTube';
import { getBaseUrl } from '../helpers/utils';
import classNames from 'classnames';

class YoutubeVideoPlayer extends React.Component {
  constructor() {
    super();
    const baseUrl = getBaseUrl();
    this.playerInstance = null;
    this.opts = {
      width: '100%',
      origin: baseUrl,
      playerVars: {
        autoplay: false,
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0,
        showInfo: 0
      }
    };
    this.playerReady = this.playerReady.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }

  componentWillUnmount() {
    this.props.toggleYoutubeVideo(false);
  }


  playerReady(event) {
    this.playerInstance = event.target;
  };

  playVideo() {
    this.props.toggleYoutubeVideo(true);
    this.playerInstance && this.playerInstance.playVideo();
  }

  render() {
    let videoPlayerClasses = classNames({
      'yt-video-container': true,
      'active': this.props.isYoutubeVideoPlaying
    });

    return (
      <div className={videoPlayerClasses} style={{ backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)' }}>
        <div className="yt-video-overlay"></div>
        <div className="yt-video-icon-container" onClick={this.playVideo}>
          <SVGPlayIcon width={103} height={105} className="yt-video-icon" />
        </div>
        <Youtube
          videoId={this.props.videoID}
          opts={this.opts}
          onReady={this.playerReady}
          />
      </div>)
  }
};

export default YoutubeVideoPlayer;