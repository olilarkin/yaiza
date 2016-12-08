// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import Nav from './Nav'
import { Link } from 'react-router'
import classNames from 'classnames'

const Header = (props) => {
  const headerClasses = classNames({
    header: true,
    active: props.menuIsOpen
  });
  return (
    <div className={headerClasses}>
      <div className="row">
        <Link to="/" className="logo-link"><SVGLogo width={33} height={34} className="logo" /></Link>
        <div className="hidden-xs strapline"><p>Design, Illustration &amp; Art Direction</p></div>
        <div className="menu-button-container" onClick={props.toggleMenu}>
          <div className="menu-text">Menu</div>
          <NavIcon {...props} />
        </div>
      </div>
      <Nav menuIsOpen={props.menuIsOpen} toggleMenu={props.toggleMenu} />
    </div>
  );
};

export default Header;