// External modules
import React from 'react';
import { Link } from 'react-router';
import SVGPlayIcon from '../components/SVG/SVGPlayIcon';
const Youtube = require('react-youtube').default;

const VideoPlayer = ({videoID}) => {
  const opts = {
    width:'100%',
    playerVars: {
      autoplay: false
    }
  };

  const videoURL = `https://www.youtube-nocookie.com/embed/${videoID}?rel=0&controls=0&showinfo=0`;
  return (
    <div className="video-container" style={{ backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)' }}>
      <div className="video-overlay"></div>
      <div className="video-icon-container">
        <SVGPlayIcon width={103} height={105} className="video-icon" />
      </div>
      {/*<iframe width="1280" height="720" src={videoURL} frameborder="0" allowFullScreen></iframe>*/}
      <Youtube
        videoId={videoID}
        opts={opts}
        />
    </div>)
};

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let slicesArray = [];
    const content = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map(doc => {
        // map through each slice and output into array
        for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
          slicesArray.push(slice);
        };
      });

    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        console.log('slice', slice);
        switch (slice.sliceType) {
          case 'header':
            return (<div key={index} dangerouslySetInnerHTML={{ __html: `<h1>${slice.value.blocks["0"].text}</h1>` }} />);
          case 'content':
            return (<div key={index} dangerouslySetInnerHTML={{ __html: `<p>${slice.value.blocks["0"].text}</p>` }} />);
          case 'video':
            return (<div key={index}><VideoPlayer videoID={slice.value.value} /></div>);

        }
      })
      : null;

    return (
      <div>
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectContainer
