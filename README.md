# Platform shooting - Project Planning

## 1. Define MVP

The board is moving horizontally with obstacles that the player needs to avoid jumping 

The player can only move around, and the force of gravity is always present, meaning that the player is always moving when is not on top or something or jumping. 

The player has to stay on top of obstacles while avoiding enemies.

## 2. Define Milestones

## Version1: Basic Game

### M1: Display the player and one obstacle

- [x]  Display and create Character class
- [x]  Player movement up and down (create event listener)
- [x]  Display and create Obstacle object
    - Class and Dom initialize[X]
        - initialize properties
    - Create element( ) and call from the constructor[X]
        - AppendChild
    - Display Obstacles [X]
        - Create an empty array
        - setInterval to create new Instances of Obstacle ( )

- [x]  Obstacle movement towards the left
- setInterval moving obstacles left

- [x]  Set the screen size
- overflow: hidden;

---

### M2. Generate collision and new obstacles

- [x]  Identify collision
- Create a function only for collision (X)
- Stop moving when collision (X)

 

- [x]  Push
    
    Obstacles pushing when there’s a collision (X)
    

---

### M3. Diversity of obstacles and physics

- [x]  Different highs of obstacles
- Adjust the height of each object randomly

- [x]  Gravity
- Function that is always substracting positionY from player

- [x]  Jump
- Create new method in Player class

---

### M4. Game mechanics

- [x]  Improve collision TODAY
- [x]  Grounded boolean: check if the player is on the ground or not
- Player needs to stand on top of the obstacles
- Improve: There’s is something with the time of gravity, if it’s too fast it pushes down the character. For now I’ll leave it like that.
- [x]  Starting point
- Create a platform from where the player starts jumping
- Create a div in the html

- [x]  Game over
- When player touches the ground, loses 1 live
- When 0, moves to a different page (create, html, link, etc)

- [x]  HealthBar
- Show HP on screen

---

## Version2: Improving the game

### M1: Enemy, music and images, win condition

- [x]  Win condition
- If you don’t die in 30 seconds you win

- [x]  Add images
- Adjust the images

- [x]  Add music
- Create new audio folder

- [x]  Smooth movement: adjust speed of the objects
- Better jump movement

- [x]  Enemy pushing
- Create an enemy class that pushes the character
- Match the positionY with the style.bottom

### M2: Style

- [ ]  Fix the images of the obstacles
    - [ ]  Player must be on top of the images

- [ ]  Improve the healthbar and timebar
- [ ]  Fix music bug
- [ ]  Stylize the game over page
- [ ]  Try new images, backgrounds and music

---

- [ ]  Shoot
    - [ ]  Create bullet class
    - [ ]  Player can shoot enemies
- [ ]  Improve Jump
    - [ ]  Jump can only be used two times in certain amount of time.
- [ ]  Enemies cause damage to the player when touched

---

- [ ]  Day and Night Phase: during one phase you collect staff and it's more relaxed, during the other phase it gets harder and more obstacles