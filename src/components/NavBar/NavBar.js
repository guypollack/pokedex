import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

export function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/page1'>Page 1</NavLink>
      <NavLink to='/page2'>Page 2</NavLink>
      <NavLink to='/guest/favourites'>Favourites</NavLink>
    </div>
  )
}