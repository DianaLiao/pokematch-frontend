import ReactDOM from "react-dom";
import {useState} from "react"

function GameResultModal({setNewMatches, newMatches, isNewResult, setIsNewResult}){

  const [isLoaded, setLoaded] = useState(false)

  setTimeout(() => setLoaded(true), 2000)

  const newCatches = newMatches.filter(match => match.newCatch)

  const newCatchPics = newCatches.map(entry => {
    const isFirstTime = entry.timesCaught === 1
    return (
      <div className = {isFirstTime ? "first new-catch" : "new-catch"} key={entry.pokemon.id}>
        <img src={entry.pokemon.frontSprite} alt={entry.pokemon.name} />
        <span>{entry.pokemon.name}</span> 
      </div>

    )})

  function closePopUp(){
    setNewMatches([])
    setIsNewResult(false)
  }

  const loadingBall = 
    <div className="loading">
      <div className="pokeball">

      </div>
    </div>

  const gameResult = (newCatches.length === 0) ?
      <div>Sorry, no catches this time!</div> :
      <div className="catch-container">
          Congrats! you've caught:
          {newCatchPics}
      </div>

  return ReactDOM.createPortal(
    <div className="game-result-modal" onClick={closePopUp}>
      {isLoaded ? gameResult : loadingBall}
    </div>,
    document.body
  )
}

export default GameResultModal