class Player {
  constructor() {
    // initialize properties
    this.width = 2;
    this.height = 4;
    this.positionX = 1;
    this.positionY = 24;
    this.player = null;
    this.lives = 100;

    this.gravityOn = true;
    this.onGround = false;
    this.onWall = false; 


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
      this.player.style.bottom = this.positionY + "em";
      
  }
moveRight() {
    if (!this.onWall) {
      this.positionX++;
      this.move();
    }
  }

  moveLeft() {
    this.positionX--;
    this.move();
  }

  moveUp() {
    this.positionY++;
    this.move();
  }

  moveDown() {
    if (!this.onGround) {
      this.positionY--;
      this.move();
    }
  }
jump(){
  this.positionY += 15 ; 
  this.player.style.bottom = this.positionY + "em";
  this.onGround = false;
};
gravity() {
  if(this.onGround) {
    this.gravityOn = false
    this.onGround = true
  } else if (this.onGround === false && this.positionY > 0) {
    this.gravityOn = true;
    this.onGround = false;
    this.positionY -=  0.3;
     this.move();
  } else if(this.positionY === 0){
    this.onGround = true;
    this.gravityOn = false;
  }
}
}

class Obstacle {
  constructor() {
    this.width = 3;
    this.height = Math.floor(Math.random() * 10 + 1);
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

class Platform {
  constructor(){
    this.width = 4;
    this.height = 1;
    this.positionY = 23;
    this.positionX = 0;
    this.platform = null;

    this.platform = document.getElementById('platform');
    this.platform.style.width = this.width + 'vw';
    this.platform.style.height = this.height + 'vw';

    this.ground();
  }
  ground(){
    if(platformCollision(player, this.platform)){
      console.log('ground')
    }
  }
  
}


/////////////// GAME INITIALIZE   ///////////////////////////
const player = new Player();
const obstaclesArr = [];
const platform = new Platform(); 




///////////// SETTINGS/////////////////////////////////

///////////////////////// Game loop
function gameLoop() {
  ///////////////// Character update
  player.move();
  player.gravity();
  console.log(player.onWall)
  //////////////////////   On the platform
  platformCollision(player, platform);
  // Stays on TOP!!
  obstaclesArr.forEach((obstacle) => {  
  onTop(player, obstacle) 
})
obstaclesArr.forEach((obstacle) => {
  if(collisionCheck(obstacle)){
    player.onWall = true;
  }
})
////////////////  lives
floorLava();

  requestAnimationFrame(gameLoop);    // This keeps the loop running
}

const floorLava = function livesCount() {
  if(player.positionY <= 0){
    player.lives -= 0.5;
    console.log(player.lives)
  }
}

///////////////////////////////////////////////////  Player MOVEMENT
document.addEventListener("keydown", (e) => {
  switch (e.code) {
  case "ArrowRight":
    player.moveRight();
      break;
    case "ArrowLeft":
      player.moveLeft(); 
      break;
    case "ArrowUp":
      player.moveUp() ;
      break;
    case "ArrowDown":
      player.moveDown();
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
}, 2000);

////////////////////////////////////////////// Obstacle MOVEMENT and REMOVE obstacle
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    obstacle.moveLeft();
    if(obstacle.positionX + obstacle.width < 0){
      obstaclesArr.splice(obstacle[0], 1);
    }
  });
}, 200);


/////////////////////////////////////////////////////// Obstacle mov and PUSH player
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (collisionCheck(obstacle)) {
      player.onWall = true; 
      player.positionX--;
      player.move();
    }
  });
}, 200);
////////////////////////// Detect COLLISION 
function platformCollision(r1, r2){   
  if (
    r1.positionX < r2.positionX + r2.width&&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
    ){
      player.onGround = true;
    } else{
      player.onGround = false;
    }
  }

platformCollision(player, platform)

function onTop(r1, r2) {
  if (
    r1.positionX < r2.positionX + r2.width&&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
    ){
      player.onGround = true;
      player.gravityOn = false;
    };
  };

  function collisionCheck(obstacle) {
    if (
      player.positionX < obstacle.positionX + obstacle.width &&
      player.positionX + player.width > obstacle.positionX &&
      player.positionY < obstacle.positionY + obstacle.height &&
      player.positionY + player.height > obstacle.positionY
    ) {
      player.onWall = true;
      return true;
    } else {
      player.onWall = false; 
      return false;
    }
  };
  

gameLoop();