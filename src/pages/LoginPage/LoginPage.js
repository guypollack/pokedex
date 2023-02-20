import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useNavigate } from 'react-router';
import { selectUsers, setCurrentUser, addUser, selectCreateAccountUsername, setCreateAccountUsername, selectCreateAccountPassword, setCreateAccountPassword, selectCreateAccountPassword2, setCreateAccountPassword2, selectWarning, selectSuccessMessage, setSuccessMessage } from '../../features/users/usersSlice.js';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const createAccountUsername = useSelector(selectCreateAccountUsername);
  const createAccountPassword = useSelector(selectCreateAccountPassword);
  const createAccountPassword2 = useSelector(selectCreateAccountPassword2);
  const warning = useSelector(selectWarning);
  const successMessage = useSelector(selectSuccessMessage);

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
    dispatch(addUser());
  }

  useEffect(() => {
    if (successMessage === "Account created and logged in") {
      setTimeout(() => {
        dispatch(setSuccessMessage(""));
        dispatch(setCurrentUser(users[users.length -1]["username"]));
        navigate("/");
      },2000)
    }
  },[successMessage]);

  return (
    <div>
      <NavBar />
      <h2>This is the Login Page</h2>
      <h3>Login</h3>
      <label htmlFor="login-username">Username</label>
      <input type="text"></input>
      <label htmlFor="login-password">Password</label>
      <input type="password"></input>
      <h3>Create account</h3>
      <label htmlFor="create-account-username">Username</label>
      <input type="text" value={createAccountUsername} onChange={handleChangeCreateAccountUsername}></input>
      <label htmlFor="create-account-password">Password</label>
      <input type="password" value={createAccountPassword} onChange={handleChangeCreateAccountPassword}></input>
      <label htmlFor="create-account-password-very">Retype password</label>
      <input type="password" value={createAccountPassword2} onChange={handleChangeCreateAccountPassword2}></input>
      <button onClick={handleClickCreateAccount}>Create Account</button>
      <p className="create-account-warning">{warning}</p>
      <p id="success-message" className="create-account-success-message">{successMessage}</p>
    </div>
  )
}