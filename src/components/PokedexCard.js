
function PokedexCard(props){

  const {api_id, front_sprite, back_sprite, name} = props

  console.log(props)

  return(
    <div className="dex-card">
      <img src={front_sprite} alt={`front of ${name}`}/>
    </div>
  )
}

export default PokedexCard