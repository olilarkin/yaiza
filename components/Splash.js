import React from 'react'
import SVGYaizaLogo from './SVG/SVGYaizaLogo'
import classnames from 'classnames';

export default (props) => {
  const splashClasses = classnames({
    'active': !props.hideSplash,
    'splash-container': true
  });
  return (
    <div>
      <div className={splashClasses} onClick={props.handleHideSplash}>
        <div className="splash-container__logo">
          {/*<img src="assets/yaiza-logo.svg" className="yaiza-logo img-responsive" />*/}
          <SVGYaizaLogo width={350} height={115} className="yaiza-logo" />
          <div className="splash-container__strapline">
            <p>DESIGN, ILLUSTRATION &amp; ART DIRECTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}
