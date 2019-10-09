// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import NavLink from '../NavLink'
import classNames from 'classnames'
import SVGFBLogo from '../SVG/SVGFBLogo'
import SVGInstaLogo from '../SVG/SVGInstaLogo'
import SVGLinkedInLogo from '../SVG/SVGLinkedInLogo'

const Header = (props) => {
  const headerClasses = classNames({
    header: true,
    active: props.headerIsActive || props.menuIsOpen
  });
  return (
    <div className={headerClasses}>
      <div className="container">
        <NavLink url="/" className="logo-link" toggleMenu={props.toggleMenu.bind(null)} willToggle={props.menuIsOpen}>
          <SVGLogo width={33} height={34} className="logo" />
        </NavLink>
        {props.pathname === '/' &&
          <div className="hidden-xs strapline"><p>Design, Illustration &amp; Art Direction</p></div>}
        <div className="menu-button-container" onClick={props.toggleMenu}>
          <NavIcon {...props} />
        </div>
        <a href="https://www.facebook.com/YaizaGraphics/"><SVGFBLogo /></a>
        <a href="https://www.instagram.com/yaizagraphics/"><SVGInstaLogo /></a>
        <a href="https://www.linkedin.com/in/yaiza-gardner-423b062a/"><SVGLinkedInLogo /></a>
      </div>
    </div>
  );
};

export default Header;
