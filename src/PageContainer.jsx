'use strict';
// External modules
import React from 'react'
import Prismic from 'prismic.io'

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getPrismicData = this.getPrismicData.bind(this);
  }

  
  componentWillMount() {
    this.getPrismicData();
  }
  


  getPrismicData() {
    Prismic.api('https://yaiza.prismic.io/api').then(function (api) {
      return api.query(''); // An empty query will return all the documents
    }).then(function (response) {
      console.log('Documents: ', response.results);
    }, function (err) {
      console.log('Something went wrong: ', err);
    });
  }
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

export default PageContainer
