import {useState, useContext, useRef, useEffect} from "react"
import {GameContext} from "../GameContext"

function GameCard(props){

  const {cardId, frontSprite, name, apiId} = props

  const {processFlipCard, flippedCards, analyzeCards, lastClicked, setLastClicked} = useContext(GameContext)
  const flippedIds = flippedCards.length > 0 ? flippedCards.map(card => card.cardId) : []
  
  const cardEl = useRef(null)
  const cardBackImg = "./sqkrmic.jpg"

  function flipCard(){
    setLastClicked({...props, cardRef: cardEl.current})
  }

  useEffect(() => {
    processFlipCard()
  }, [lastClicked])

  useEffect(() => {
    setTimeout(() => analyzeCards(), 1500)
  }, [flippedCards])

  return (
    <div ref={cardEl} onClick={flipCard} className="game-card">
      <img src={flippedIds.includes(cardId) ? frontSprite : cardBackImg} alt={name}/>
    </div>
  )
}

export default GameCard