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
            const imageClasses = `projects-image-container ${sliceLabel}`;
            if (!image.length) return;
            if (image.length === 1) {
              let imageObj = image[0].fragments.Image.main;
              let linkUID = image[0].fragments.Link.uid;
              let heading = image[0].fragments.Heading.value;
              let subHeading = image[0].fragments.Subheading && image[0].fragments.Subheading.blocks[0].text;
              return (<Reveal effect="animated fadeInUp" key={index} className={imageClasses}>
                <Link to={`/projects/${linkUID}`}>
                  <div className="projects-image-container__content">
                    <div className="angle"></div>
                    <h2>
                      {heading}
                    </h2>
                    <p>
                      {subHeading}
                    </p>
                  </div>
                  <Image url={imageObj.url}></Image>
                </Link>
              </Reveal>);
            }
          case 'Image Group':
            const imageGroup = slice.value.value;
            const imageGroupClasses = 'projects-image-group-container';
            if (!imageGroup.length) return;
            if (imageGroup.length === 1) {
              let imageObj = imageGroup[0].fragments.Image.main;
              let tallImage = imageGroup[0].fragments['ImageType'] && imageGroup[0].fragments['ImageType'].value === 'True';
              let linkUID = imageGroup[0].fragments.Link.uid;
              let heading = imageGroup[0].fragments.Heading.value;
              let subHeading = imageGroup[0].fragments.Subheading && imageGroup[0].fragments.Subheading.blocks[0].text;
              let image1Classes = classNames({
                'animated fadeInUp': true,
                'tall-image': tallImage
              })
              let imageObj2 = imageGroup[0].fragments.Image2.main;
              let tallImage2 = imageGroup[0].fragments['Image2Type'] && imageGroup[0].fragments['Image2Type'].value === 'True';
              let image2Classes = classNames({
                'animated fadeInUp': true,
                'tall-image': tallImage2
              });
              let linkUID2 = imageGroup[0].fragments.Link2.uid;
              let heading2 = imageGroup[0].fragments.Heading2.value;
              let subHeading2 = imageGroup[0].fragments.Subheading2 && imageGroup[0].fragments.Subheading2.blocks[0].text;
              return (<div key={index} className={sliceLabel}>
                <div className={imageGroupClasses}>
                  <Reveal effect={image1Classes}>
                    <Link to={`/projects/${linkUID}`}>
                      <div className="projects-image-container__content">
                        <div className="angle"></div>
                        <h2>
                          {heading}
                        </h2>
                        <p>
                          {subHeading}
                        </p>
                      </div>
                      <Image url={imageObj.url}></Image>
                    </Link>
                  </Reveal>
                  <Reveal effect={image2Classes}>
                    <Link to={`/projects/${linkUID2}`}>
                      <div className="projects-image-container__content">
                        <div className="angle"></div>
                        <h2>
                          {heading2}
                        </h2>
                        <p>
                          {subHeading2}
                        </p>
                      </div>
                      <Image url={imageObj2.url}></Image>
                    </Link>
                  </Reveal>
                </div>
              </div>);
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
