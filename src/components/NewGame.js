import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";

import {GameContext} from "./GameContext"


function NewGame({serverUrl, submitMatches}){

  const fetchUrl = `${serverUrl}/pokemons/game`
  const [gameMon, setGameMon] = useState([]) 
  const [numberOfCards, setNumberOfCards] = useState(8)
  
  const {matchedMon, isGameRunning, startGame, stopGame} = useContext(GameContext)

  function setDifficulty(event){
    setNumberOfCards(event.target.value)
  }

  useEffect(() => {
    fetch(`${fetchUrl}/${numberOfCards}`).then(resp => resp.json())
      .then(setGameMon)
  },[fetchUrl, numberOfCards])

  const gameCards = gameMon.map(mon => {
    return <GameCard {...mon} key={mon.cardId} />
  })

  //set state for mounting cards? when timer runs out, unmount cards or GameSection


  return (
    <div className="game">
      <h5>Choose!</h5>
      <label htmlFor="difficulty"></label>
      <select id="difficulty" onChange={setDifficulty}>
          <option value="8">Easy - 8 cards, ?? seconds</option>
          <option value="16">Medium - 16 cards, ?? seconds</option>
          <option value="24">Hard - 24 cards, ?? seconds</option>
      </select>
      <button onClick={startGame}>start</button><button onClick={stopGame}>stop</button>
      <PowerUpList />
      {isGameRunning ? <GameSection gameCards={gameCards} /> : "Time's up or you haven't started or whatever"}
      <MatchList /> <br/>
      <button onClick={() => submitMatches(matchedMon)}>Submit Matches</button>
    </div>

  )
}

export default NewGame
