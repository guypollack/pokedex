import React, { useEffect } from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectChangePasswordCurrentPassword, setChangePasswordCurrentPassword, selectChangePasswordNewPassword1, setChangePasswordNewPassword1, selectChangePasswordNewPassword2, setChangePasswordNewPassword2, selectChangePasswordWarning, setChangePasswordWarning, selectChangePasswordSuccessMessage, setChangePasswordSuccessMessage, changePassword, selectRenameUsername, setRenameUsername, selectRenamePassword, setRenamePassword, selectRenameWarning, selectRenameSuccessMessage, setRenameSuccessMessage, addUser, removeUser, setCurrentUser } from '../../features/users/usersSlice.js';
import { copyFavourites, removeUserFromFavourites } from '../../features/favourites/favouritesSlice.js';
import { useNavigate } from 'react-router';

export function MyAccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const currentPassword = useSelector(selectChangePasswordCurrentPassword);
  const newPassword1 = useSelector(selectChangePasswordNewPassword1);
  const newPassword2 = useSelector(selectChangePasswordNewPassword2);
  const changePasswordWarning = useSelector(selectChangePasswordWarning);
  const changePasswordSuccessMessage = useSelector(selectChangePasswordSuccessMessage);
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
      setTimeout(() => {
        dispatch(setRenameSuccessMessage(""));
      },2000);
    }
  },[renameSuccessMessage]);

  useEffect(() => {
    if (changePasswordSuccessMessage === "Password updated") {
      setTimeout(() => {
        dispatch(setChangePasswordSuccessMessage(""));
      },2000);
    }
  },[changePasswordSuccessMessage]);

  useEffect(() => {
    return () => {
      dispatch(setChangePasswordCurrentPassword(""));
      dispatch(setChangePasswordNewPassword1(""));
      dispatch(setChangePasswordNewPassword2(""));
      dispatch(setChangePasswordWarning(""));
      dispatch(setChangePasswordSuccessMessage(""));
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

  function handleChangePasswordCurrentPassword(e) {
    dispatch(setChangePasswordCurrentPassword(e.target.value));
  }

  function handleChangePasswordNewPassword1(e) {
    dispatch(setChangePasswordNewPassword1(e.target.value));
  }

  function handleChangePasswordNewPassword2(e) {
    dispatch(setChangePasswordNewPassword2(e.target.value));
  }

  function handleClickChangePassword(e) {
    dispatch(changePassword());
  }

  return (
    <div>
      <NavBar />
      <h2>This is the My Account Page</h2>
      <h3>{user}</h3>
      <h3>Change Password</h3>
      <label htmlFor="change-password-current">Current Password</label>
      <input type="password" id="change-password-current" value={currentPassword} onChange={handleChangePasswordCurrentPassword}></input>
      <label htmlFor="change-password-new-1">New Password</label>
      <input type="password" id="change-password-new-1" value={newPassword1} onChange={handleChangePasswordNewPassword1}></input>
      <label htmlFor="change-password-new-2">Retype New Password</label>
      <input type="password" id="change-password-new-2" value={newPassword2} onChange={handleChangePasswordNewPassword2}></input>
      <button onClick={handleClickChangePassword}>Update</button>
      <p>{changePasswordWarning}</p>
      <p>{changePasswordSuccessMessage}</p>
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