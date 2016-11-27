// External modules
import React from 'react';
import { Link } from 'react-router'

class CaseStudiesContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    let slicesArray = [];
    const content = this.props.caseStudies && this.props.caseStudies.map((doc) => {
      // map through each slice and output into array
      for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
        console.log('slice', slice);
        slicesArray.push(slice);
      };
    });

    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        return (<div key={index} dangerouslySetInnerHTML={{ __html: slice.asHtml() }} />);
      })
      : null;

    return (
      <div>
        <p>
          <Link to="/case-studies/test-page">Test page</Link>
        </p>
        {pageContentOutput}
      </div>
    );

  }
}

export default CaseStudiesContainer
