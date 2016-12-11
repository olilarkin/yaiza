// External modules
import React from 'react';
import { Link } from 'react-router'

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let slicesArray = [];
    const content = this.props.projects && this.props.projects
      .filter(doc => doc.uid === this.props.params.id)
      .map(doc => {
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
        {pageContentOutput}
      </div>
    );

  }
}

export default ProjectContainer
