import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavourites } from '../../features/favourites/favouritesSlice';
import { selectCurrentUser, setCurrentUser } from '../../features/users/usersSlice';
import "./NavBar.css";

export function NavBar() {
  const dispatch = useDispatch();
  const favouritesNumber = useSelector(selectFavourites).length;
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="nav-bar">
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/page1'>Page 1</NavLink>
      <NavLink to='/page2'>Page 2</NavLink>
      <NavLink to='/guest/favourites'>Favourites{favouritesNumber > 0 ? `(${favouritesNumber})` : ""}</NavLink>
      {(currentUser !== "guest") && <NavLink to='/myaccount'>My Account</NavLink>}
      {(currentUser === "guest") && <NavLink to='/login'>Login</NavLink>}
      {(currentUser !== "guest") && <NavLink to="/" onClick={() => dispatch(setCurrentUser("guest"))}>Logout</NavLink>}
    </div>
  )
}