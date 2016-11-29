import React from 'react';
var Flickity = require('react-flickity-component')(React);

const flickityOptions = {
  initialIndex: 0,
  cellSelector: '.carousel-cell',
  accessibility: true,
  pageDots: true,
  prevNextButtons: false,
  wrapAround: true
}

export default () => (
  <Flickity
    className={'carousel'} // default '' 
    elementType={'div'} // default 'div' 
    options={flickityOptions} // takes flickity options {} 
    disableImagesLoaded={false} // default false 
    >
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-baroque.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-eurotunnel.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-ferrari.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-link.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-maserati.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-me.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-nexio.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-rako.jpg)'}} />
    </div>
    <div className="carousel-cell">
      <div style={{backgroundImage: 'url(/assets/homepage/homepage-transport.jpg)'}} />
    </div>
  </Flickity>
);