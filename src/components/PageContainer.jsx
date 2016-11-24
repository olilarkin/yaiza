'use strict';
// External modules
import React from 'react';
import 'prismic-react';

class PageContainer extends React.Component {
  constructor() {
    super();
    this.slicesArray = [];
  }
  render() {
    const caseStudies = this.props.data && this.props.data.map((doc) => {
      for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
        console.log('slice', slice);
        this.slicesArray.push(slice);
      };
    });

    const slicesOutput = this.slicesArray.map((slice, index) => {
      return (<div key={index} dangerouslySetInnerHTML={{ __html: slice.asHtml() }} />);
    })

    return (
      <div>
        {slicesOutput }
      </div>
    );
  }
}

export default PageContainer
