import {useState, useContext} from "react"
import {GameContext} from "../GameContext"

function GameCard(props){

  const {cardId, frontSprite, name, apiId} = props

  const {processFlipCard, flippedCards} = useContext(GameContext)
  const flippedIds = flippedCards.length > 0 ? flippedCards.map(card => card.cardId) : []
  
  const cardBackImg = "./sqkrmic.jpg"

  function flipCard(){
    console.log(props)
    processFlipCard(props)
  }

  return (
    <div onClick={flipCard} className="game-card">
      <img src={flippedIds.includes(cardId) ? frontSprite : cardBackImg} alt={name}/>
    </div>
  )
}

export default GameCard