import {createContext, useState} from "react"

// create the context object
const GameContext = createContext()

// create the context provider (component)
function GameProvider({children}) {

  const [matchedMon, setMatchedMon] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  function processFlipCard({cardId, apiId, frontSprite, id, name}){

    setFlippedCards([...flippedCards, {cardId, apiId}])

    let isMatched = false
    
    if (flippedCards.length === 2) {
      isMatched = compareCards()
      if (!isMatched) {
        setTimeout(setFlippedCards([]), 500)
      }
      else {
        console.log("match!")
        setMatchedMon([...matchedMon, {apiId, id, frontSprite, name}])
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

  const value = {
    flippedCards,
    matchedMon,
    processFlipCard
  }
  
  return (
      <GameContext.Provider value={value}>
          {children}
      </GameContext.Provider>
  )
}

// export
export { GameContext, GameProvider }