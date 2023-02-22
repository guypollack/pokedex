import React, { useEffect } from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectRenameUsername, setRenameUsername, selectRenamePassword, setRenamePassword, selectRenameWarning, selectRenameSuccessMessage, setRenameSuccessMessage, addUser, removeUser, setCurrentUser } from '../../features/users/usersSlice.js';
import { copyFavourites, removeUserFromFavourites } from '../../features/favourites/favouritesSlice.js';
import { useNavigate } from 'react-router';

export function MyAccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const renameUsername = useSelector(selectRenameUsername);
  const renamePassword = useSelector(selectRenamePassword);
  const renameWarning = useSelector(selectRenameWarning);
  const renameSuccessMessage = useSelector(selectRenameSuccessMessage);

  useEffect(() => {
    if (user === "guest") {
      navigate("/");
    }
  })

  useEffect(() => {
    if (renameSuccessMessage.slice(0,19) === "Username changed to") {
      dispatch(copyFavourites({"user1": user, "user2": renameUsername}));
      dispatch(removeUserFromFavourites({"username": user}));
      dispatch(removeUser(user));
      dispatch(setCurrentUser(renameUsername));
      dispatch(setRenameUsername(""));
      dispatch(setRenamePassword(""));
    }
  },[renameSuccessMessage])

  useEffect(() => {
    return () => {
      dispatch(setRenameUsername(""));
      dispatch(setRenamePassword(""));
      dispatch(setRenameSuccessMessage(""));
    }
  },[])

  function handleChangeRenameUsername(e) {
    dispatch(setRenameUsername(e.target.value));
  }

  function handleChangeRenamePassword(e) {
    dispatch(setRenamePassword(e.target.value));
  }

  function handleClickUpdateUsername(e) {
    dispatch(addUser({"type": "renameUser"}));
  }

  return (
    <div>
      <NavBar />
      <h2>This is the My Account Page</h2>
      <h3>{user}</h3>
      <h3>Update Username</h3>
      <label htmlFor="rename-user-current-username">Current Username</label>
      <input id="rename-user-current-username" type="text" value={user} disabled></input>
      <label htmlFor="rename-user-password">Password</label>
      <input type="password" id="rename-user-password" value={renamePassword} onChange={handleChangeRenamePassword}></input>
      <label htmlFor="rename-user-new-username">New Username</label>
      <input type="text" id="rename-user-new-username" value={renameUsername} onChange={handleChangeRenameUsername}></input>
      <button onClick={handleClickUpdateUsername}>Update</button>
      <p>{renameWarning}</p>
      <p>{renameSuccessMessage}</p>
    </div>
  )
}