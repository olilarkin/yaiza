// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import NavLink from '../NavLink'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

const Nav = (props) => {
  const navClassNames = classNames({
    'nav-container': true,
    'active': props.menuIsOpen
  });

  return (
    <div className={navClassNames}>
      <ul className="nav">
        <li><NavLink toggleMenu={props.toggleMenu} url="/about">My Story</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies">All Case studies</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/maserati">Maserati</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/ferrari">Ferrari</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/nexio">Nexio</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/eurtunnel">Eurotunnel</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/rako">Rako</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/link-medical">Link Medical</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/oxford-baroque">Oxford Baroque</NavLink></li>
        <li><NavLink toggleMenu={props.toggleMenu} url="/case-studies/transport-for-london">Transport For London</NavLink></li>
      </ul>
    </div>
  );
}

export default Nav;