import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, useNavigate } from "react-router-dom";
import { HomePage } from './pages/HomePage.js';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/page1",
    element: <h1>This is page 1</h1>,
  },
  {
    path: "/page2",
    element: <h1>This is page 2</h1>,
  }
]);



function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
