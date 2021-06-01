import {useState, useEffect, useContext} from "react"
import {GameContext} from "../GameContext"

function GameTimer({submitMatches}){
  
  const {isGameRunning, 
    stopGame, 
    timeRemaining, 
    setTimeRemaining, 
    currentDifficulty,
    matchedMon} = useContext(GameContext)

  function decreaseTime(){
    if (timeRemaining === 0){
      // submitMatches(matchedMon, currentDifficulty.bonus)
      stopGame()
    }
    else {
      if (matchedMon.length*2 === currentDifficulty.numCards) {
        stopGame()
      }
      setTimeRemaining(oldTime => oldTime-1)
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => decreaseTime(), 1000)
  
    return function cleanup(){
      clearInterval(timer)
    }
  }, [timeRemaining])


  if (!isGameRunning) return null


  return (
    <div id="game-timer">
      {timeRemaining}
    </div>
  )


}

export default GameTimer