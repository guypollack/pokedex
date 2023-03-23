import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useNavigate } from 'react-router';
import { setCurrentUser, loginUser, addUser, selectLoginUsername, setLoginUsername, selectLoginPassword, setLoginPassword, selectLoginWarning, selectLoginSuccessMessage, setLoginSuccessMessage, selectCreateAccountUsername, setCreateAccountUsername, selectCreateAccountPassword, setCreateAccountPassword, selectCreateAccountPassword2, setCreateAccountPassword2, selectCreateAccountWarning, selectCreateAccountSuccessMessage, setCreateAccountSuccessMessage } from '../../features/users/usersSlice.js';
import { addUserToFavourites } from '../../features/favourites/favouritesSlice.js';
import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (e.target.id.includes("login-")) {
        handleClickLogin();
      } else if (e.target.id.includes("create-account-")) {
        handleClickCreateAccount();
      }
    }
  }

  useEffect(() => {
    if (loginSuccessMessage === "Login successful") {
      setTimeout(() => {
        dispatch(setCurrentUser(loginUsername));
        // navigate("/");
        navigate(-1);
      },1000)
    }
  },[loginSuccessMessage]);

  useEffect(() => {
    if (createAccountSuccessMessage === "Account created and logged in") {
      dispatch(addUserToFavourites(createAccountUsername));
      setTimeout(() => {
        dispatch(setCurrentUser(createAccountUsername));
        // navigate("/");
        navigate(-1);
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
      <div className="login-page">
        <h3>Login</h3>
        <label htmlFor="login-username">Username</label>
        <input type="text" id="login-username" value={loginUsername} onChange={handleChangeLoginUsername} onKeyDown={handleKeyDown}></input>
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password"  value={loginPassword} onChange={handleChangeLoginPassword} onKeyDown={handleKeyDown}></input>
        <button onClick={handleClickLogin}>Login</button>
        <p className="login-warning">{loginWarning}</p>
        <p className="login-success-message">{loginSuccessMessage}</p>
        <h3>Create account</h3>
        <label htmlFor="create-account-username">Username</label>
        <input type="text" id="create-account-username" value={createAccountUsername} onChange={handleChangeCreateAccountUsername} onKeyDown={handleKeyDown}></input>
        <label htmlFor="create-account-password">Password</label>
        <input type="password" id="create-account-password" value={createAccountPassword} onChange={handleChangeCreateAccountPassword} onKeyDown={handleKeyDown}></input>
        <label htmlFor="create-account-password-verify">Retype password</label>
        <input type="password" id="create-account-password-verify" value={createAccountPassword2} onChange={handleChangeCreateAccountPassword2} onKeyDown={handleKeyDown}></input>
        <button onClick={handleClickCreateAccount}>Create</button>
        <p className="create-account-warning">{createAccountWarning}</p>
        <p className="create-account-success-message">{createAccountSuccessMessage}</p>
      </div>
    </div>
  )
}