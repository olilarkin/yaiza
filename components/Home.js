import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames';
import Carousel from './Carousel';
// import { Helmet } from "react-helmet";

const Home = (props) => {
  const { homepageMeta = {} } = props
  const { description = '', keywords = '' } = homepageMeta
  return (
    <div id="home">
      {/* <Helmet>
        <title>Yaiza&nbsp;| Home</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet> */}
      {props.hasLoaded &&
        <Carousel homepageContent={props.homepageContent} homepageSlide={props.homepageSlide} setHomepageSlide={props.setHomepageSlide} />
      }
    </div>
  )
}

export default Home;
