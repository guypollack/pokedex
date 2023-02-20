import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/users/usersSlice.js';

export function MyAccountPage() {
  const user = useSelector(selectCurrentUser);
  return (
    <div>
      <NavBar />
      <h2>This is the My Account Page</h2>
      <h3>{user}</h3>
    </div>
  )
}