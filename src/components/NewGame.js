import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";

import {GameContext} from "./GameContext"


function NewGame({serverUrl, submitMatches}){

  const fetchUrl = `${serverUrl}/pokemons/game`
  const [gameMon, setGameMon] = useState([]) 
  const [currentDifficulty, setDifficulty] = useState({numCards:8})
  // const [numberOfCards, setNumberOfCards] = useState(8)
  
  const {matchedMon, isGameRunning, startGame, stopGame} = useContext(GameContext)


  // set difficulty settings here
  function createDifficulty (name, numCards, timeLimit, bonus=0){
    return {
      name,
      numCards,
      timeLimit,
      bonus
    }
  }
  const easyDiff = createDifficulty("Easy", 8, 45, 0)
  const mediumDiff = createDifficulty("Medium", 16, 60, 25)
  const hardDiff = createDifficulty("Hard", 24, 75, 50)
  const diffArray = [easyDiff,mediumDiff,hardDiff]

  // actually set difficulty
  function setDifficultySetting({target}){
    const settingName = (target.value)
    console.log(target.value)
    setDifficulty(diffArray.find(diff => diff.name === settingName))
    console.log(currentDifficulty)
  }

  useEffect(() => {
    fetch(`${fetchUrl}/${currentDifficulty.numCards}`).then(resp => resp.json())
      .then(setGameMon)
  },[fetchUrl, currentDifficulty])

  const gameCards = gameMon.map(mon => {
    return <GameCard {...mon} key={mon.cardId} />
  })


  const difficultyOptions = diffArray.map(diff => {
    return <option key={diff.name} value={diff.name}>{diff.name} - {diff.numCards} cards, {diff.timeLimit} seconds, completion bonus: {diff.bonus} points</option>
  }
)


  //set state for mounting cards? when timer runs out, unmount cards or GameSection


  return (
    <div className="game">
      <h5>Choose!</h5>
      <label htmlFor="difficulty"></label>
      <select id="difficulty" onChange={setDifficultySetting}>
        {difficultyOptions}
      </select>
      <button onClick={startGame}>start</button><button onClick={stopGame}>stop</button>
      <PowerUpList />
      {isGameRunning ? <GameSection gameCards={gameCards} /> : "Time's up or you haven't started or whatever"}
      <MatchList /> <br/>
      <button onClick={() => submitMatches(matchedMon, currentDifficulty.bonus)}>Submit Matches</button>
    </div>

  )
}

export default NewGame
