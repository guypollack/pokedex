import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js'

export function LoginPage() {
  return (
    <div>
      <NavBar />
      <h2>This is the Login Page</h2>
      <label htmlFor="login-username">Username</label>
      <input type="text"></input>
      <label htmlFor="login-username">Password</label>
      <input type="password"></input>
    </div>
  )
}