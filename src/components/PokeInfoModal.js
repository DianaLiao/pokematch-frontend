import ReactDOM from "react-dom";

function PokeInfoModal(props){
  
  const {infoOpen, dexRef, toggleModal, pokemon} = props
  const {name, apiId, frontSprite, backSprite, flavorText} = pokemon

  if (!infoOpen) return null

  return ReactDOM.createPortal(
    <div className="dex-modal" onClick={toggleModal}>
      <div class="capitalize">{name}</div>
      <div>Entry #{apiId}</div>
      <img src={frontSprite} alt={name}/>
      <p>{flavorText}</p>
    </div>,
    dexRef.current
  )
}

export default PokeInfoModal