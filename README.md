
Flying dino - Project Planning
1. Define MVP
The board is moving horizontally with obstacles that the player needs to avoid jumping 
The player can only move around, and the force of gravity is always present, meaning that the player is always moving when is not on top or something or jumping. 
The player has to stay on top of obstacles while avoiding enemies and shooting them.

After 60 seconds, if you are still alive you win.

If your Health Points reach 0 you lose.
Killing enemies gives you points.
2. Define Milestones
Version1: Basic Game
M1: Display the player and one obstacle
 Display and create Character class
 Player movement up and down (create event listener)
 Display and create Obstacle object
Class and Dom initialize[X]
initialize properties 
Create element( ) and call from the constructor[X]
AppendChild
Display Obstacles [X]
Create an empty array
setInterval to create new Instances of Obstacle ( )
Obstacle movement towards the left
setInterval moving obstacles left
Set the screen size
overflow: hidden;
M2. Generate collision and new obstacles
Identify collision
Create a function only for collision (X)
Stop moving when collision (X)
 
Push 
Obstacles pushing when there’s a collision (X)
M3. Diversity of obstacles and physics
 Different highs of obstacles
Adjust the height of each object randomly
Gravity
Function that is always substracting positionY from player
Jump
Create new method in Player class
M4. Game mechanics
Improve collision TODAY
Grounded boolean: check if the player is on the ground or not
Player needs to stand on top of the obstacles
Improve: There’s is something with the time of gravity, if it’s too fast it pushes down the character. For now I’ll leave it like that.
Starting point
Create a platform from where the player starts jumping
Create a div in the html
Game over
When player touches the ground, loses 1 live
When 0, moves to a different page (create, html, link, etc)
HealthBar
Show HP on screen
Version2: Improving the game
M1: Enemy, music and images, win condition
Win condition
If you don’t die in 30 seconds you win
Add images
Adjust the images
Add music
Create new audio folder
Smooth movement: adjust speed of the objects
Better jump movement
Enemy pushing
Create an enemy class that pushes the character
Match the positionY with the style.bottom
M2: Style and bullet function
Fix the images of the obstacles
Player must be on top of the images
Improve the healthbar and timebar 
Fix music bug
Stylize the game over page
Try new images, backgrounds and music
Shoot
Create bullet class
Player can shoot enemies
Enemies cause damage to the player when touched
Improve Jump
Jump can only be used two times in certain amount of time.
Shooting
Remove enemy when live is 0
More enemies
