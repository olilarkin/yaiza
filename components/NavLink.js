// modules/NavLink.js
import React from 'react'
import { browserHistory } from 'react-router'

const NavLink = (props) => {
  const navigate = (url, evt) => {
    browserHistory.push(url);
    props.toggleMenu(evt);
  };
  return (<a href="#" onClick={ navigate.bind(this, props.url)}>{props.children}</a>);
}

export default NavLink;