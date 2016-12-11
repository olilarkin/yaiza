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
          <SVGYaizaLogo width={336} height={97} className="yaiza-logo" />
          <div className="splash-container__strapline">
            <p>DESIGN, ILLUSTRATION &amp; ART DIRECTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}
