import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";
import GameResultModal from "./game/GameResultModal"

import {GameContext} from "./GameContext"


function NewGame({serverUrl, submitMatches, setNewMatches, isNewResult, setIsNewResult, newMatches}){

  const fetchUrl = `${serverUrl}/pokemons/game`
  const [gameMon, setGameMon] = useState([]) 
  
  const {matchedMon, isGameRunning, startGame, stopGame, currentDifficulty, setDifficulty, diffArray} = useContext(GameContext)

  // clear previous game responses
  useEffect(() => setNewMatches([]), [])
  
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
      
      
      {isNewResult ? 
        <GameResultModal 
          newMatches={newMatches} 
          isNewResult={isNewResult} 
          setIsNewResult={setIsNewResult} 
        />  
        : null
      }
    </div>

  )
}

export default NewGame
