import {useState, useEffect} from "react"
import PokedexCard from "./PokedexCard"


function Pokedex (){

  const [dexLoaded, setDexLoaded] = useState(false)
  const [monToRender, setMonToRender] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then(resp => resp.json())
      .then(filterPokemon)
  }, [])

  function filterPokemon(pokemonArray){
    let userMon = [...Array(152).keys()]

    setMonToRender(pokemonArray.filter(pokemon => userMon.includes(pokemon.api_id)))
    setDexLoaded(true)
  }

  const dexCards = monToRender.map(pokemon => {
    return <PokedexCard key={pokemon.api_id} {...pokemon}/>
  })

  return (
    <div id="pokedex">
      {!dexLoaded && <p>Loading Pokédex</p> }
      {dexCards}
    </div>
  )
}

export default Pokedex