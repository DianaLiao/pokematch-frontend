import ReactDOM from "react-dom";

function GameResultModal({setNewMatches, newMatches, isNewResult, setIsNewResult}){

  console.log("newMatches", newMatches)
  const newCatches = newMatches.filter(match => match.newCatch)
  console.log("newCatches", newCatches)

  const newCatchPics = newCatches.map(entry => {
    const isFirstTime = entry.timesCaught === 1
    return (
      <div className = {isFirstTime ? "first new-catch" : "new-catch"}>
        <img src={entry.pokemon.frontSprite} alt={entry.pokemon.name} key={entry.pokemon.id}/>
        <span>{entry.pokemon.name}</span> 
      </div>

    )})

  function closePopUp(){
    setNewMatches([])
    setIsNewResult(false)
  }

  const gameResult = (newCatches.length === 0) ?
      <p>Sorry, no catches this time!</p> :
      <div className="catch-container">
          You've caught:
          {newCatchPics}
      </div>

  return ReactDOM.createPortal(
    <div className="game-result-modal" onClick={closePopUp}>
      {gameResult}
    </div>,
    document.body
  )
}

export default GameResultModal