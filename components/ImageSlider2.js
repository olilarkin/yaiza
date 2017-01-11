import React, { Component } from 'react';
import './ImageSlider.css';
import classnames from 'classnames';

const images = [
  'http://www.freeimageslive.com/galleries/backdrops/abstract/preview/abstractcarnationnegative.jpg',
  'http://www.freeimageslive.com/galleries/backdrops/abstract/preview/abstractclouds02025.jpg',
  'http://www.freeimageslive.com/galleries/backdrops/abstract/preview/abstractgrapefruitnegatve1313.jpg',
  'http://www.freeimageslive.com/galleries/backdrops/abstract/preview/abstractsaladleavesblue.jpg',
  'http://www.freeimageslive.com/galleries/backdrops/abstract/preview/backgroundfestive1887.jpg'
]

class ImageSlider extends Component {
  constructor() {
    super();
    this.state = {
      activeImage: 1,
      imagesCount: images.length
    }
    this.fadeImages = this.fadeImages.bind(this);
  }
  componentDidMount() {
    this.fadeImages();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  fadeImages() {
    console.log('this.state.imagesCount:', this.state.imagesCount);
    console.log('this.state.activeImage:', this.state.activeImage);
    this.timer = setInterval(() => {
      const activeImage = this.state.activeImage < this.state.imagesCount ? this.state.activeImage : 0;
      this.setState({
        activeImage: activeImage + 1
      })
    }, 3000)
  }

  render() {
    return (
      <div>
        <div className="image-slider">
          {images.map((image, index) => {
            const imageClasses = classnames({
              'image-container': true,
              'active': this.state.activeImage === index + 1
            })
            return <div className={imageClasses} key={index} style={{ backgroundImage: `url(${image})` }}></div>
          })}
        </div>
        <div className="image-slider">
          {images.map((image, index) => {
            return <div className="image-container" key={index} style={{ backgroundImage: `url(${image})` }}></div>
          })}
        </div>
      </div>

    );
  }
}

export default ImageSlider;
