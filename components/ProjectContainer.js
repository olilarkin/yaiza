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
        slicesArray.push(slice);
      };
    });

    const pageContentOutput = slicesArray.length
      ? slicesArray.map((slice, index) => {
        console.log('slice', slice);
        let html;
        switch(slice.sliceType){
          case 'header':
            html = `<h1>${slice.value.blocks["0"].text}</h1>`;
          break;
          case 'content':
            html = `<p>${slice.value.blocks["0"].text}</p>`;
          break;
          case 'video':
            html = `<iframe width="1280" height="720" src="https://www.youtube-nocookie.com/embed/${slice.value.value}?rel=0&controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>`;
          break;
        }
        return (<div key={index} dangerouslySetInnerHTML={{ __html: html }} />);
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
