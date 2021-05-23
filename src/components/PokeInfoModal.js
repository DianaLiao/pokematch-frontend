import ReactDOM from "react-dom";

function PokeInfoModal(props){

  // console.log(props)
  
  const {infoOpen, dexRef, toggleModal, pokemon} = props
  const {name, apiId, frontSprite, backSprite, flavorText, timesMatched, timesCaught} = pokemon

  if (!infoOpen) return null

  return ReactDOM.createPortal(
    <div className="dex-modal" onClick={toggleModal}>
      <div className="capitalize">{name}</div>
      <div>Entry #{apiId}</div>
      <img src={parseInt(timesCaught) > 0 ? frontSprite : backSprite} alt={name}/>
      <p>{parseInt(timesCaught) > 0 ? flavorText : "(catch one to find out more!)"}</p>
      <p>
        Times matched: {timesMatched}<br/>
        Times caught: {timesCaught}
      </p>
    </div>,
    dexRef.current
  )
}

export default PokeInfoModal