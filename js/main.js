import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Enemy from "./enemy.js";

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
let randomY;  // not working

// console.log(randomY);
// setTimeout(()=>{console.log(randomY);},2000)

const player = new Player();
const obstaclesArr = [];
const platform = new Platform(); 
const enemy = new Enemy(randomY);

////////////////////////////////////////////// HP
const lives = document.createElement('div')
lives.setAttribute("class", "healthBar")
const parentBoard = document.getElementById("board");
parentBoard.appendChild(lives);

////////////////////////////////////////////////////// Timer
const timeBar = document.createElement('div');
  timeBar.setAttribute("class", "timeBar");
  parentBoard.appendChild(timeBar);
  let timeCount = 30;
  
  setInterval(() => {
    timeCount--;
  },1000)

///////////// SETTINGS/////////////////////////////////


const groundDamange = function livesCount() {
  if(player.positionY <= 0){
    player.lives -= 0.5;
  }
  if(player.lives === 0){
    location.href = "./gameover.html";
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
      player.jump() ;
      break;
    case "ArrowDown":
      player.moveDown();
      break;
    case "Space":
      player.shoot();           
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
  


///////////////////////////////////////////////////////// Game loop
function gameLoop() {

  ///////////////// Character update
  player.move();
  player.gravity();

  enemy.moveLeft();
  ///////////////////////////////////////////Update Bars
  lives.innerHTML = 'HP' + player.lives;
  timeBar.innerHTML = 'Time' + timeCount;

  /////////////////////////// Win condition
  if(timeCount === 0){
    location.href = "./win.html"
  }
  
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
///////////////////// Enemy
randomY = Math.floor((Math.random() * (100 - 1) + 1));
//// Push
enemy.push();
////////////// Respawn
if(enemy.X < 0){
  enemy.reappear();
}
////////////////  Damage
groundDamange();

  requestAnimationFrame(gameLoop);    // This keeps the loop running
}
gameLoop();