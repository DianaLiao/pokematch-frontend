import {useState, useContext} from "react"
import {GameContext} from "../GameContext"

function GameCard(props){

  // const [isFlipped, setFlipped] = useState(false)
  const {cardId, frontSprite, name, apiId} = props

  const cardBackImg = "./sqkrmic.jpg"

  const {processFlipCard, flippedCards} = useContext(GameContext)

  const flippedIds = flippedCards.length > 0 ? flippedCards.map(card => card.cardId) : []

  // function determineFlip(){
  //   if (flippedCards.includes(cardId)){
  //     return true
  //   }
  //   else {return false}
  // }

  function flipCard(){
    processFlipCard({cardId, apiId})
  }

  return (
    <div onClick={flipCard} className="game-card">
      <img src={flippedIds.includes(cardId) ? frontSprite : cardBackImg} alt={name}/>
    </div>
  )
}

export default GameCard