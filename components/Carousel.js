import React from 'react';
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
    this.checkArrows = this.checkArrows.bind(this);
    this.state = {
      isLeftArrowVisible: false,
      isRightArrowVisible: true
    }
  }

  componentDidMount() {
    this.checkArrows();
    this.sliderInstance.flkty.once('select', () => {
      this.checkArrows();
    });
  }

  componentWillUnmount() {
    this.sliderInstance.flkty.off('select');
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
              const url = `/projects/${content.uid}`;
              return (
                <Link to={url} onClick={this.props.setHomepageSlide.bind(this, key)} className="carousel-cell" key={key} data-effect={effect}>
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