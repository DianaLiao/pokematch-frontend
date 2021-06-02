import { useState, useEffect, useContext } from "react"
// import Select from 'react-select'

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";
import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";
import GameResultModal from "./game/GameResultModal"

import {GameContext} from "./GameContext"
import GameTimer from "./game/GameTimer";


function NewGame({serverUrl, submitMatches, setNewMatches, isNewResult, setIsNewResult, newMatches}){

  // const fetchUrl = `${serverUrl}/pokemons/game`
  // const [gameMon, setGameMon] = useState([]) 
  
  const {matchedMon, 
      setMatchedMon,
      isGameRunning, 
      setFlippedCards,
      setLastClicked,
      startGame, 
      stopGame, 
      currentDifficulty, 
      setDifficulty, 
      diffArray, 
      setTimeRemaining} = useContext(GameContext)

  // clear previous game responses
  useEffect(() => {
    setNewMatches([])
    setFlippedCards([])
    setLastClicked({})
  }, [])
  
  function setDifficultySetting({target}){
    const settingName = (target.value)
    setDifficulty(diffArray.find(diff => diff.name === settingName))
    
  }

  // useEffect(() => {
  //   fetch(`${fetchUrl}/${currentDifficulty.numCards}`).then(resp => resp.json())
  //     .then(setGameMon)
  // },[fetchUrl, currentDifficulty])

  // const gameCards = gameMon.map(mon => {
  //   return <GameCard {...mon} key={mon.cardId} />
  // })

  const difficultyOptions = diffArray.map(diff => {
    return <option key={diff.name} value={diff.name}>{diff.name} - {diff.numCards} cards, {diff.timeLimit}s, completion bonus: {diff.bonus} pts</option>
  })

  const selectOptions = diffArray.map(diff => {
    return {value: `${diff.name} - ${diff.numCards} cards, ${diff.timeLimit} secs, completion bonus: ${diff.bonus} points`, 
    label: diff.name, color: "#3b4cca"}
  })

  function handleSubmit(){
    let bonus = 0
    if (matchedMon.length*2 === currentDifficulty.numCards){
      bonus=currentDifficulty.bonus
    }

    submitMatches(matchedMon, bonus)
    stopGame()
    setMatchedMon([])
  }

  return (
    <div className="game">
      {/* <PowerUpList /> */}
      <div className="game-one">
      <GameSection serverUrl={serverUrl}/> 
      <GameTimer submitMatches={submitMatches}/>
      <div id="game-control">
        <label htmlFor="difficulty"></label>
        <select id="difficulty" onChange={setDifficultySetting}>
          {difficultyOptions}
        </select>
        {/* <Select myFontSize="20px" options={selectOptions} /> */}
        <div className="control-button start" role="button" onClick={startGame}>Start</div>
        <div className="control-button stop" role="button" onClick={stopGame}>Stop</div>
      </div>
      </div>
      <div className="game-two">
      <MatchList />
      <button onClick={handleSubmit}><span className="catch">Try and catch 'em!</span><span className="match">Submit Matches</span></button>
      </div>
      
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
