import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addPokemonToQuestions, setAllNames, selectRound, selectScore, selectQuestionPokemon, selectIsGameFinished, resetGame } from '../../features/game/gameSlice';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { fetchAllPokemonAsync, selectAllPokemon, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, setFilteredPokemonSnapshot, selectSearchTerm } from '../../features/pokemon/pokemonSlice';
import { GamePageScoreContainer } from '../../components/GamePageScoreContainer/GamePageScoreContainer';
import { GamePagePicture } from '../../components/GamePagePicture/GamePagePicture';
import { GuessBar } from '../../components/GuessBar/GuessBar';
import { NewGameButton } from '../../components/NewGameButton/NewGameButton';
import { setOnGamePage } from '../../features/game/gameSlice';
import "./GamePage.css";

export function GamePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const allPokemon = useSelector(selectAllPokemon);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const searchTerm = useSelector(selectSearchTerm);
  const questionPokemon = useSelector(selectQuestionPokemon);
  const round = useSelector(selectRound);
  const score = useSelector(selectScore);
  const isGameFinished = useSelector(selectIsGameFinished);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user === "guest") {
      navigate("/");
    }
  })

  useEffect(() => {
    dispatch(setOnGamePage(true));
    return () => {
      dispatch(setOnGamePage(false));
      dispatch(resetGame());
    }
  },[]);

  useEffect(() => {
    if (!allPokemonFetched) {
      dispatch(fetchAllPokemonAsync());
    } else {
      const allNames = Object.values(allPokemon).map(pokemon => pokemon["name"]);
      dispatch(setAllNames(allNames));
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 1009) + 1;
        const pokemonData = {"number": randomNumber, "name": allPokemon[randomNumber]["name"], "imageUrl": allPokemon[randomNumber]["imageUrl"]};
        dispatch(addPokemonToQuestions(pokemonData));
      }
    }
  },[allPokemonFetched])

  useEffect(() => {
    return (() => {
      dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[filters, searchTerm])

  return (
    <div className="game-page-container">
      <NavBar />
      <div className="game-page">
        <h1>Who's That Pokémon?</h1>
        <div className="round-and-score-numbers-container">
          <h3>Round: {round}/5</h3>
          <h3>Score: {score}/5</h3>
        </div>
        <div className="score-and-picture-container">
          <GamePageScoreContainer />
          {!isGameFinished && questionPokemon.map((pokemon, index) => <GamePagePicture key={`game-page-picture-${index + 1}`} classNameVisibility={round === (index + 1) ? "" : " hidden"} imageUrl={pokemon["imageUrl"]} name={pokemon["name"]} />)}
          {isGameFinished && <NewGameButton />}
        </div>
        <GuessBar />
        {/* <FiltersContainer />  */}
        {/* {dataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>} */}
      </div>
    </div>
  )
}