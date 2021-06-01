
import {useState} from "react"

function EditProfileForm({user, serverUrl, updateUser, errors, setErrors}) {

  const {name, email, companionId, companionName, motto, userPokemons} = user

  const [formData, setFormData] = useState({name, email, companionId, companionName, motto})

  console.log(formData)

  function handleFormChange(event){
    setFormData({...formData, [event.target.id]: event.target.value})
  }

  function handleFormSubmit(event){
    event.preventDefault()
    updateUser(formData)
  }

  const errorsList = errors.length > 0 ? <ul>{errors.map(error => <li>{error}</li>)}</ul> : null

  const caughtMon = user.userPokemons.filter(entry => entry.timesCaught > 0)
  const numberOfCaughtMon = caughtMon.length

  const companionIdOptions = caughtMon.map(entry => {
      return <option key={entry.pokemonId} value={entry.pokemonId}>{entry.pokemonName}</option>
    }
  )

  // debugger
  return (
    <div id="profile-form">
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name (also on leaderboards):</label>
        <input onChange={handleFormChange} value={formData.name} type="text" id="name"></input><br/>
        <label htmlFor="email">E-mail address (for login):</label>
        <input onChange={handleFormChange} value={formData.email} type="email" id="email"></input><br/>
        <label htmlFor="motto">Motto:</label>
        <input onChange={handleFormChange} value={formData.motto} type="text" id="motto"></input><br/>
        {/* <label htmlFor="password">Password:</label>
        <input onChange={handleFormChange} value={formData.password} type="password" id="password"></input><br/> */}
        {numberOfCaughtMon > 0 ? 
          <>
            <label htmlFor="companionId">Choose your avatar:</label>
            <select onChange={handleFormChange} name="companionId" id="companionId" value={numberOfCaughtMon === 1 ? companionIdOptions[0].props.value : formData.companionId}>
              {companionIdOptions}
            </select>
            <img src={formData.companionId ? caughtMon.find(entry => entry.pokemonId == formData.companionId).pokemonPic : "../blank_pokeball.png"} height="96px" width="96px"/>
            <label htmlFor="companionName">Name your companion:</label>
            <input onChange={handleFormChange} value={formData.companionName} type="text" id="companionName"></input><br/>
          </> 
          : "No pokémon caught yet!"
        }<br/>
        <input type="submit" value="Submit Profile Update"></input>
      </form>
    </div>
  )

}

export default EditProfileForm