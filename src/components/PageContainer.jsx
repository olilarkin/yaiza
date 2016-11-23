'use strict';
// External modules
import React from 'react';
import 'prismic-react';

class PageContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    const caseStudies = this.props.data && this.props.data.map((doc, key) => {
      return (<div
        key={key}
        dangerouslySetInnerHTML={{ __html: doc.asHtml() }} />)
      // for (let slice of doc.getSliceZone('casestudy.contentArea')) {
          
      // };
    });

    return (
      <div>
        {caseStudies}
      </div>
    );
  }
}

export default PageContainer
