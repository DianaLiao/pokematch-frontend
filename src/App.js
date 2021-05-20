// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { useState, useEffect } from "react"

import Header from "./components/Header";
import Login from './components/Login';
// import Main from './components/Main'
import Welcome from "./components/Welcome"
import NavMenu from "./components/NavMenu";
import NewGame from "./components/NewGame"
import Pokedex from "./components/Pokedex"

function App() {

  const [currentUser, setCurrentUser] = useState({}) 
  
  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then(resp=>resp.json())
      .then(setCurrentUser)
  })

  return (
    <div className="App">
      <Router>
        <Header/>
        <NavMenu/>
        <main>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/new-game">
                <NewGame />
              </Route>
              <Route path="/pokedex">
                <Pokedex />
              </Route>
            </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
