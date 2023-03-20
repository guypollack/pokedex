import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCurrentUser } from '../../features/users/usersSlice';
import { selectFavourites } from '../../features/favourites/favouritesSlice';
import { PageControls } from '../PageControls/PageControls';
import "./NavBar.css";

export function NavBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const favouritesNumber = useSelector(selectFavourites)[currentUser].length;
  return (
    <div className="nav-bar">
      <NavLink to='/'>Home</NavLink>
      {/* <NavLink to='/page1'>Page 1</NavLink> */}
      {/* <NavLink to='/page2'>Page 2</NavLink> */}
      <NavLink to='/favourites'>Favourites{favouritesNumber > 0 ? `(${favouritesNumber})` : ""}</NavLink>
      {(currentUser !== "guest") && <NavLink to="/game">Game</NavLink>}
      {(currentUser !== "guest") && <NavLink to='/myaccount'>My Account</NavLink>}
      {(currentUser === "guest") && <NavLink to='/login'>Login</NavLink>}
      {(currentUser !== "guest") && <NavLink to="/" onClick={() => dispatch(setCurrentUser("guest"))}>Logout</NavLink>}
      <PageControls /> 
    </div>
  )
}