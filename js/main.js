class Player {
    constructor(){
      // initialize properties
      this.width = 2;
      this.height = 4;
      this.positionX = 3;
      this.positionY = 0;
      
      //dom manipulation
      this.playerCharacter = document.getElementById('player');
      this.playerCharacter.style.width = this.width + "em";
      this.playerCharacter.style.height = this.height + "em";
      this.playerCharacter.style.left = this.positionX + "vw";
      this.playerCharacter.style.bottom = this.positionY + "vh";
    }
    moveRight(){
      console.log('Right');
      this.positionX++;
      this.playerCharacter.style.left = this.positionX + "em";
    };
    moveLeft(){
      console.log('Left');
      this.positionX--;
      this.playerCharacter.style.left = this.positionX + "em";
    };
    moveUp(){
      console.log('Up');
      this.positionY++;
      this.playerCharacter.style.bottom = this.positionY + "em";
    };
    moveDown(){
      console.log('Down');
      this.positionY--;
      this.playerCharacter.style.bottom = this.positionY + "em";
    };
  }
 
class Obstacle {
  constructor() {
    this.width = 3;
    this.height = 4;
    this.positionX = 80;
    this.positionY = 0;
    this.obstacle = null;

    this.createDomObstacle();
  }

  createDomObstacle() {
    this.obstacle = document.createElement("div");

    this.obstacle.classList.add("obstacle");
    this.obstacle.style.width = this.width + "em";
    this.obstacle.style.height = this.height + "em";
    this.obstacle.style.left = this.positionX + "vw";
    this.obstacle.style.bottom = this.positionY + "vh";

    const parentBoard = document.getElementById("board");
    parentBoard.appendChild(this.obstacle);
  }
  moveLeft(){
    this.positionX--;
    this.obstacle.style.left = this.positionX + "em";
  }
}
   
 

  /////////////// Game
  const player = new Player();
  const obstaclesArr = [];
  
  /////// Events

// Player Movement
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowRight":
            player.moveRight();
            break;
        case "ArrowLeft":
            player.moveLeft();
            break;
        case "ArrowUp":
            player.moveUp();
            break;
        case "ArrowDown":
            player.moveDown();
            break;
    }
  });

// Obstacles appearence
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle)
}, 5000);

// Obstacle movement and stop obstacle
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (!collisionCheck(obstacle)) {
      obstacle.moveLeft();
    }
  });
 }, 200);

 /// Obstacle mov and push player
 setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (collisionCheck(obstacle)) {
      console.log("trying to push")
      player.moveLeft();
    }
  });
 }, 200);


 /// Detect collision 

 function collisionCheck(obstacle){
  if(
    player.positionX < obstacle.positionX + obstacle.width && 
    player.positionX + player.width > obstacle.positionX &&
    player.positionY < obstacle.positionY + obstacle.height &&
    player.positionY + player.height > obstacle.positionY
  ){
    console.log('collision');
    return true ;
  } else {
    return
  }
 }