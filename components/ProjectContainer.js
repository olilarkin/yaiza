// External modules
import React from 'react';
import ExecutionEnvironment from 'exenv';
import { Link } from 'react-router';
import classNames from 'classnames';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
import SVGRightChevron from '../components/SVG/SVGRightChevron';
import SVGLeftChevron from '../components/SVG/SVGLeftChevron';
import { default as Video, Play, Mute, Seek } from 'react-html5video';
import ImageSlider from './ImageSlider';
import Reveal from 'react-reveal';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

const PrevNextLinks = ({projects, thisID}) => {
  const thisIndex = projects && projects.findIndex(project => project.uid === thisID);
  const nextProjectURL = projects && thisIndex !== projects.length - 1 && `/projects/${projects[(thisIndex + 1)].uid}`;
  const prevProjectURL = projects && thisIndex > 0 && `/projects/${projects[(thisIndex - 1)].uid}`;

  return (
    <div className="prev-next-links-container">
      {prevProjectURL &&
        <div className="prev">
          <Link className="prev-link" to={prevProjectURL}><span><SVGLeftChevron width={67} height={144.5} /></span>Previous Project</Link>
        </div>}
      {nextProjectURL &&
        <div className="next">
          <Link className="next-link" to={nextProjectURL}>Next Project<span><SVGRightChevron width={67} height={144.5} /></span></Link>
        </div>}
    </div>
  );

}

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.videoPlayer = null;
    this.handleScroll = this.handleScroll.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
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
    if (!this.videoPlayer) return;
    let scrollTop = event.srcElement.body.scrollTop;
    scrollTop > 70 ? this.pauseVideo() : this.playVideo();
  }

  playVideo() {
    this.videoPlayer.play();
  }

  pauseVideo() {
    this.videoPlayer.pause();
  }

  render() {
    let slicesArray = [];
    const thisID = this.props.params.id;
    const projects = this.props.projects;
    console.log('projects', projects);
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
        console.log('this.props.mobile', this.props.mobile);
        return (videoFile)
          ?
          (<div
            key={key}
            className={heroClasses} >
            {this.props.mobile &&
              <Video
                controls
                poster={heroImage}
                onCanPlayThrough={() => {
                  // Do stuff 
                } }>
                <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
                <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
              </Video>
            }
            {!this.props.mobile &&
              <Video
                ref={(player) => { this.videoPlayer = player } }
                autoPlay
                loop
                poster={heroImage}
                onCanPlayThrough={() => {
                } }>
                <source src={`${this.props.videoURL}${videoFile}.webm`} type="video/webm" />
                <source src={`${this.props.videoURL}${videoFile}.mp4`} type="video/mp4" />
              </Video>
            }

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
            return (<Reveal effect="animated fadeInUp" className={contentClasses} key={index}><div dangerouslySetInnerHTML={{ __html: slice.value.asHtml() }} /></Reveal>);
          case 'Image Rollover':
            const imageRollClasses = `content-container image-roll-container ${sliceLabel}`;
            const imageRollColor = slice.value.value["0"].fragments["background-colour"] && slice.value.value["0"].fragments["background-colour"].value;
            const imageRollIcon = slice.value.value["0"].fragments["icon"] && slice.value.value["0"].fragments["icon"].main.url;
            const imageRollImage = slice.value.value["0"].fragments["background-image"] && slice.value.value["0"].fragments["background-image"].value;
            return (
              <Reveal effect="animated fadeInUp" className={imageRollClasses} key={index} style={{ backgroundColor: imageRollColor }}>
                <div>
                  {imageRollIcon &&
                    <div className="image-roll-icon">
                      <img src={imageRollIcon} className="img-responsive" />
                    </div>
                  }
                  {imageRollImage &&
                    <div className="image-roll-image">
                      <img src={imageRollImage} className="img-responsive" />
                    </div>
                  }
                </div>
              </Reveal>
            );
          case 'One Side Tall':
            const oneSideTallClasses = `content-container one-side-tall-container ${sliceLabel}`;
            const oneSideTallTImage = slice.value.value["0"].fragments["tallImage"] && slice.value.value["0"].fragments["tallImage"].main.url
            const oneSideTallSImage = slice.value.value["0"].fragments["otherSideBottomImage"] && slice.value.value["0"].fragments["otherSideBottomImage"].main.url;
            const oneSideTallText = slice.value.value["0"].fragments["otherSideTopText"] && slice.value.value["0"].fragments["otherSideTopText"].asHtml();
            return (
              <Reveal effect="animated fadeInUp" className={oneSideTallClasses} key={index}>
                {sliceLabel === 'left-side-tall' &&
                  <div>
                    <div className="half-width">
                      <Image url={oneSideTallTImage}></Image>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: slice.value.value["0"].fragments["otherSideTopText"].asHtml() }} />
                    <div className="half-width">
                      <Image url={oneSideTallSImage}></Image>
                    </div>
                  </div>
                }
                {sliceLabel === 'right-side-tall' &&
                  <div>
                    <div className="half-width"></div>
                    <div className="half-width"></div>
                    <div className="half-width"></div>
                  </div>
                }
              </Reveal>
            );
          case 'Quote':
            const quoteClasses = `content-container quote-container ${sliceLabel}`;
            const quoteText = slice.value.value["0"].fragments["quote-text"].value;
            const quoteSource = slice.value.value["0"].fragments["quote-source"].value;
            return (
              <Reveal effect="animated fadeInUp" className={quoteClasses} key={index} style={{ backgroundColor: '#000', color: '#fff' }}>
                <div>
                  <p className="quote-text">{quoteText}</p>
                  <p className="quote-source">{quoteSource}</p>
                </div>
              </Reveal>);
          case 'images':
            const images = slice.value.value;
            const imageClasses = `image-container ${sliceLabel}`;
            if (!images.length) return;
            if (images.length === 1) {
              let imageObj = images[0].fragments.src.main;
              return (<Reveal effect="animated fadeInUp" key={index} className={imageClasses}><Image url={imageObj.url}></Image></Reveal>);
            }
            else {
              const imagesHtml = images.map((image, index) => {
                const imageObj = image.fragments.src.main;
                return (<Image key={index} url={imageObj.url}></Image>);
              });
              return (<Reveal effect="animated fadeInUp" className={imageClasses} key={index}><ImageSlider key={index} images={imagesHtml} /></Reveal>);
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
