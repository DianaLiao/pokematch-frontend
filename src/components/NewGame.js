import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";
import GameResultModal from "./game/GameResultModal"

import {GameContext} from "./GameContext"


function NewGame({serverUrl, submitMatches, setNewMatches, isNewResult, setIsNewResult, newMatches}){

  // const fetchUrl = `${serverUrl}/pokemons/game`
  // const [gameMon, setGameMon] = useState([]) 
  
  const {matchedMon, isGameRunning, startGame, stopGame, currentDifficulty, setDifficulty, diffArray} = useContext(GameContext)

  // clear previous game responses
  useEffect(() => setNewMatches([]), [])
  
  function setDifficultySetting({target}){
    const settingName = (target.value)
    console.log(target.value)
    setDifficulty(diffArray.find(diff => diff.name === settingName))
    console.log(currentDifficulty)
  }

  // useEffect(() => {
  //   fetch(`${fetchUrl}/${currentDifficulty.numCards}`).then(resp => resp.json())
  //     .then(setGameMon)
  // },[fetchUrl, currentDifficulty])

  // const gameCards = gameMon.map(mon => {
  //   return <GameCard {...mon} key={mon.cardId} />
  // })

  const difficultyOptions = diffArray.map(diff => {
    return <option key={diff.name} value={diff.name}>{diff.name} - {diff.numCards} cards, {diff.timeLimit} seconds, completion bonus: {diff.bonus} points</option>
  })

  function handleSubmit(){
    submitMatches(matchedMon, currentDifficulty.bonus)
    stopGame()
  }

  //set state for mounting cards? when timer runs out, unmount cards or GameSection


  return (
    <div className="game">
      <h5>Choose!</h5>
      <div id="game-control">
        <label htmlFor="difficulty"></label>
        <select id="difficulty" onChange={setDifficultySetting}>
          {difficultyOptions}
        </select>
        <button onClick={startGame}>start</button>
        <button onClick={stopGame}>stop</button>
      </div>
      {/* <PowerUpList /> */}
      <GameSection isGameRunning={isGameRunning} serverUrl={serverUrl}/> 
      <MatchList /> <br/>
      <button onClick={handleSubmit}>Submit Matches</button>
      
      
      {isNewResult ? 
        <GameResultModal 
          newMatches={newMatches} 
          setNewMatches={setNewMatches}
          isNewResult={isNewResult} 
          setIsNewResult={setIsNewResult} 
        />  
        : null
      }
    </div>

  )
}

export default NewGame
