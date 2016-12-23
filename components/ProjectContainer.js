// External modules
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import { default as Video, Play, Mute, Seek } from 'react-html5video';


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


    const heroPanel = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map((doc, key) => {
        const videoFile = doc.fragments["casestudy.hero-video-file"] && doc.fragments["casestudy.hero-video-file"].value;
        const heroImage = doc.fragments["casestudy.hero-image"] && doc.fragments["casestudy.hero-image"].url;
        let heroClasses = classNames({
          'hero': true,
          'has-image': heroImage !== undefined,
          'video-container': videoFile !== undefined,
          'active': videoFile !== undefined && this.props.isYoutubeVideoPlaying
        });
        return (videoFile)
          ?
          (<div
            key={key}
            className={heroClasses} >
            <div className="video-overlayd"></div>
            <Video
              // autoPlay
              poster={heroImage}
              onCanPlayThrough={() => {
                // Do stuff 
              } }>
              <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
              <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
            </Video>
          </div>)
          :
          <div
            key={key}
            className={heroClasses}
            style={{ 'backgroundImage': `url(${heroImage})` }} />;
      });


    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        const sliceLabel = slice.label || '';
        const contentClasses = `content-container ${sliceLabel}`;
        switch (slice.sliceType) {
          case 'content':
            return (<div className={contentClasses} key={index} dangerouslySetInnerHTML={{ __html: slice.value.asHtml() }} />);
          case 'images':
            const images = slice.value.value;
            if (images.length === 1) {
              let imageObj = images[0].fragments.src.main;
              return (<Image key={index} url={imageObj.url}></Image>);
            }
            else {
              const imagesHtml = images.map(image => {
                const imageObj = image.fragments.src.main;
                return (<Image url={imageObj.url}></Image>);
              });
              return imagesHtml.map(image => image);
            }
        }
      })
      : null;

    return (
      <div id="project">
        {heroPanel}
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectContainer
