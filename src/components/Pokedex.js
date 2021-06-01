import {useState, useEffect, useRef} from "react"
import PokedexCard from "./PokedexCard"
import PokeInfoModal from "./PokeInfoModal"


function Pokedex ({userMon, appRef}){

  const [dexLoaded, setDexLoaded] = useState(false)
  const [dexCards, setDexCards] = useState([])

  const [infoOpen, setInfoOpen] = useState(false)
  const [modalProps, setModalProps] = useState({name:"sup"})
  const dexEl = useRef(null)

  const [searchText, setSearchText] = useState("")
  const [toggleUnknowns, setToggle] = useState(false)

  const pokeBallImg = "../color-pokeball.png"
  // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
  // "../blank_pokeball.png"

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then(resp => resp.json())
      .then(generateDexCards)
  }, [])

  function generateDexCards(pokemonArray){
    const userMonIds = userMon.map(mon => mon.pokemonId)

    //sort pokemonArray to accomodate updated dex entries
    const sortedArray = pokemonArray.sort((a,b) => a.id - b.id)

    const displayArray = sortedArray.map(pokemon => {
      const userMonInfo = userMon.find(mon => mon.pokemonId == pokemon.id)
      
      function popUpInfo(){
        setModalProps({...pokemon, ...userMonInfo})
        toggleModal()
      }

      if (userMonIds.includes(pokemon.id)) {
        return <PokedexCard popUpInfo={popUpInfo} key={pokemon.apiId} {...pokemon} {...userMonInfo}/>
      }
      else {
        return <PokedexCard key={pokemon.apiId} frontSprite={pokeBallImg} backSprite={pokeBallImg} timesCaught="-1" name="unknown"/>
      }
    })

    setDexCards(displayArray)
    setDexLoaded(true)
  }

  function toggleModal() {
    setInfoOpen(value => !value)
  }

  function handleSearchText(event){
    setSearchText(event.target.value)
  }


  const filteredDexCards = dexCards.filter(card => {
    if (toggleUnknowns) {
      return (
        card.props.name.includes(searchText.toLowerCase())
        && card.props.name !== "unknown"
        )
    }
    else {
      return card.props.name.includes(searchText.toLowerCase())
    }
    // && card.props.name !== "unknown"
  })

  return (
    <div id="pokedex" ref={dexEl}>
      <div className="dex-search">
        <input type="text" id="name-search" 
          value={searchText} 
          placeholder="Search by name..." 
          onChange={handleSearchText}>
        </input>
        <span>Remove unknown? </span>
        <label class="switch">
          <input type="checkbox" 
            checked={toggleUnknowns} 
            onChange={()=>(setToggle(v => !v))}>
          </input>
          <span class="slider round"></span>
        </label>
      </div>
      {!dexLoaded && <p>Loading Pokédex</p> }
      <PokeInfoModal infoOpen={infoOpen} toggleModal={toggleModal} dexRef={dexEl} pokemon={modalProps}/>
      <div className="dex-card-list">
        {filteredDexCards}
      </div>
    </div>
  )
}

export default Pokedex