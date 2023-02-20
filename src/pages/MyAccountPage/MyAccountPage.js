import React, { useEffect } from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/users/usersSlice.js';
import { useNavigate } from 'react-router';

export function MyAccountPage() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user === "guest") {
      navigate("/");
    }
  })

  return (
    <div>
      <NavBar />
      <h2>This is the My Account Page</h2>
      <h3>{user}</h3>
    </div>
  )
}