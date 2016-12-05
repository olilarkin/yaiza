// React
import React from 'react'
import classNames from 'classnames'

const NavIcon = (props) => {
    console.log('propsd', props);
  const menuClasses = classNames({
    cross: true,
    open: props.menuIsOpen
  })
  return (
    <div className="toggle" id="navMenuToggleButton" onClick={props.toggleMenu}>
      <a href="#" className={menuClasses}><span></span></a>
    </div>
  );
};

export default NavIcon;