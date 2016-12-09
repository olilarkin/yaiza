import React from 'react';


const flickityOptions = {
  initialIndex: 0,
  cellSelector: '.carousel-cell',
  accessibility: true,
  pageDots: false,
  prevNextButtons: false,
  wrapAround: false
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('props.homepageContent', props.homepageContent);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }


  render() {
    let slider;
    if (window === undefined) {
      slider = null;
    } else {
      const Flickity = require('react-flickity-component')(React);
      slider = (
        <Flickity
          className={'carousel'} // default '' 
          elementType={'div'} // default 'div' 
          options={flickityOptions} // takes flickity options {} 
          disableImagesLoaded={false} // default false 
          >
          {this.props.homepageContent.slice()
            .sort(function (a, b) {
              return a.fragments["casestudy.homepage-slide-order"]
                && b.fragments["casestudy.homepage-slide-order"]
                && a.fragments["casestudy.homepage-slide-order"].value - b.fragments["casestudy.homepage-slide-order"].value
            })
            .map((content, key) => {
              return (
                <div className="carousel-cell" key={key}>
                  <div
                    className="carousel-cell__content"
                    style={{ backgroundImage: `url(${content.fragments["casestudy.homepage-slider-image"].url})` }}
                    >
                  </div>
                  <div className="carousel-cell__text">
                    <h2
                      data-subtext={content.fragments["casestudy.homepage-slide-sub-heading"].value}>
                      {content.fragments["casestudy.homepage-slide-heading"].value}
                    </h2>
                  </div>
                </div>
              )
            })
          }
        </Flickity>
      )
    }
    return (
      <div>
        {slider}
      </div>
    );
  }
};