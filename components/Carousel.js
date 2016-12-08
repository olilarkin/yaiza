import React from 'react';


const flickityOptions = {
  initialIndex: 0,
  cellSelector: '.carousel-cell',
  accessibility: true,
  pageDots: true,
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
          {this.props.homepageContent
            .sort(function(a, b){
              return a.fragments["casestudy.homepage-slide-order"] 
              && b.fragments["casestudy.homepage-slide-order"] 
              && a.fragments["casestudy.homepage-slide-order"].value - b.fragments["casestudy.homepage-slide-order"].value})
            .map((content, key) => {
              return (
                <div className="carousel-cell" key={key}>
                  <div className="carousel-cell__content" style={{ backgroundImage: `url(${content.fragments["casestudy.homepage-slider-image"].url})` }} >
                    <div className="carousel-cell__text">
                      <h2>{content.fragments["casestudy.homepage-slide-heading"].value}</h2>
                      <p>{content.fragments["casestudy.homepage-slide-sub-heading"].value}</p>
                    </div>
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