// External modules
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
// import VideoPlayer from './VideoPlayer';
// import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';


const Image = (props) => {
  return <div className="image"><img src={props.url} className="img-responsive" /></div>
}

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let videoPlayerClasses = classNames({
      'yt-video-container': true,
      'active': this.props.isYoutubeVideoPlaying
    });
    let slicesArray = [];
    const slices = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map(doc => {
        // map through each slice and output into array
        for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
          slicesArray.push(slice);
        };
      });
    const youTubeVideo = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map((doc, key) => {
        return (doc.fragments["casestudy.video"]) ? (<div key={key} className="video-player"><YoutubeVideoPlayer videoID={doc.fragments["casestudy.youtubeVideo"].value} isYoutubeVideoPlaying={this.props.isYoutubeVideoPlaying} toggleYoutubeVideo={this.props.toggleYoutubeVideo} /></div>) : null;
        // return (<Video key={key} autoPlay poster="/assets/homepage/homepage-maserati.jpg">
        //     <source src="/assets/videos/maserati-film.webm" type="video/webm" />
        // </Video>)
      });


    const vid = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map((doc, key) => {
        return (doc.fragments["casestudy.video"]) ?
          (<div 
          key={key} 
          className={videoPlayerClasses} 
          style={{ backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)' }}>
            <div className="yt-video-overlay"></div>
            <div className="yt-video-icon-container" onClick={this.playVideo}>
              <SVGPlayIcon width={103} height={105} className="yt-video-icon" />
            </div>
            <div className="videoWrapper">
              <div dangerouslySetInnerHTML={{ __html: doc.fragments["casestudy.video"].asHtml() }} />
            </div>
          </div>)
          : null;
      });


    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        console.log('slice', slice);
        switch (slice.sliceType) {
          case 'header':
            return (<div key={index} dangerouslySetInnerHTML={{ __html: `<h1>${slice.value.blocks["0"].text}</h1>` }} />);
          case 'content':
            return (<div key={index} dangerouslySetInnerHTML={{ __html: `<p>${slice.value.blocks["0"].text}</p>` }} />);
          case 'images':
            const images = slice.value.value;
            let imagesHtml = images.map(image => {
              const imageObj = image.fragments.src.main;
              return (<Image url={imageObj.url}></Image>);
            });
            return imagesHtml.map(image => image);
        }
      })
      : null;

    return (
      <div>
        {/*youTubeVideo*/}
        {vid}
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectContainer
