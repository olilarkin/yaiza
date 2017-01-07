import React from 'react';
import Slider from './react-slick/dist/react-slick';

export default class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
      fade: true,
      draggable: false,
      autoplay: true,
      useCSS: true,
      swipe: false,
      arrows: false,
      touchMove: false
    };
  }

  render() {

    let thisSlider = (
      <Slider {...this.settings}>
        {this.props.images.map((image, key) => {
          return (
            <div className="image-cell" key={key}>
              {image}
            </div>
          )
        })
        }
      </Slider>
    )
    return (
      <div className="image-slider-container">
        {thisSlider}
      </div>
    );
  }
};