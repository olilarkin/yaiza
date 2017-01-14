import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames';
import Carousel from './Carousel';
import Splash from './Splash';

const Home = (props) => {

  return (
    <div id="home">
      <Splash {...props} />
      {props.hasLoaded && 
        <Carousel homepageContent={props.homepageContent} homepageSlide={props.homepageSlide} setHomepageSlide={props.setHomepageSlide} />
      }
    </div>
  )
}

export default Home;
