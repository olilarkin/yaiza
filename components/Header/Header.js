// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import Nav from './Nav'
import { Link } from 'react-router'
import classNames from 'classnames'

const Header = (props) => {
  const menuContainerClasses = classNames({
    'menu-container': true,
    active: props.menuIsOpen
  });
  const logoClasses = classNames({
    logo: true,
    active: props.menuIsOpen
  });
  return (
    <div className="header">
      <div className="row">
        <Link to="/" className="logo-link"><SVGLogo width={33} height={34} className={logoClasses} /></Link>
        <div className="hidden-xs col-sm-12"><p className="strapline">Design, Illustration &amp; Art Direction</p></div>
        <div className={menuContainerClasses} onClick={props.toggleMenu}>
          <div className="menu-text">Menu</div>
          <NavIcon {...props} />
        </div>
      </div>
      <Nav menuIsOpen={props.menuIsOpen} />
    </div>
  );
};

export default Header;