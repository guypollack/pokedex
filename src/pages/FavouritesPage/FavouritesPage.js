import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector } from 'react-redux';
import { selectAllPokemon } from '../../features/pokemon/pokemonSlice.js';
import { selectFavourites } from '../../features/favourites/favouritesSlice.js';
import { selectCurrentUser } from '../../features/users/usersSlice.js';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer.js';
import "./FavouritesPage.css";

export function FavouritesPage() {
  const currentUser = useSelector(selectCurrentUser);
  const allPokemon = useSelector(selectAllPokemon);
  const favourites = useSelector(selectFavourites)[currentUser];  
  const favouritePokemon = Object.fromEntries(Object.entries(allPokemon).filter(([key, value]) => favourites.includes(key)));


  return (
    <div>
      <NavBar />
      <div className="favourites-page">
        <h1>Favourites</h1>
        {currentUser === "guest" && <h3>Log in to add Pokémon to your favourites</h3>}
        {(favourites.length === 0 && currentUser !== "guest") && <h3>You don't have any favourites yet!</h3>}
        <PokemonFlexContainer allPokemon={favouritePokemon}/>
      </div>
    </div>
  )
}