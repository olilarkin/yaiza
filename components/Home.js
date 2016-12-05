import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames';
import Carousel from './Carousel';
import Splash from './Splash';

const Home = (props) => {

  return (
    <div>
      {/*<Splash {...props} />*/}
      {props.hasLoaded && <Carousel />}
    </div>
  )
}

export default Home;
