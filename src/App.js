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
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

function App() {

  const [currentUser, setCurrentUser] = useState({}) 
  const [errors, setErrors] = useState([])
  const [newMatches, setNewMatches] = useState([])
  const [isNewResult, setIsNewResult] = useState(false)
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

  function submitMatches(matchedMon, bonus=0){
    console.log("pre fetch list", matchedMon)

    const bonusFetchObj = createFetchObj("PATCH", {user_id: currentUser.id, score_to_add: bonus})
    let tempArray =[]

    matchedMon.forEach(mon => {
      const matchFetchObj = createFetchObj("POST", {user_id: currentUser.id, pokemon_id:mon.id})
      const addScoreFetchObj = createFetchObj("PATCH", {user_id: currentUser.id, score_to_add: 10})

      fetch(`${serverUrl}/user_pokemons/match`, matchFetchObj)
        .then(resp => resp.json())
        .then(entry => {
          // setNewMatches([...newMatches, entry])
          tempArray.push(entry)
          console.log("response", entry)
          updateUserPokemons(entry)
        })
      fetch(`${serverUrl}/users/${currentUser.id}/add_score`, addScoreFetchObj)
      console.log("tempArray", tempArray)
      setNewMatches(tempArray)
    })

    fetch(`${serverUrl}/users/${currentUser.id}/add_score`, bonusFetchObj)
      .then(resp => resp.json())
      .then(updatedUser => {
        setCurrentUser(updatedUser)
      })
    // history.push("/pokedex")

    setTimeout(()=>setIsNewResult(true), 1500)
  }


  function updateUserPokemons(newEntry){
    const monIndex = currentUser.userPokemons.findIndex(mon => mon.id == newEntry.id)
    const userCopy = {...currentUser}
    
    if (monIndex !== -1){
      userCopy.userPokemons[monIndex] = newEntry
    }
    else {
      userCopy.userPokemons.push(newEntry)
    }
    
    setCurrentUser(userCopy)
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
              : <Welcome 
                  user={currentUser} 
                  serverUrl={serverUrl} 
                  updateUser={updateUser} 
                  errors={errors} 
                  setErrors={setErrors}/>}
            </Route>
            <Route path="/new-game">
              {Object.keys(currentUser).length === 0 ? <Redirect to="/login" /> 
              : <GameProvider>
                  <NewGame 
                    serverUrl={serverUrl} 
                    submitMatches={submitMatches} 
                    setIsNewResult={setIsNewResult} 
                    isNewResult={isNewResult}
                    setNewMatches={setNewMatches} 
                    newMatches={newMatches}/>
                </GameProvider>}
            </Route>
            <Route path="/pokedex">
              {Object.keys(currentUser).length === 0 ? <Redirect to="/login" /> 
              : <Pokedex userMon={currentUser.userPokemons} appRef={appEl} newMatches={newMatches} setNewMatches={setNewMatches}/>}
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
