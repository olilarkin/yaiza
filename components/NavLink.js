// modules/NavLink.js
import React from 'react'
import { browserHistory } from 'react-router'

const NavLink = (props) => {
  const navigate = (url, willToggle, evt) => {
    browserHistory.push(url);
    if (willToggle) {
      props.toggleMenu(evt);
    }
  };
  const linkClasses = 'nav-link ' + (props.className || '');
  return (<div className={linkClasses} onClick={navigate.bind(this, props.url, props.willToggle)}>{props.children}</div>);
}

NavLink.defaultProps = {
  willToggle: true
}

export default NavLink;