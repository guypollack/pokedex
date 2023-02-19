import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, useNavigate } from "react-router-dom";
import { HomePage } from './pages/HomePage/HomePage.js';
import { Page1 } from './pages/Page1.js';
import { Page2 } from './pages/Page2.js';
import { PokemonPage } from './pages/PokemonPage.js';
import { Favourites } from './pages/Favourites/Favourites.js';
import { LoginPage } from './pages/LoginPage/LoginPage.js';
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
    path: "/pokemon/:pokemonName",
    element: <PokemonPage />
  },
  {
    path: "/guest/favourites",
    element: <Favourites />
  },
  {
    path: "/login",
    element: <LoginPage />
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
