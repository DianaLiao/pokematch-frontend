import {GameContext} from "../GameContext"
import {useContext} from "react"

function MatchList(){

  const {matchedMon} = useContext(GameContext)

  const matchedImages = matchedMon.map(mon => {
    return <img src={mon.frontSprite} alt={`thumbnail of ${mon.name}`} key={mon.apiId}/>
  })

  return (
    <div id="game-matches">
      You've matched:
      {matchedImages}
    </div>
  )
}

export default MatchList
