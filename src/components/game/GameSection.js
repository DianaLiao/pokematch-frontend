import {useState, useContext, useEffect} from "react"
import {GameContext} from "../GameContext"
import GameCard from "./GameCard";
import GameTimer from "./GameTimer";

function GameSection({serverUrl}){

  const [gameMon, setGameMon] = useState([]) 
  const {currentDifficulty, isGameRunning} = useContext(GameContext)
  const fetchUrl = `${serverUrl}/pokemons/game`
  
  useEffect(() => {
    fetch(`${fetchUrl}/${currentDifficulty.numCards}`).then(resp => resp.json())
      .then(setGameMon)
  },[fetchUrl, currentDifficulty, isGameRunning])

  const gameCards = gameMon.map(mon => {
    return <GameCard {...mon} key={mon.cardId} />
  })

  const stoppedGameMsg = <div id="stopped-msg">Ready to start a new game!</div>

  return (
    <div id="game-section">
      <div id="game-screen">
        {isGameRunning ? gameCards : stoppedGameMsg}
      </div>
    </div>
  )

}

export default GameSection