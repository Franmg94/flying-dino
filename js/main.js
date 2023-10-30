///////////////////////// PLAYER

class Player {
  constructor() {
    // initialize properties
    this.width = 2;
    this.height = 4;
    this.positionX = 3;
    this.positionY = 0;
    this.player = null;

    this.gravityOn = false

    //dom manipulation
    this.player = document.getElementById('player');
    this.player.style.width = this.width + "em";
    this.player.style.height = this.height + "em";
    this.player.style.left = this.positionX + "vw";
    this.player.style.bottom = this.positionY + "vh";
    
    this.move();
    this.gravity();
  }
  move(){      
      this.player.style.left = this.positionX + "em";
      this.player.style.left = this.positionX + "em";
      this.player.style.bottom = this.positionY + "em";
      this.player.style.bottom = this.positionY + "em";
  }
jump(){
  for(let i=0; i < 5; i++){
    this.positionY++;
  };
  this.player.style.bottom = this.positionY + "em";
};
gravity() {
  setInterval(() => {
    this.gravityOn = true
    if (this.positionY > 0 && this.gravityOn) {
      this.positionY--;
      this.player.style.bottom = this.positionY + "em";
    } 
    obstaclesArr.forEach(obs => {
     if(collisionCheck(obs)){
      this.gravityOn = false
     }
    })
  }, 100)
};  
}


//////////// OBSTACLE

class Obstacle {
  constructor() {
    this.width = 3;
    this.height = Math.floor(Math.random() * 5 + 1);
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
  moveLeft() {
    this.positionX--;
    this.obstacle.style.left = this.positionX + "em";
  }
}




/////////////// GAME INITIALIZE   ///////////////////////////
const player = new Player();
const obstaclesArr = [];



///////////// SETTINGS/////////////////////////////////


///////////////////////////////////////////////////  Player MOVEMENT
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
      player.positionX++;
      player.move()         
      break;
    case "ArrowLeft":
      player.positionX--; 
      player.move()  
      break;
    case "ArrowUp":
      player.positionY++;
      player.move()  
      break;
    case "ArrowDown":
      player.positionY--;
      player.move()  
      break;
    case "Space":
      player.jump();           
      break;
  }
});

///////////////////////////////////////////// Obstacles CREATION
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle)
}, 5000);

////////////////////////////////////////////// Obstacle MOVEMENT and REMOVE obstacle
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (!collisionCheck(obstacle)) {
      obstacle.moveLeft();
    }
    if(obstacle.positionX + obstacle.width < 0){
      obstaclesArr.splice(obstacle[0], 1);
    }
  });
}, 200);

/////////////////////////////////////////////////////// Obstacle mov and PUSH player
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (collisionCheck(obstacle)) {
      player.positionX--;
      player.move();
    }
  });
}, 200);


////////////////////////// Detect COLLISION 

function collisionCheck(obstacle) {
  if (
    player.positionX < obstacle.positionX + obstacle.width &&
    player.positionX + player.width > obstacle.positionX &&
    player.positionY < obstacle.positionY + obstacle.height &&
    player.positionY + player.height > obstacle.positionY
  ) {
    if(player.positionY > obstacle.positionY ){
      player.positionY =  obstacle.height 
      player.positionX-- 
 player.move()
      player.gravityOn = false
    }
    console.log('collision');
    return true;
  } else {
    return false;
  }
};