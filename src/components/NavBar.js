import React from 'react';
import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/page1'>Page 1</NavLink>
      <NavLink to='/page2'>Page 2</NavLink>
    </div>
  )
}