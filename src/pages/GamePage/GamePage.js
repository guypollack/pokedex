import React, { useEffect } from 'react';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { selectCurrentPokemon, setCurrentPokemon, addPokemonToQuestions, setAllNames, selectRound, selectScore, selectQuestionPokemon, selectIsGameFinished, resetGame } from '../../features/game/gameSlice';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { nameFormatter } from '../../util/nameFormatter';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, selectAllPokemon, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, selectDataFetched, selectIsLoading, setFilteredPokemonSnapshot, selectSearchTerm } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import { GamePageScoreContainer } from '../../components/GamePageScoreContainer/GamePageScoreContainer';
import { GamePageScoreIcon } from '../../components/GamePageScoreIcon/GamePageScoreIcon';
import { GamePagePicture } from '../../components/GamePagePicture/GamePagePicture';
import { GuessBar } from '../../components/GuessBar/GuessBar';
import { NewGameButton } from '../../components/NewGameButton/NewGameButton';
import "./GamePage.css";
import { selectCurrentUser } from '../../features/users/usersSlice';

export function GamePage() {
  // console.log("HomePage rendering");
  const dispatch = useDispatch();

  const allPokemonFetched = useSelector(selectAllPokemonFetched);
  const dataFetched = useSelector(selectDataFetched);
  const allPokemon = useSelector(selectAllPokemon);
  const filters = useSelector(selectFilters);
  const filteredPokemon = useSelector(selectFilteredPokemon);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const currentPokemon = useSelector(selectCurrentPokemon);
  const questionPokemon = useSelector(selectQuestionPokemon);
  const round = useSelector(selectRound);
  const score = useSelector(selectScore);
  const isGameFinished = useSelector(selectIsGameFinished);
  const user = useSelector(selectCurrentUser);

  // dispatch(fetchAllPokemonAsync());

  useEffect(() => {
    return () => {
      dispatch(resetGame());
    }
  },[]);

  useEffect(() => {
    if (!allPokemonFetched) {
      // console.log("A");
      // console.log("dispatch(fetchAllPokemonAsync());");
      dispatch(fetchAllPokemonAsync());
      // dispatch(makeVisible({"start": lBound, "end": uBound}));
      // dispatch(fetchPokemonDataAsync());
    } else {
      const allNames = Object.values(allPokemon).map(pokemon => nameFormatter(pokemon["name"]));
      dispatch(setAllNames(allNames));
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 1009) + 1;
        const pokemonData = {"number": randomNumber, "name": nameFormatter(allPokemon[randomNumber]["name"]), "imageUrl": allPokemon[randomNumber]["imageUrl"]};
        dispatch(addPokemonToQuestions(pokemonData));
      }
    }
  },[allPokemonFetched])


  // re-enable
  // useEffect(() => {
  //   if (allPokemonFetched) {
  //     const randomNumber = Math.floor(Math.random() * 1009) + 1;
  //     const pokemonData = {"number": randomNumber, "name": nameFormatter(allPokemon[randomNumber]["name"]), "imageUrl": allPokemon[randomNumber]["imageUrl"]};
  //     dispatch(setCurrentPokemon(pokemonData));
  //   }
  // },[round])

  useEffect(() => {
    return (() => {
      dispatch(setFilteredPokemonSnapshot(filteredPokemon));
    })
  },[filters, searchTerm])


  if (!allPokemonFetched || questionPokemon.length < 5) return;


  // console.log(questionPokemon);


  return (
    <div>
      <NavBar />
      <h1>Hello World!</h1>
      <h2>This is the game page</h2>
      <h3>Number: {currentPokemon["number"]}</h3>
      <h3>Round: {round}/5</h3>
      <h3>Score: {score}/5</h3>
      <GamePageScoreContainer />
      {!isGameFinished && questionPokemon.map((pokemon, index) => <GamePagePicture key={`game-page-picture-${index + 1}`} classNameVisibility={round === (index + 1) ? "" : " hidden"} imageUrl={pokemon["imageUrl"]} name={pokemon["name"]} />)}
      {isGameFinished && <NewGameButton />}
      <GuessBar />
      {/* <FiltersContainer />  */}
      {/* {dataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>} */}
    </div>
  )
}