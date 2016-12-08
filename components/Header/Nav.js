// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import NavLink from '../NavLink'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

const Nav = (props) => {
  const navClassNames = classNames({
    'nav-container': true,
    'active': props.menuIsOpen
  });


  const navOutput = props.caseStudies && props.caseStudies.map((item, key) => {
    return (
      <li key={key}><NavLink toggleMenu={props.toggleMenu} url={`/case-studies/${item.uid}`}>{item.fragments["casestudy.homepage-slide-heading"].value}</NavLink></li>)
  });


  return (
    <div className={navClassNames}>
      <ul className="nav">
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies">All Case studies</NavLink></li>
        {navOutput}
      </ul>
    </div>
  );
}

export default Nav;