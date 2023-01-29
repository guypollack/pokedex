import React from 'react';
import { MyButton } from './MyButton';

export function NavBar() {
  return (
    <div class="nav-bar">
      <MyButton location='/' name='Home' />
      <MyButton location='/page1' name='Page 1' />
      <MyButton location='/page2' name='Page 2' />
    </div>
  )
}