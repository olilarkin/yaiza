// External modules
import React from 'react';
import ExecutionEnvironment from 'exenv';
import { Link } from 'react-router';
import classNames from 'classnames';
import { default as Video, Play, Mute, Seek } from 'react-html5video';
import Reveal from 'react-reveal';


const Image = (props) => (<div className={props.classes}><img src={props.url} className="img-responsive" /></div>);

class ProjectsContainer extends React.Component {
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
    if (ExecutionEnvironment.canUseDOM) {
      document.body.classList.add('light')
    }
  }

  componentWillUnmount() {
    if (ExecutionEnvironment.canUseDOM && !this.props.mobile) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (ExecutionEnvironment.canUseDOM) {
      document.body.classList.remove('light')
    }
  }

  handleScroll(event) {
    if (!this.videoPlayer) return;
    let scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > this.props.headerHeight) {
      this.pauseVideo()
    }
    else {
      this.playVideo();
    }
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
    const project = this.props.projectOverview;
    console.log('project', project);
    const slices = project && project
      .map(doc => {
        if (!doc.getSliceZone('project-overview.contentArea')) return;
        // map through each slice and output into array
        for (let slice of doc.getSliceZone('project-overview.contentArea').slices) {
          slicesArray.push(slice);
        };
      });


    const heroPanel = project && project
      .map((doc, key) => {
        const videoFile = doc.fragments["project-overview.hero-video-file"] && doc.fragments["project-overview.hero-video-file"].value;
        const heroImage = doc.fragments["project-overview.hero-image"] && doc.fragments["project-overview.hero-image"].url;
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
          case 'Content':
            const contentClasses = `content-container ${sliceLabel}`;
            return (<Reveal effect="animated fadeInUp" className={contentClasses} key={index}><div dangerouslySetInnerHTML={{ __html: slice.value.asHtml() }} /></Reveal>);
          case 'Content Dark':
            const contentDarkClasses = `content-container content-container--dark ${sliceLabel}`;
            return (<Reveal effect="animated fadeInUp" className={contentDarkClasses} key={index}><div dangerouslySetInnerHTML={{ __html: slice.value.asHtml() }} /></Reveal>);
          case 'Image':
            const image = slice.value.value;
            const imageClasses = `image-container ${sliceLabel}`;
            if (!image.length) return;
            if (image.length === 1) {
              let imageObj = image[0].fragments.Image.main;
              return (<Reveal effect="animated fadeInUp" key={index} className={imageClasses}><Image url={imageObj.url}></Image></Reveal>);
            }
          case 'Image Group':
            const imageGroup = slice.value.value;
            const imageGroupClasses = 'image-group-container';
            if (!imageGroup.length) return;
            if (imageGroup.length === 1) {
              let imageObj = imageGroup[0].fragments.Image.main;
              let imageObj2 = imageGroup[0].fragments.Image2.main;
              return (<Reveal effect="animated fadeInUp" key={index} className={sliceLabel}>
                <div className={imageGroupClasses}>
                  <Image url={imageObj.url}></Image>
                  <Image url={imageObj2.url}></Image>
                </div>
              </Reveal>);
            }
        }
      })
      : null;


    return (
      <div id="project" className="container">
        {heroPanel}
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectsContainer
