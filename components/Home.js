import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames';

export default (props) => {
  const content = props.homePage && props.homePage.getStructuredText('homepage.strapline').asHtml();
  const homePageStrapline = (<div dangerouslySetInnerHTML={{ __html: content }} />);
  const splashClasses = classnames({
    'active': props.isLoading,
    'splash-container': true
  });
  return (
    <div>
      <div className={splashClasses}>
        <div className="splash-container__logo">
          <img src="assets/logo-large.png" className="img-responsive" />
          <div className="splash-container__strapline">
            <p>DESIGN, ILLUSTRATION &amp; ART DIRECTION</p>
          </div>
        </div>
      </div>

      <p><Link to='/case-studies'>Case studies</Link></p>
    </div>
  )
}
