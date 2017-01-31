import React from 'react';
import ExecutionEnvironment from 'exenv';
import { Link } from 'react-router';
import SVGRightArrow from './SVG/SVGRightArrow';
import SVGLeftArrow from './SVG/SVGLeftArrow';
import classNames from 'classnames';
let Flickity;
if (typeof window === 'undefined') {
  Flickity = () => {
    return <div></div>;
  }
}
else {
  Flickity = require('react-flickity-component')(React);
}


export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.flickityOptions = {
      initialIndex: props.homepageSlide,
      cellSelector: '.carousel-cell',
      accessibility: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: false
    }
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.applyBgColor = this.applyBgColor.bind(this);
    this.checkArrows = this.checkArrows.bind(this);
    this.bgColors = []
    this.state = {
      isLeftArrowVisible: false,
      isRightArrowVisible: true
    }
  }

  componentDidMount() {
    this.checkArrows();
    console.log('this.bgColors', this.bgColors);
    this.applyBgColor();
    this.sliderInstance.flkty.on('settle', (slider) => {
      this.checkArrows();
    });
    this.sliderInstance.flkty.on('select', (slider) => {
      this.applyBgColor();
    });
  }

  componentWillUnmount() {
    this.sliderInstance.flkty.off('settle');
    this.sliderInstance.flkty.off('select');
  }

  applyBgColor() {
    if (ExecutionEnvironment.canUseDOM) {
      document.body.style.backgroundColor = this.bgColors[this.sliderInstance.flkty.selectedIndex] || '#000';
    }
  }

  checkArrows() {
    if (!this.sliderInstance) return;
    this.setState({
      isLeftArrowVisible: this.sliderInstance.flkty.selectedIndex > 0,
      isRightArrowVisible: this.sliderInstance.flkty.selectedIndex < this.sliderInstance.flkty.slides.length - 1
    });
  }

  goNext() {
    this.sliderInstance.flkty.next();
    this.checkArrows();
  }

  goPrev() {
    this.sliderInstance.flkty.previous();
    this.checkArrows();
  }

  render() {
    const leftArrowClasses = classNames({
      'carousel-arrow carousel-arrow--left': true,
      hideme: !this.state.isLeftArrowVisible
    });
    const rightArrowClasses = classNames({
      'carousel-arrow carousel-arrow--right': true,
      hideme: !this.state.isRightArrowVisible
    });
    let slider = null;
    if (window !== undefined) {
      slider = (
        <Flickity
          className={'carousel'} // default '' 
          options={this.flickityOptions} // takes flickity options {}
          ref={(slider) => { this.sliderInstance = slider } }
          >
          {this.props.homepageContent.slice()
            .sort(function (a, b) {
              return a.fragments["casestudy.homepage-slide-order"]
                && b.fragments["casestudy.homepage-slide-order"]
                && a.fragments["casestudy.homepage-slide-order"].value - b.fragments["casestudy.homepage-slide-order"].value
            })
            .map((content, key) => {
              const effect = content.fragments["casestudy.homepage-image-effect"] && content.fragments["casestudy.homepage-image-effect"].value;
              const pageBGColor = content.fragments["casestudy.homepage-background-colour"] && content.fragments["casestudy.homepage-background-colour"].value || '#000';
              this.bgColors.push(pageBGColor);
              const url = `/projects/${content.uid}`;
              const mainImage = content.fragments["casestudy.homepage-slider-image"] && content.fragments["casestudy.homepage-slider-image"].main.url;
              const secondaryImage = content.fragments["casestudy.homepage-slider-second-image"] && content.fragments["casestudy.homepage-slider-second-image"].main.url;
              return (
                <Link to={url} onClick={this.props.setHomepageSlide.bind(this, key)} className="carousel-cell" key={key} data-effect={effect}>
                  <div className="carousel-cell__container">
                    <div
                      className="carousel-cell__content"
                      style={{ backgroundImage: `url(${mainImage})` }}
                      >
                      {secondaryImage &&
                        <div
                          className="carousel-cell__content carousel-cell__content__secondary"
                          style={{ backgroundImage: `url(${secondaryImage})` }}
                          >
                        </div>
                      }
                    </div></div>

                  <div className="carousel-cell__text">
                    <h2
                      data-subtext={content.fragments["casestudy.homepage-slide-sub-heading"] && content.fragments["casestudy.homepage-slide-sub-heading"].value}>
                      {content.fragments["casestudy.homepage-slide-heading"] && content.fragments["casestudy.homepage-slide-heading"].value}
                    </h2>
                  </div>
                </Link>
              )
            })
          }
        </Flickity>
      )
    }
    return (
      <div id="carousel">
        {slider}
        <div className="arrow-container">
          <div className="arrow">
            <div className={leftArrowClasses} onClick={() => { this.goPrev() } }>
              <SVGLeftArrow width={67} height={30} className="left-arrow" />
            </div>
          </div>
          <div className="arrow">
            <div className={rightArrowClasses} onClick={() => { this.goNext() } }>
              <SVGRightArrow width={67} height={30} className="right-arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};