import React from 'react';

export default class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.flickityOptions = {
      initialIndex: props.homepageSlide,
      cellSelector: '.image-cell',
      accessibility: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: false
    }
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
          className={'image-slider'} // default '' 
          elementType={'div'} // default 'div' 
          options={this.flickityOptions} // takes flickity options {} 
          disableImagesLoaded={false} // default false 
          >
          {this.props.images.map((image, key) => {
            return (
              <div className="image-cell" key={key}>
                {image}
              </div>
            )
          })
          }
        </Flickity>
      )
    }
    return (
      <div id="image-slider-container">
        {slider}
      </div>
    );
  }
};