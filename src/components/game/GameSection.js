import {useState, useContext, useEffect} from "react"
import {GameContext} from "../GameContext"
import GameCard from "./GameCard";

function GameSection({serverUrl, isGameRunning}){

  const [gameMon, setGameMon] = useState([]) 
  const {currentDifficulty} = useContext(GameContext)
  const fetchUrl = `${serverUrl}/pokemons/game`
  
  useEffect(() => {
    fetch(`${fetchUrl}/${currentDifficulty.numCards}`).then(resp => resp.json())
      .then(setGameMon)
  },[fetchUrl, currentDifficulty, isGameRunning])

  const gameCards = gameMon.map(mon => {
    return <GameCard {...mon} key={mon.cardId} />
  })

  const stoppedGameMsg = <span>Ready to start a new game!</span>

  return (
    <div id="game-section">
      {isGameRunning ? gameCards : stoppedGameMsg}
    </div>
  )

}

export default GameSection