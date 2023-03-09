import React, { useEffect } from 'react';
import { FiltersContainer } from '../../components/FiltersContainer/FiltersContainer';
import { selectCurrentPokemon, setCurrentPokemon, addPokemonToQuestions, setAllNames, selectRound, selectScore, selectQuestionPokemon } from '../../features/game/gameSlice';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { useSelector, useDispatch } from 'react-redux';
import { nameFormatter } from '../../util/nameFormatter';
import { fetchAllPokemonAsync, fetchPokemonDataAsync, selectAllPokemon, selectFilteredPokemon, selectFilters, selectAllPokemonFetched, selectDataFetched, selectIsLoading, setFilteredPokemonSnapshot, selectSearchTerm } from '../../features/pokemon/pokemonSlice';
import { PokemonFlexContainer } from '../../components/PokemonFlexContainer/PokemonFlexContainer';
import { GamePagePicture } from '../../components/GamePagePicture/GamePagePicture';
import { GuessBar } from './GuessBar';
import "./GamePage.css";

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

  // dispatch(fetchAllPokemonAsync());

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
      <GamePagePicture classNameVisibility={round === 1 ? "" : " hidden"} imageUrl={questionPokemon[0]["imageUrl"]} name={questionPokemon[0]["name"]} />
      <GamePagePicture classNameVisibility={round === 2 ? "" : " hidden"} imageUrl={questionPokemon[1]["imageUrl"]} name={questionPokemon[1]["name"]} />
      <GamePagePicture classNameVisibility={round === 3 ? "" : " hidden"} imageUrl={questionPokemon[2]["imageUrl"]} name={questionPokemon[2]["name"]} />
      <GamePagePicture classNameVisibility={round === 4 ? "" : " hidden"} imageUrl={questionPokemon[3]["imageUrl"]} name={questionPokemon[3]["name"]} />
      <GamePagePicture classNameVisibility={round === 5 ? "" : " hidden"} imageUrl={questionPokemon[4]["imageUrl"]} name={questionPokemon[4]["name"]} />
      <GuessBar />
      {/* <FiltersContainer />  */}
      {/* {dataFetched && Object.keys(filteredPokemon).length === 0 && <h3>No results found!</h3>} */}
    </div>
  )
}