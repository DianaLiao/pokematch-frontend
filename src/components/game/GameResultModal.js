import ReactDOM from "react-dom";

function GameResultModal({newMatches, isNewResult, setIsNewResult, gameRef}){

  console.log(newMatches)
  
  // if (!isNewResult) return null

  return ReactDOM.createPortal(
    <div className="game-result-modal" onClick={()=>setIsNewResult(false)}>
      You've caught some stuff!
    </div>,
    document.body
  )
}

export default GameResultModal