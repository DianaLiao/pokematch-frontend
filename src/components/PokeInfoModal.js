import ReactDOM from "react-dom";

function PokeInfoModal(props){

  // console.log(props)
  
  const {infoOpen, dexRef, toggleModal, pokemon} = props
  const {name, apiId, frontSprite, backSprite, flavorText, timesMatched, timesCaught} = pokemon

  if (!infoOpen) return null

  return ReactDOM.createPortal(
    <div className="dex-modal" onClick={toggleModal}>
      <div className="dex-modal-header">
        <span className="capitalize">{name}</span>
        <span className="right">Entry #{apiId}</span>
      </div>
      <div className="dex-modal-body">
        <div className="dex-image">
          <img src={parseInt(timesCaught) > 0 ? frontSprite : backSprite} alt={name}/>
        </div>
        <div className="dex-text">
          <p>{parseInt(timesCaught) > 0 ? flavorText : "(Catch one to find out more!)"}</p>
          <p>
            Times matched: {timesMatched}<br/>
            Times caught: {timesCaught}
          </p>
        </div>
      </div>
    </div>,
    dexRef.current
  )
}

export default PokeInfoModal