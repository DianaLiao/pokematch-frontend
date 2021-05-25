
function PokedexCard(props){

  const {apiId, frontSprite, backSprite, name, popUpInfo, timesCaught} = props

  return(
    <div className="dex-card" onClick={popUpInfo}>
      <img 
        src={parseInt(timesCaught)>0 ? frontSprite : backSprite} 
        alt={`front of ${name}`} height="96" 
        className={parseInt(timesCaught) === 0 ? "uncaught" : undefined}
      />
    </div>
  )
}

export default PokedexCard