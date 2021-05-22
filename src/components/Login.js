import { useState } from "react"
import { useHistory } from "react-router-dom"

function Login({login, signup, errors, setErrors}){

  const [formData, setFormData] = useState({name:"", password:"", email:""})
  const [formType, setFormType] = useState("Sign-up")

  const history = useHistory()

  function changeFormType(event){
    setFormType(event.target.id)
    setErrors([])
  }

  function handleFormChange(event){
    const property = event.target.id
    const value = event.target.value

    setFormData({...formData, [property]:value})
  }

  function handleFormSubmit(event){
    event.preventDefault()
    if (formType === "Login") {
      login(formData)
    }
    else if (formType === "Sign-up") {
      signup(formData)
    }

  }

  const errorsList = errors.length > 0 ? <ul>{errors.map(error => <li>{error}</li>)}</ul> : null

  return (
    <div className="forms-page">
      <div><span id="Login" onClick={changeFormType}>Login</span><span id="Sign-up" onClick={changeFormType}>Sign-Up</span></div>
      {errorsList}
      <div className="form-display">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">E-mail address:</label>
          <input 
            onChange={handleFormChange} 
            value={formData.email}
            type="text" id="email">
          </input><br/>
          <label htmlFor="password">Password:</label>
          <input 
            onChange={handleFormChange} 
            value={formData.password}
            type="password" id="password">
          </input><br/>
          {formType === "Sign-up" && 
            <>
              <label htmlFor="name">Name:</label>
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