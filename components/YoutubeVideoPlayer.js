import React from 'react';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import Youtube from './Video/react-youtube/dist/YouTube';
import { getBaseUrl } from '../helpers/utils';
import classNames from 'classnames';

const YoutubeVideoPlayer = (props) => {
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
    'yt-video-container': true,
    'active': props.isYoutubeVideoPlaying
  });

  const playVideo = () => {
    props.toggleYoutubeVideo();
    playerInstance && playerInstance.playVideo();
  }

  return (
    <div className={videoPlayerClasses} style={{ backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)' }}>
      <div className="yt-video-overlay"></div>
      <div className="yt-video-icon-container" onClick={playVideo}>
        <SVGPlayIcon width={103} height={105} className="yt-video-icon" />
      </div>
      {/*<iframe width="1280" height="720" src={videoURL} frameborder="0" allowFullScreen></iframe>*/}
      <Youtube
        videoId={props.videoID}
        opts={opts}
        onReady={playerReady}
        />
    </div>)
};

export default YoutubeVideoPlayer;