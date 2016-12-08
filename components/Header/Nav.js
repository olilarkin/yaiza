// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import NavLink from '../NavLink'
import classNames from 'classnames'

const Nav = (props) => {
  const navClassNames = classNames({
    'nav-container': true,
    'active': props.menuIsOpen
  })
  return (
    <div className={navClassNames}>
      <ul className="nav">
        <li><NavLink to="/about">My Story</NavLink></li>
        <li><NavLink to="" />Case studies</li>
        <li><NavLink to="" />Maserati</li>
        <li><NavLink to="" />Ferrari</li>
        <li><NavLink to="" />Nexio</li>
        <li><NavLink to="" />Eurotunnel</li>
        <li><NavLink to="" />Rako</li>
        <li><NavLink to="" />Link Medical</li>
        <li><NavLink to="" />Oxford Baroque</li>
        <li><NavLink to="" />Transpor For London</li>
      </ul>
    </div>
  );
}

export default Nav;