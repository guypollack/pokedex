import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, useNavigate } from "react-router-dom";
import { HomePage } from './pages/HomePage/HomePage.js';
import { Page1 } from './pages/Page1.js';
import { Page2 } from './pages/Page2.js';
import { PokemonPage } from './pages/PokemonPage.js';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage.js';
import { LoginPage } from './pages/LoginPage/LoginPage.js';
import { MyAccountPage } from './pages/MyAccountPage/MyAccountPage.js'; 
import './App.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/page1",
    element: <Page1 />,
  },
  {
    path: "/page2",
    element: <Page2 />,
  },
  {
    path: "/pokemon/:pokemonNumber",
    element: <PokemonPage />
  },
  {
    path: "/favourites",
    element: <FavouritesPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/myaccount",
    element: <MyAccountPage /> 
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
