import { useState, useEffect, useContext } from "react"

import MatchList from "./game/MatchList";
import PowerUpList from "./game/PowerUpList";

import GameCard from "./game/GameCard";
import GameSection from "./game/GameSection";

import {GameContext} from "./GameContext"


function NewGame({serverUrl, submitMatches}){

  const fetchUrl = `${serverUrl}/pokemons/game`
  const [gameMon, setGameMon] = useState([]) 

  const {matchedMon} = useContext(GameContext)

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
      <h5>Newww gaaaamez</h5>
      <PowerUpList />
      <GameSection gameCards={gameCards} />
      <MatchList /> <br/>
      <button onClick={() => submitMatches(matchedMon)}>Submit Matches</button>
    </div>

  )
}

export default NewGame
