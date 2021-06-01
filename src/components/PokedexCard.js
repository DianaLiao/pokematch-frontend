
function PokedexCard(props){

  const {apiId, frontSprite, backSprite, name, popUpInfo, timesCaught} = props

  const uncaught = parseInt(timesCaught) === 0
  const unseen = parseInt(timesCaught) === -1

  return(
    <div className={(!unseen) ? "seen dex-card" : "unseen dex-card"} onClick={popUpInfo}>
      <img 
        src={!uncaught ? frontSprite : backSprite} 
        alt={`${name}`} height="96" 
        className={uncaught ? "uncaught" : undefined}
      />
    </div>
  )
}

export default PokedexCard