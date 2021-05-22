import {createContext, useState} from "react"

// create the context object
const GameContext = createContext()

// create the context provider (component)
function GameProvider({children}) {

  const [matchedMon, setMatchedMon] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  function flipCard({cardId, pokemonId}){
    setFlippedCards([...flippedCards, cardId])
    let isMatched = false
    
    if (flippedCards.length === 2) {
      isMatched = compareCards()
    }
    else {
      
    }


  }

  function compareCards(){
    const [card1, card2] = flippedCards
    if (card1.pokemonId == card2.pokemonId) {
      return true
    }
    else {
      return false
    }
  }

  const value = {
    flippedCards,
    matchedMon
  }
  
  return (
      <GameContext.Provider value={value}>
          {children}
      </GameContext.Provider>
  )
}

// export
export { GameContext, GameProvider }