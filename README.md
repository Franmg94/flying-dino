## 1. Define MVP

The board is moving horizontally with obstacles that the player needs to avoid jumping 

The player can only move vertically, and the force of gravity is always present, meaning that the player is always moving down except when we press a key to move up. 

The player has to go jump through the obstacles.

## 2. Define Milestones

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

- [ ]  Game loop function
- [ ]  Game update status

- [ ]  Improve collision
- Player needs to stand on top of the obstacles

Why it’s not working? 
The collision update needs to happen when the player is moving, 

I’ll try to check it through game loop.

What other things can I start working on?

- [ ]  Game over
When player hits the ground loses one live, or game  over.

- [ ]  Objectives?

---

### *Further ideas*

V2: 

- [ ]  Smooth movement: adjust speed of the objects
- [ ]  Abilities like shooting
- [ ]  Day and Night Phase: during one phase you collect staff and its easy, during the other phase it gets harder and more obstacles, colors change
- [ ]  Grounded boolean: check if the player is on the ground or not