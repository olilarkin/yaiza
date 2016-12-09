// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import Nav from './Nav'
import NavLink from '../NavLink'
import classNames from 'classnames'

const Header = (props) => {
  const headerClasses = classNames({
    header: true,
    active: props.menuIsOpen
  });
  return (
    <div className={headerClasses}>
      <div className="row">
        <NavLink url="/" className="logo-link" toggleMenu={props.toggleMenu.bind(null)} willToggle={props.menuIsOpen}>
          <SVGLogo width={33} height={34} className="logo" />
        </NavLink>
        <div className="hidden-xs strapline"><p>Design, Illustration &amp; Art Direction</p></div>
        <div className="menu-button-container" onClick={props.toggleMenu}>
          <div className="menu-text">Menu</div>
          <NavIcon {...props} />
        </div>
      </div>
      <Nav {...props} />
    </div>
  );
};

export default Header;