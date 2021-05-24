
import {useState} from "react"

function EditProfileForm({user, serverUrl, updateUser, errors, setErrors}) {

  const {name, email, companionId, userPokemons, numberOfCaughtMon} = user
  const [formData, setFormData] = useState({name, email, companionId})

  function handleFormChange(event){
    setFormData({...formData, [event.target.id]: event.target.value})
  }

  function handleFormSubmit(event){
    event.preventDefault()
    updateUser(formData)
  }

  const companionIdOptions = userPokemons.map(entry => {
    if (entry.timesCaught > 0) {
      return <option value={entry.pokemonId}>{entry.pokemonName}</option>
    }
  })

  const errorsList = errors.length > 0 ? <ul>{errors.map(error => <li>{error}</li>)}</ul> : null

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <label htmlFor="name">Name (to be seen on leaderboards):</label>
      <input onChange={handleFormChange} value={formData.name} type="text" id="name"></input><br/>
      <label htmlFor="email">E-mail address (for login):</label>
      <input onChange={handleFormChange} value={formData.email} type="email" id="email"></input><br/>
      {/* <label htmlFor="password">Password:</label>
      <input onChange={handleFormChange} value={formData.password} type="password" id="password"></input><br/> */}
      {numberOfCaughtMon > 0 ? 
        <>
          <label htmlFor="companionId">Choose your avatar:</label>
          <select onChange={handleFormChange} name="companionId" id="companionId" value={formData.companionId}>
            {companionIdOptions}
          </select>
          <img src={userPokemons.find(entry => entry.pokemonId == formData.companionId).pokemonPic} />
        </> 
        : "No pokémon caught yet!"
      }<br/>
      <input type="submit" value="Submit Profile Update"></input>
    </form>
  )

}

export default EditProfileForm