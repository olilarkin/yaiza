import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  const content = props.homePage && props.homePage.getStructuredText('homepage.strapline').asHtml();
  const homePageOutput = (<div dangerouslySetInnerHTML={{ __html: content }} />);
  return (
    <div>
      {homePageOutput}
      <p><Link to='/case-studies'>Case studies</Link></p>
    </div>
  )
}
