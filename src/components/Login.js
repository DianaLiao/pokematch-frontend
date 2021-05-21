import { useState } from "react"

function Login(){

  const [formData, setFormData] = useState({})
  const [formType, setFormType] = useState("Sign-up")

  function changeFormType(event){
    setFormType(event.target.id)
  }

  function handleFormChange(event){
    const property = event.target.id
    const value = event.target.value

    setFormData({...formData, [property]:value})
    console.log(formData)
  }

  function handleFormSubmit(event){
    event.preventDefault()
  }

  return (
    <div className="forms-page">
      <div><span id="Login" onClick={changeFormType}>Login</span><span id="Sign-up" onClick={changeFormType}>Sign-Up</span></div>
      <div className="form-display">
        <form onSubmit={handleFormSubmit}>
          <label for="email">E-mail address:</label>
          <input 
            onChange={handleFormChange} 
            value={formData.email}
            type="text" id="email">
          </input><br/>
          <label for="password">Password:</label>
          <input 
            onChange={handleFormChange} 
            value={formData.password}
            type="password" id="password">
          </input><br/>
          {formType === "Sign-up" && 
            <>
              <label for="name">Name:</label>
              <input 
                onChange={handleFormChange} 
                value={formData.name}
                type="text" id="name">
              </input>
              <br/>
            </>}
          <input type="submit" value={formType}></input>
        </form>
      </div>
    </div>
  )

}

export default Login