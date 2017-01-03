// React
import React from 'react'
import SVGLogo from './SVG/SVGLogo'
import NavIcon from './Header/NavIcon'
import NavLink from './NavLink'
import classNames from 'classnames'
import SVGYaizaLogo from './SVG/SVGYaizaLogo'
import { browserHistory } from 'react-router'

const Nav = (props) => {
  const navClassNames = classNames({
    'nav-container': true,
    'active': props.menuIsOpen
  });

  const navOutput = props.projects && props.projects
    .filter(item => item.uid !== 'about-me')
    .map((item, key) => {
      return (
        <li key={key}><NavLink pathname={props.pathname} toggleMenu={props.toggleMenu} url={`/projects/${item.uid}`}>{item.fragments["casestudy.homepage-slide-heading"].value}</NavLink></li>)
    });


  return (
    <div className={navClassNames}>
      <div className="nav-info">
        <h3>Yaiza Gardner</h3>
        <small>Design, Illustration &amp; Art direction</small>
        <p><a href="mailto:info@yaiza.co.uk">info@yaiza.co.uk</a></p>
      </div>
      <ul className="nav">
        <li><NavLink pathname={props.pathname} toggleMenu={props.toggleMenu} url="/projects/about-me">About me</NavLink></li>
        <li><NavLink pathname={props.pathname} toggleMenu={props.toggleMenu} url="/projects">View all projects</NavLink></li>
        {navOutput}
      </ul>
      <SVGYaizaLogo width={350} height={115} className="nav-logo" />
    </div>
  );
}

export default Nav;
