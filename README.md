# Pokématch 'em All

This is a memory matching card game with a Pokémon theme. After matching the cards, you will have a chance to "catch" them, and you can access information about them in the Pokédex. This was my phase 5 project for Flatiron School. Watch the [presentation demo](https://www.youtube.com/watch?v=76T--Kxscak). It is best run on a desktop computer with a screen at least 800 pixels wide.

## Installation

1) Clone this repository to your machine
2) In the project directory, run `npm install`
3) Clone the [backend repo](https://github.com/DianaLiao/pokematch-backend) to your machine and follow those instructions
4) Run `npm start`

## Using the App

Create a user account or login with an existing email in the database. 

You may change your user info on the welcome screen. You may choose your "companion Pokémon" which will appear next to your name on the leaderboards. Your options will be limited to Pokémon you have "caught" in the game.

To play a game, set a difficulty in the dropdown and click on "Start". Flip cards and attempt to match two of the same Pokémon. If you complete all matches within the time alloted, you will be awarded bonus points. To submit the results of the game, click on the "Submit" button.

## Troubleshooting & Notes

If the frontend doesn't seem to be connected to the backend, make sure that the `serverUrl` in `App.js` is configured correctly to match the URL of the Rails server from the backend. 

As of this writing, there is no functionality to reset your password. (Sorry!)

## Acknowledgements

The database was seeded from [PokeAPI](https://pokeapi.co/).

Thank you to the Flatiron School coaches and instructors who got me this far! And thanks to my niece for being my Pokémon consultant.

This project is licensed under the terms of the MIT license.

