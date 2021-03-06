
import {createContext, useState} from "react"

// create the context object
const GameContext = createContext()

// create the context provider (component)
function GameProvider({children}) {

  const [matchedMon, setMatchedMon] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [lastClicked, setLastClicked] = useState({})
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [currentDifficulty, setDifficulty] = useState({numCards:8, timeLimit:30})
  const [timeRemaining, setTimeRemaining] = useState(30)

  function processFlipCard(){
    const {cardId, apiId, frontSprite, id, name, cardRef} = lastClicked

    if (flippedCards[0] && cardId === flippedCards[0].cardId){
      // alert("Please choose a different card")
    }
    else if (lastClicked.cardId) {
      setFlippedCards([...flippedCards, {cardId, apiId, cardRef, name}])
    }
  }

  function analyzeCards(){
    const {cardId, apiId, frontSprite, id, name} = lastClicked
    if (flippedCards.length === 2) {
      const isMatched = compareCards()
      if (!isMatched) {
        setTimeout(()=>setFlippedCards([]), 1000)
      }
      else {
        setTimeout(() => {
        flippedCards.forEach(mon => {
          const card = mon.cardRef
          card.className = "hidden game-card"
        })
          setMatchedMon([...matchedMon, {apiId, id, frontSprite, name}])
          setFlippedCards([])
        },1000)
      }
    }
  }

  function compareCards(){
    const [card1, card2] = flippedCards
    if (card1.apiId == card2.apiId) {
      return true
    }
    else {
      return false
    }
  }

  function startGame(){
    if (matchedMon.length !== 0) {
      alert("Please submit matches first.")
    }
    else {
      setIsGameRunning(true)
      setFlippedCards([])
      setLastClicked({})
      setTimeRemaining(currentDifficulty.timeLimit)
    }
  }

  function stopGame(){
    setIsGameRunning(false)
    setFlippedCards([])
  }

  // set difficulty settings here
  function createDifficulty (name, numCards, timeLimit, bonus=0){
    return {
      name,
      numCards,
      timeLimit,
      bonus
    }
  }
  const easyDiff = createDifficulty("Easy", 8, 30, 10)
  const mediumDiff = createDifficulty("Medium", 16, 45, 25)
  const hardDiff = createDifficulty("Hard", 24, 60, 75)
  // const testDiff = createDifficulty("testing", 2, 10, 0)
  const diffArray = [easyDiff,mediumDiff,hardDiff]


  const value = {
    flippedCards,
    setFlippedCards,
    matchedMon,
    setMatchedMon,
    processFlipCard, 
    analyzeCards,
    lastClicked,
    setLastClicked,
    isGameRunning,
    startGame,
    stopGame,
    diffArray,
    currentDifficulty,
    setDifficulty,
    timeRemaining,
    setTimeRemaining
  }
  
  return (
      <GameContext.Provider value={value}>
          {children}
      </GameContext.Provider>
  )
}


export { GameContext, GameProvider }