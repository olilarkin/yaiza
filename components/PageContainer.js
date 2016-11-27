// External modules
import React from 'react';
import NavLink from './NavLink'

class PageContainer extends React.Component {
  constructor() {
    super();
    this.slicesArray = [];
    this.pageContent;
  }
  render() {
    const content = this.props.data && this.props.data.map((doc) => {
      switch (doc.type) {
        case 'casestudy':
          for (let slice of doc.getSliceZone('casestudy.contentArea').slices) {
            console.log('slice', slice);
            this.slicesArray.push(slice);
          };
          break;
        case 'page':
          this.pageContent = doc.getStructuredText('page.description').asHtml();
          break;
      };
    });

    const pageContentOutput = this.slicesArray.length
      ? this.slicesArray.map((slice, index) => {
        return (<div key={index} dangerouslySetInnerHTML={{ __html: slice.asHtml() }} />);
      })
      : (<div dangerouslySetInnerHTML={{ __html: this.pageContent }} />);

    return (
      <div>
        <NavLink to="/">Home</NavLink>
        {pageContentOutput}
      </div>
    );

  }
}

export default PageContainer
