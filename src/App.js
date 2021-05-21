// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import { useState, useEffect, useRef } from "react"

import Header from "./components/Header";
import Login from './components/Login';
import Welcome from "./components/Welcome"
import NavMenu from "./components/NavMenu";
import NewGame from "./components/NewGame"
import Pokedex from "./components/Pokedex"

function App() {

  const [currentUser, setCurrentUser] = useState({}) 
  const [errors, setErrors] = useState([])
  const appEl = useRef(null)
  const history = useHistory()

  const serverUrl = "http://localhost:3000"

  useEffect(() => {

  },[user])

  function signup(formData){
    const fetchObj = createFetchObj("POST", formData)

    fetch(`${serverUrl}/users/`, fetchObj)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        if (resp.errors){
          setErrors(resp.errors)
        }
        else {
          setCurrentUser(resp)
          history.push("/")
        }
      })
  }
  
  function login(formData){
    const fetchObj = createFetchObj("POST", formData)

    fetch(`${serverUrl}/users/login`, fetchObj)
      .then(resp=>resp.json())
      .then(resp => {
        console.log(resp)
        if (resp.errors){
          setErrors(resp.errors)
        }
        else {
          setCurrentUser(resp)
          history.push("/")
        }
      })
  }

  function logout(){
    setCurrentUser({})
  }

  function createFetchObj(method, data){
    return {
      method,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    }
  }

  return (

    <div className="App" ref={appEl}>
      <Header/>
      <NavMenu user={currentUser} logout={logout}/>
      <main>
          <Switch>
            <Route exact path="/">
              <Welcome user={currentUser}/>
            </Route>
            <Route path="/login">
              <Login login={login} signup={signup} errors={errors} setErrors={setErrors}/>
            </Route>
            <Route path="/new-game">
              <NewGame />
            </Route>
            <Route path="/pokedex">
              <Pokedex userMon={currentUser.userPokemons} appRef={appEl}/>
            </Route>
          </Switch>
      </main>
    </div>

  );
}

export default App;
