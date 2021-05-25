// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom'

import { useState, useEffect, useRef } from "react"


import Header from "./components/Header";
import Login from './components/Login';
import Welcome from "./components/Welcome"
import NavMenu from "./components/NavMenu";
import NewGame from "./components/NewGame"
import Pokedex from "./components/Pokedex"
import { GameProvider } from "./components/GameContext"

function App() {

  const [currentUser, setCurrentUser] = useState({}) 
  const [errors, setErrors] = useState([])
  const appEl = useRef(null)
  const history = useHistory()

  const serverUrl = "http://localhost:3000"

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

  function updateUser(formData){
    const fetchObj = createFetchObj("PATCH", formData)
    console.log(fetchObj)
    fetch(`${serverUrl}/users/${currentUser.id}`, fetchObj)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        if (resp.errors){
          setErrors(resp.errors)
        }
        else {
          setCurrentUser(resp)
        }
      })
  }

  function submitMatches(matchedMon){
    console.log("pre fetch list", matchedMon)
    matchedMon.forEach(mon => {
      const fetchObj = createFetchObj("POST", {user_id: currentUser.id, pokemon_id:mon.id})
      fetch(`${serverUrl}/user_pokemons/match`, fetchObj)
        .then(resp => resp.json())
        .then(console.log)
    })
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
              {Object.keys(currentUser).length === 0 ? <Redirect to="/login" /> 
              : <Welcome user={currentUser} serverUrl={serverUrl} updateUser={updateUser} errors={errors} setErrors={setErrors}/>}
            </Route>
            <Route path="/new-game">
              {Object.keys(currentUser).length === 0 ? <Redirect to="/login" /> 
              : <GameProvider>
                  <NewGame serverUrl={serverUrl} submitMatches={submitMatches}/>
                </GameProvider>}
            </Route>
            <Route path="/pokedex">
              {Object.keys(currentUser).length === 0 ? <Redirect to="/login" /> 
              : <Pokedex userMon={currentUser.userPokemons} appRef={appEl}/>}
            </Route>
            <Route path="/login">
              <Login login={login} signup={signup} errors={errors} setErrors={setErrors}/>
            </Route>
          </Switch>
      </main>
    </div>

  );
}

export default App;
