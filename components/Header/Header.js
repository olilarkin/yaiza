// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import { Link } from 'react-router'

const Header = (props) => (
  <div className="header">
    <div className="row">
      <div className="col-sm-2"><Link to="/"><SVGLogo width={33} height={34} className="logo" /></Link></div>
      <div className="col-sm-8"><p className="strapline">Design, Illustration &amp; Art Direction</p></div>
      <div className="col-sm-2">
        <div className="menu-container" onClick={props.toggleMenu}>
          <div className="menu-text">Menu</div>
          <NavIcon {...props} />
        </div>
      </div>
    </div>
  </div>
);

export default Header;