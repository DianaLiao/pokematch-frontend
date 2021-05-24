import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";


function NewGame({serverUrl}){

  const fetchUrl = `${serverUrl}/pokemons/game`
  const [gameMon, setGameMon] = useState([]) 

  const numCards = 12

  useEffect(() => {
    fetch(`${fetchUrl}/${numCards}`).then(resp => resp.json())
      .then(setGameMon)
  },[])

  const gameCards = gameMon.map(mon => {
    return <GameCard {...mon} key={mon.cardId} />
  })

  return (
    <div className="game">
      <h5>"Newww gaaaamez"</h5>
      <PowerUpList />
      <GameSection gameCards={gameCards} />
      <MatchList />
    </div>

  )
}

export default NewGame
