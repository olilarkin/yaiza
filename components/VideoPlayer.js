import React from 'react';
import Youtube from './Video/react-youtube';
import { getBaseUrl } from '../helpers/utils';
import classNames from 'classnames';

const VideoPlayer = (props) => {
  const baseUrl = getBaseUrl();
  let playerInstance = null;
  const playerReady = (event) => {
    playerInstance = event.target;
  };
  const opts = {
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
  const videoPlayerClasses = classNames({
    'video-container': true,
    'active': props.videoIsActive
  });

  const startVideo = () => {

    playerInstance && playerInstance.startVideo();
  }

  return (
    <div className="video-container" style={{ backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)' }}>
      <div className="video-overlay"></div>
      <div className="video-icon-container" onClick={startVideo}>
        <SVGPlayIcon width={103} height={105} className="video-icon" />
      </div>
      {/*<iframe width="1280" height="720" src={videoURL} frameborder="0" allowFullScreen></iframe>*/}
      <Youtube
        videoId={props.videoID}
        opts={opts}
        onReady={playerReady}
        />
    </div>)
};

export default VideoPlayer;