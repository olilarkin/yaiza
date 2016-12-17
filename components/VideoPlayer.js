import React from 'react';;
import classNames from 'classnames';

const VideoPlayer = (props) => {
  const videoPlayerClasses = classNames({
    'video-container': true,
    'active': props.videoIsActive
  });

  return (
    <div className="video-container">
      <video poster="/assets/homepage/homepage-maserati.jpg" src="/assets/videos/maserati-film.webm" autoplay controls />
    </div>)
};

export default VideoPlayer;