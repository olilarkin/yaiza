// External modules
import React from 'react';
import { Link } from 'react-router';
//import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import VideoPlayer from './VideoPlayer';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

const Image = (props) => {
  return <div className="image"><img src={props.url} className="img-responsive" /></div>
}

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        // return (doc.fragments["casestudy.youtubeVideo"]) ? (<div key={key}  className="video-player"><VideoPlayer videoID={doc.fragments["casestudy.youtubeVideo"].value} isYoutubeVideoPlaying={this.props.isYoutubeVideoPlaying} toggleYoutubeVideo={this.props.toggleYoutubeVideo} /></div>) : null;
        return (<Video key={key} autoPlay poster="/assets/homepage/homepage-maserati.jpg">
            <source src="/assets/videos/maserati-film.webm" type="video/webm" />
        </Video>)
      });



    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        //console.log('slice', slice);
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
        {youTubeVideo}
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectContainer
