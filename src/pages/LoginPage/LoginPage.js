import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useNavigate } from 'react-router';
import { selectUsers, setCurrentUser, loginUser, addUser, selectLoginUsername, setLoginUsername, selectLoginPassword, setLoginPassword, selectLoginWarning, setLoginWarning, selectLoginSuccessMessage, setLoginSuccessMessage, selectCreateAccountUsername, setCreateAccountUsername, selectCreateAccountPassword, setCreateAccountPassword, selectCreateAccountPassword2, setCreateAccountPassword2, selectCreateAccountWarning, selectCreateAccountSuccessMessage, setCreateAccountSuccessMessage } from '../../features/users/usersSlice.js';
import { addUserToFavourites } from '../../features/favourites/favouritesSlice.js';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loginUsername = useSelector(selectLoginUsername);
  const loginPassword = useSelector(selectLoginPassword);
  const loginWarning = useSelector(selectLoginWarning);
  const loginSuccessMessage = useSelector(selectLoginSuccessMessage);
  const createAccountUsername = useSelector(selectCreateAccountUsername);
  const createAccountPassword = useSelector(selectCreateAccountPassword);
  const createAccountPassword2 = useSelector(selectCreateAccountPassword2);
  const createAccountWarning = useSelector(selectCreateAccountWarning);
  const createAccountSuccessMessage = useSelector(selectCreateAccountSuccessMessage);

  function handleChangeLoginUsername(e) {
    dispatch(setLoginUsername(e.target.value));
  }

  function handleChangeLoginPassword(e) {
    dispatch(setLoginPassword(e.target.value));
  }

  function handleClickLogin() {
    dispatch(loginUser());
  }

  function handleChangeCreateAccountUsername(e) {
    dispatch(setCreateAccountUsername(e.target.value));
  }

  function handleChangeCreateAccountPassword(e) {
    dispatch(setCreateAccountPassword(e.target.value));
  }

  function handleChangeCreateAccountPassword2(e) {
    dispatch(setCreateAccountPassword2(e.target.value));
  }

  function handleClickCreateAccount() {
    dispatch(addUser({type: "newUser"}));
  }

  useEffect(() => {
    if (loginSuccessMessage === "Login successful") {
      setTimeout(() => {
        dispatch(setCurrentUser(loginUsername));
        navigate("/");
      },1000)
    }
  },[loginSuccessMessage]);

  useEffect(() => {
    if (createAccountSuccessMessage === "Account created and logged in") {
      dispatch(addUserToFavourites(createAccountUsername));
      setTimeout(() => {
        dispatch(setCurrentUser(createAccountUsername));
        navigate("/");
      },1000)
    }
  },[createAccountSuccessMessage]);

  useEffect(() => {
    return () => {
      dispatch(setLoginSuccessMessage(""));
      dispatch(setLoginUsername(""));
      dispatch(setLoginPassword(""));
      dispatch(setCreateAccountSuccessMessage(""));
      dispatch(setCreateAccountUsername(""));
      dispatch(setCreateAccountPassword(""));
      dispatch(setCreateAccountPassword2(""));
    }
  },[])

  return (
    <div>
      <NavBar />
      <h2>This is the Login Page</h2>
      <h3>Login</h3>
      <label htmlFor="login-username">Username</label>
      <input type="text" value={loginUsername} onChange={handleChangeLoginUsername}></input>
      <label htmlFor="login-password">Password</label>
      <input type="password" value={loginPassword} onChange={handleChangeLoginPassword}></input>
      <button onClick={handleClickLogin}>Login</button>
      <p className="login-warning">{loginWarning}</p>
      <p className="login-success-message">{loginSuccessMessage}</p>
      <h3>Create account</h3>
      <label htmlFor="create-account-username">Username</label>
      <input type="text" value={createAccountUsername} onChange={handleChangeCreateAccountUsername}></input>
      <label htmlFor="create-account-password">Password</label>
      <input type="password" value={createAccountPassword} onChange={handleChangeCreateAccountPassword}></input>
      <label htmlFor="create-account-password-very">Retype password</label>
      <input type="password" value={createAccountPassword2} onChange={handleChangeCreateAccountPassword2}></input>
      <button onClick={handleClickCreateAccount}>Create Account</button>
      <p className="create-account-warning">{createAccountWarning}</p>
      <p className="create-account-success-message">{createAccountSuccessMessage}</p>
    </div>
  )
}