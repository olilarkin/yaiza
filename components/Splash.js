import React from 'react'
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
          <img src="assets/logo-large.png" className="img-responsive" />
          <div className="splash-container__strapline">
            <p>DESIGN, ILLUSTRATION &amp; ART DIRECTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}
