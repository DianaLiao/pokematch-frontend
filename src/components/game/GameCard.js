import {useState} from "react"

function GameCard(props){

  const [isFlipped, setFlipped] = useState(false)
  const {cardId, frontSprite, name} = props

  const cardBackImg = "./sqkrmic.jpg"

  function flipCard(){
    setFlipped(oldState => !oldState)
  }

  return (
    <div onClick={flipCard} className="game-card">
      <img src={isFlipped ? frontSprite : cardBackImg} alt={name}/>
    </div>
  )
}

export default GameCard