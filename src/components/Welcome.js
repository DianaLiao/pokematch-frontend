import userEvent from "@testing-library/user-event"
import {useState, useEffect} from "react"
import EditProfileForm from "./EditProfileForm"

function Welcome({user, serverUrl, updateUser, errors, setErrors}){

  const [topTen, setTopTen] = useState([])
  const [showUpdateForm, setFormShow] = useState(false)
  const {name, email, companion, totalScore} = user

  useEffect(() => {
    fetch(`${serverUrl}/users/top_ten`).then(resp => resp.json())
      .then(setTopTen)
  },[])

  const leaderRows = topTen.map(player => {
    return(
      <tr key={player.id} className={player.id === user.id ? "self" : ""}>
        <td><img src={player.companion.front_sprite} height="25px"/>{player.name}</td>
        <td>{player.pokedexCompletion}</td>
        <td>{player.totalScore}</td>
      </tr>
    )
  })

  function handleFormToggle(){
    setErrors([])
    setFormShow(oldValue => !oldValue)
  }

  return (
    <div className="welcome">
      <div className="welcome-one">
        <h5>Welcome, {name}!</h5>
        {companion ? 
          <><img src={companion.front_sprite} alt={companion.name} height="96px" width="96px"/>
          <h5><span className="capitalize">{companion.name}</span> says hi!</h5></> 
          : "No companion set! Go catch a pokémon!"}<br/>
          <div>Total score: {totalScore}</div>
         <button onClick={handleFormToggle}>{showUpdateForm ? "Close" : "Open"} Profile edit form</button>
        {showUpdateForm ? <EditProfileForm user={user} serverUrl={serverUrl} updateUser={updateUser} errors={errors} setErrors={setErrors} /> : null}
      </div>
      <div className="welcome-two">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Completion</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Welcome