import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HomePage } from './pages/HomePage/HomePage.js';
import { Page1 } from './pages/Page1.js';
import { Page2 } from './pages/Page2.js';
import { PokemonPage } from './pages/PokemonPage/PokemonPage.js';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage.js';
import { LoginPage } from './pages/LoginPage/LoginPage.js';
import { MyAccountPage } from './pages/MyAccountPage/MyAccountPage.js'; 
import { GamePage } from './pages/GamePage/GamePage.js';
import Sound from 'react-sound';
import PokemonCenterMusic from  "../src/resources/sounds/pokemon-center.mp3";
import GameboyStartupSound from  "../src/resources/sounds/gameboy-startup.mp3";
import { selectFontStyle, selectFontSwitches, selectPlayStatus } from './features/design/designSlice.js';
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
    path: "/pokemon/:number",
    element: <PokemonPage />
  },
  {
    path: "/pokemon/*",
    element: <Navigate to="/pokemon/1" />
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
  },
  {
    path: "/game",
    element: <GamePage />
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);



function App() {
  const fontStyle = useSelector(selectFontStyle);
  const playStatus = useSelector(selectPlayStatus);
  const fontSwitches = useSelector(selectFontSwitches);
  return (
    <div>
      <Sound url={GameboyStartupSound} playStatus={(fontStyle !== "normal" && fontSwitches < 2) ? "PLAYING" : "PAUSED"} playbackRate={1} volume={20} loop={false} />
      <Sound url={PokemonCenterMusic} playStatus={fontStyle === "normal" ? "PAUSED" : playStatus} playbackRate={0.85} volume={20} loop={true} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
