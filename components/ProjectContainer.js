// External modules
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import SVGRightChevron from '../components/SVG/SVGRightChevron';
import SVGLeftChevron from '../components/SVG/SVGLeftChevron';
import { default as Video, Play, Mute, Seek } from 'react-html5video';
import ImageSlider from './ImageSlider'


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

const PrevNextLinks = ({projects, thisID}) => {
  const thisIndex = projects && projects.findIndex(project => project.uid === thisID);
  const nextProjectURL = projects && thisIndex !== projects.length -1 && `/projects/${projects[(thisIndex + 1)].uid}`;
  const prevProjectURL = projects && thisIndex > 0 && `/projects/${projects[(thisIndex - 1)].uid}`;

  return (
    <div className="prev-next-links-container">
      {prevProjectURL && <Link className="prev-link" to={prevProjectURL}><span><SVGLeftChevron width={67} height={144.5} /></span>Previous Project</Link>}
      {nextProjectURL && <Link className="next-link" to={nextProjectURL}>Next Project<span><SVGRightChevron width={67} height={144.5}/></span></Link>}
    </div>
  );

}

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let slicesArray = [];
    const thisID = this.props.params.id;
    const projects = this.props.projects;
    const slices = projects && projects
      .filter(doc => doc.uid === thisID)
      .map(doc => {
        // map through each slice and output into array
        for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
          slicesArray.push(slice);
        };
      });


    const heroPanel = projects && projects
      .filter(doc => doc.uid === thisID)
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
              // controls
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
        switch (slice.sliceType) {
          case 'content':
            const contentClasses = `content-container ${sliceLabel}`;
            return (<div className={contentClasses} key={index} dangerouslySetInnerHTML={{ __html: slice.value.asHtml() }} />);
          case 'images':
            const images = slice.value.value;
            const imageClasses = `image-container ${sliceLabel}`;
            if (!images.length) return;
            if (images.length === 1) {
              let imageObj = images[0].fragments.src.main;
              return (<Image classes={imageClasses} key={index} url={imageObj.url}></Image>);
            }
            else {
              const imagesHtml = images.map((image, index) => {
                const imageObj = image.fragments.src.main;
                return (<Image key={index} url={imageObj.url}></Image>);
              });
              return (<ImageSlider key={index} images={imagesHtml} />);
            }
        }
      })
      : null;


    return (
      <div id="project">
        {heroPanel}
        {pageContentOutput}
        <PrevNextLinks projects={this.props.projects} thisID={this.props.params.id} />
      </div>
    );

  }
}

export default ProjectContainer
