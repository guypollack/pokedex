import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'

export function LoginPage() {
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
      <input type="text"></input>
      <label htmlFor="create-account-password">Password</label>
      <input type="password"></input>
      <label htmlFor="create-account-password-very">Retype password</label>
      <input type="password"></input>
    </div>
  )
}