# MASTERMIND
The code breaking game. 
[BREAK IT HERE.](https://debjeanlee.github.io/mastermind/)

*** disclaimer ***

*many console logs were abused in the making of this game.*

I chose this game because I wanted to solidify my understanding of DOM Manipulation, as well as my understanding of loops and functions in Javascript.

### MVPS
* Define functions to set the hidden code, change pin colors, and display the results of guesses from each round.
* Use CSS to style the the game from scratch

### WHAT I USED
* Functions & Loops
  - to access pins on the board as well as for the main functionality of the game
* Event listeners 
  - to listen for click events to make the game interactive
* CSS
  - to style the board
  - using background color to make the game work, instead of using images, etc.
* Conditions
  - to check for all the possible states the game could be in
  
### HOW I WENT ABOUT IT
I started by brainstorming on paper (I think better when I write/draw stuff), about how the game should look, and by listing down the basic functions the game would need to work.

Since this game uses colored pins, I started by first designing the CSS of the game board.
Then with the help of the board already designed, I started listing down the functions I would need to make the game playable.

For example:
| Function | What the function needs to do |
| --- | --- |
| Check Win/Lose States | To declare if the player wins or loses |
| Guess/Check Button | Button to trigger checking for win |
| Reset | Need to reset answer/guess states, as well as a CSS reset of the board |
| Delete | So the player has flexibility to change the guess pins |
| Change colored pins | To change the colors of the pins on the board every round |
| Instructions | To explain how to play the game roughly |

After which it was a matter of figuring out how to make each function work - breaking down functions into smaller parts and getting them to work according to specific conditions that needed to be met.

Adding event listeners to the buttons to make the game interactive was a challenging part of the code writing. 
I spent a lot of time trying to figure out how to access certain parts of the code, like for example, accessing the CSS to make the background colors of the pins change based on what was selected, and also figuring out a way to update the guess data based on what color pins were selected by the player.

### NEXT STEPS

I wanted to add a function to let the player choose where they wanted to place certain colored pins, instead of just going in order.
I managed to do this, but I want to add some sort of indicator that the pin box was selected.
Also in the future I want to try adding a drag and drop function for the pins. (I still haven't gotten it quite figured out yet)

I also want to try doing a version using images instead of background color to display the pins. (BAGEL VERSION woo. or donuts.)

