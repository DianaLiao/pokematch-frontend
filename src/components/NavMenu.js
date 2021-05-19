import { NavLink } from "react-router-dom"

function NavMenu(){

  return (
    <nav>
      <NavLink exact to="/" activeClassName="selected">
        Welcome
      </NavLink>
      <NavLink to="/new-game">
        New Game
      </NavLink>
      <NavLink to="/pokedex">
        Pokédex
      </NavLink>
      <span>Logout</span>
    </nav>
  )
}

export default NavMenu