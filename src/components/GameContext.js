
import {createContext, useState} from "react"

// create the context object
const GameContext = createContext()

// create the context provider (component)
function GameProvider({children}) {

  const [matchedMon, setMatchedMon] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [lastClicked, setLastClicked] = useState({})
  const [isGameRunning, setIsGameRunning] = useState(false)

  function processFlipCard(){
    // console.log(lastClicked)
    const {cardId, apiId, frontSprite, id, name, cardRef} = lastClicked

    if (flippedCards[0] && cardId === flippedCards[0].cardId){
      // alert("Please choose a different card")
    }
    else{
      setFlippedCards([...flippedCards, {cardId, apiId, cardRef, name}])
    }
  }

  function analyzeCards(){
    const {cardId, apiId, frontSprite, id, name} = lastClicked
    if (flippedCards.length === 2) {
      const isMatched = compareCards()
      if (!isMatched) {
        // console.log("no match!")
        setTimeout(()=>setFlippedCards([]), 1500)
      }
      else {
        // console.log("match!")
        setTimeout(() => {
        flippedCards.forEach(mon => {
          const card = mon.cardRef
          card.className = "hidden game-card"
        })
        
          setMatchedMon([...matchedMon, {apiId, id, frontSprite, name}])
          setFlippedCards([])
        },1500)
       
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
    setIsGameRunning(true)
    setFlippedCards([])
  }

  function stopGame(){
    setIsGameRunning(false)
    setFlippedCards([])
    setMatchedMon([])
  }

  const value = {
    flippedCards,
    matchedMon,
    processFlipCard, 
    analyzeCards,
    lastClicked,
    setLastClicked,
    isGameRunning,
    startGame,
    stopGame
  }
  
  return (
      <GameContext.Provider value={value}>
          {children}
      </GameContext.Provider>
  )
}


export { GameContext, GameProvider }