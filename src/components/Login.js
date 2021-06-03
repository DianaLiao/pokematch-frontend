import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"

function Login({login, signup, errors, setErrors}){

  const [formData, setFormData] = useState({name:"", password:"", email:""})
  const [formType, setFormType] = useState("Login")

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
      <Nav fill variant="tabs" className="justify-content-center" activeKey={formType}>
        <Nav.Item>
          <Nav.Link id="Login" eventKey="Login" onClick={changeFormType}>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="Sign-up" eventKey="Sign-up" onClick={changeFormType}>Sign-Up</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <div><span id="Login" onClick={changeFormType}>Login</span><span id="Sign-up" onClick={changeFormType}>Sign-Up</span></div> */}
      {errorsList}
      <div className="form-display">
      {/* <form onSubmit={handleFormSubmit} autocomplete="off">
          <label htmlFor="email">E-mail address:</label>
          <input 
            onChange={handleFormChange} 
            value={formData.email}
            type="email" id="email">
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
        </form> */}
        <Form onSubmit={handleFormSubmit} autoComplete="off">
          <Form.Group>
            <Form.Label htmlFor="email">E-mail address:</Form.Label>
            <Form.Control 
              onChange={handleFormChange} 
              value={formData.email}
              placeholder="Enter e-mail..."
              type="email" id="email">
            </Form.Control><br/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control 
              onChange={handleFormChange} 
              value={formData.password}
              placeholder="Enter password..."
              type="password" id="password">
            </Form.Control><br/>
            </Form.Group>
            {formType === "Sign-up" && 
              <Form.Group>
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control 
                  onChange={handleFormChange} 
                  value={formData.name}
                  placeholder="Enter name..."
                  type="text" id="name">
                </Form.Control>
                <br/>
              </Form.Group>}
            <Button type="submit">{formType}</Button>
        </Form>
      </div>
    </div>
  )

}

export default Login