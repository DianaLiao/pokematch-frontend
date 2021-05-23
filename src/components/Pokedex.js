import {useState, useEffect, useRef} from "react"
import PokedexCard from "./PokedexCard"
import PokeInfoModal from "./PokeInfoModal"


function Pokedex ({userMon, appRef}){

  const [dexLoaded, setDexLoaded] = useState(false)
  const [dexCards, setDexCards] = useState([])

  const [infoOpen, setInfoOpen] = useState(false)
  const [modalProps, setModalProps] = useState({name:"sup"})
  const dexEl = useRef(null)

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then(resp => resp.json())
      .then(generateDexCards)
  }, [])

  function generateDexCards(pokemonArray){
    const userMonIds = userMon.map(mon => mon.pokemonId)

    const displayArray = pokemonArray.map(pokemon => {

      const userMonInfo = userMon.find(mon => mon.pokemonId == pokemon.id)
      
      function popUpInfo(){
        setModalProps({...pokemon, ...userMonInfo})
        toggleModal()
      }

      if (userMonIds.includes(pokemon.id)) {
        return <PokedexCard popUpInfo={popUpInfo} key={pokemon.apiId} {...pokemon} {...userMonInfo}/>
      }
      else {
        return <PokedexCard key={pokemon.apiId} frontSprite="../blank_pokeball.png" backSprite="../blank_pokeball.png" name="unknown"/>
      }
    })

    setDexCards(displayArray)
    setDexLoaded(true)
  }

  function toggleModal() {
    setInfoOpen(value => !value)
  }


  return (
    <div id="pokedex" ref={dexEl}>
      {!dexLoaded && <p>Loading Pokédex</p> }
      <PokeInfoModal infoOpen={infoOpen} toggleModal={toggleModal} dexRef={dexEl} pokemon={modalProps}/>
      {dexCards}
    </div>
  )
}

export default Pokedex