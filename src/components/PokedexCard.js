
function PokedexCard(props){

  const {apiId, frontSprite, backSprite, name, popUpInfo, timesCaught} = props

  const uncaught = parseInt(timesCaught) === 0

  return(
    <div className={!uncaught ? "uncaught dex-card" : "caught dex-card"} onClick={popUpInfo}>
      <img 
        src={!uncaught ? frontSprite : backSprite} 
        alt={`${name}`} height="96" 
        className={uncaught ? "uncaught" : undefined}
      />
    </div>
  )
}

export default PokedexCard