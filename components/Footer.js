import React from 'react';
import SVGFBLogo from './SVG/SVGFBLogo'
import SVGInstaLogo from './SVG/SVGInstaLogo'
import SVGLinkedInLogo from './SVG/SVGLinkedInLogo'

const year = (new Date()).getFullYear()

const Footer = () => (
  <div id="footer" className="container">
      <a href="https://www.facebook.com/YaizaGraphics/"><SVGFBLogo /></a>
      <a href="https://www.instagram.com/yaizagraphics/"><SVGInstaLogo /></a>
      <a href="https://www.linkedin.com/in/yaiza-gardner-423b062a/"><SVGLinkedInLogo /></a>
      <p>&copy;{year} Yaiza Gardner | All Rights Reserved</p>
  </div>
);

export default Footer;
