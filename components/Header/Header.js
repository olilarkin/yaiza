// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'

const Header = (props) => (
  <div className="header">
    <div className="row">
      <div className="col-sm-2"><SVGLogo width={34} height={33} className="logo" /></div>
      <div className="col-sm-8"><p>Design, Illustration &amp; Art Direction</p></div>
      <div className="col-sm-2">Menu <NavIcon {...props} /></div>
    </div>
  </div>
);

export default Header;