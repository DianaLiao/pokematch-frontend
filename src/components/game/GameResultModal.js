import ReactDOM from "react-dom";
import {useState} from "react"

function GameResultModal({setNewMatches, newMatches, isNewResult, setIsNewResult}){

  const [isLoaded, setLoaded] = useState(false)

  setTimeout(() => setLoaded(true), 1500)

  console.log("newMatches", newMatches)
  const newCatches = newMatches.filter(match => match.newCatch)
  console.log("newCatches", newCatches)

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
      <p>Sorry, no catches this time!</p> :
      <div className="catch-container">
          You've caught:
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