
function PokedexCard(props){

  const {apiId, frontSprite, backSprite, name, popUpInfo} = props

  return(
    <div className="dex-card" onClick={popUpInfo}>
      <img src={frontSprite} alt={`front of ${name}`} height="96"/>
    </div>
  )
}

export default PokedexCard