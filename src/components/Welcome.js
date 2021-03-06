import userEvent from "@testing-library/user-event"
import {useState, useEffect} from "react"
import EditProfileForm from "./EditProfileForm"

function Welcome({user, serverUrl, updateUser, errors, setErrors}){

  const [topTen, setTopTen] = useState([])
  const [showUpdateForm, setFormShow] = useState(false)
  const {
      name, 
      email, 
      motto,
      companionName,
      companion, 
      totalScore, 
      pokedexCompletion
    } = user

  useEffect(() => {
    fetch(`${serverUrl}/users/top_ten`).then(resp => resp.json())
      .then(setTopTen)
  },[])

  const leaderRows = topTen.map(player => {
    return(
      <tr key={player.id} className={player.id === user.id ? "self" : ""}>
        <td><img src={player.companion ? player.companion.front_sprite : "../blank_pokeball.png"} height="30px"/>{player.name}</td>
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
      {showUpdateForm ? <EditProfileForm user={user} serverUrl={serverUrl} updateUser={updateUser} errors={errors} setErrors={setErrors} setFormShow={setFormShow}/> : null}
      <div className="welcome-one">
        <div id="trainer-profile">
          <em><b><h3>TRAINER PROFILE</h3></b></em>
          <div><b>Name:</b> {name}</div>
          <div><b>Total score:</b> {totalScore}</div>
          <div><b>Pokedex Completion:</b> {pokedexCompletion}</div>
          <div><b>Motto:</b> {motto}</div>
          <div>
            <b>Companion Info:</b><br/>
          </div>
          <div className="companion-box">
          {companion ? 
            <>
              <img src={companion.front_sprite} alt={companion.name} height="150px" width="150px"/>
              <div className="info">
                <b>Nickname:</b> {companionName} <br/>
                <b>Species:</b> <span className="capitalize">{companion.name}</span>
              </div>
            </>

              : "No companion set! Go catch a pok??mon!"}
          </div>
          <button onClick={handleFormToggle}>{showUpdateForm ? "Close" : "Open"} Profile edit form</button>
          
        </div>
      </div>
      
      <div className="welcome-two">
        <img className="welcome-bg" src="../poke_trophy.png" />
        <div className="table-title">Top Ten Trainers</div>
        <table id="top-ten">
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