import { NavLink } from "react-router-dom"

function NavMenu({user, logout}){

  return (
    <nav>
      <NavLink exact to="/">
        Welcome
      </NavLink>
      <NavLink to="/new-game">
        New Game
      </NavLink>
      <NavLink to="/pokedex">
        Pokédex
      </NavLink>
      <a onClick={logout} href="#">
        Logout
      </a>
    </nav>
  )
}

export default NavMenu