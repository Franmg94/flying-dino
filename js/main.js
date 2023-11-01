import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Enemy from "./enemy.js";
import Platform from "./platform.js";
import Bullet from "./bullet.js";

   

/////////////// GAME INITIALIZE   ///////////////////////////

console.log(VisualViewport)


const player = new Player();
const platform = new Platform();
const obstaclesArr = [];
const bulletArr = [];


const enemy = new Enemy();

// const audioOnGame = document.getElementById('onGame-music');
// audioOnGame.play();

// const audioWin = document.getElementById('win-music');
// audioWin.play();

// const audioGameover = document.getElementById('gameover-music')
// audioGameover.play();

////////////////////////////////////////////// HP Bar
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
}, 1000)


///////////// SETTINGS/////////////////////////////////


const playerShoot = function shootBullet(){
  if(player.shootPressed){
    const bullet = new Bullet(player.positionX, player.positionY);
    bulletArr.push(bullet);
  }
}


const groundDamange = function livesCount() {
  if (player.positionY <= 0) {
    player.lives -= 0.5;
  }
  if (player.lives === 0) {
    location.href = "./gameover.html";
  }
}


setInterval(() => {         //////////////////////// obstacle CREATION
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle)
}, 2000);


setInterval(() => {        /////////////////////// obstacle REMOVE 
  obstaclesArr.forEach((obstacle) => {
    if (obstacle.positionX + obstacle.width < 0) {
      obstaclesArr.splice(obstacle[0], 1);
    }
  });
}, 150);




function onPlatform(r1, r2) {       ////////////////////////////// Detect COLLISION 
  if (
    r1.positionX < r2.positionX + r2.width &&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
  ) {
    player.onGround = true;
    // console.log('onPlatform: on platform')
  } else {
    player.onGround = false;
  }
}



function onTop(r1, r2) {         ////////////////////////////// Detect COLLISION 
  if (
    r1.positionX < r2.positionX + r2.width &&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
  ) {
    console.log('onTop: touched')
    player.onGround = true;
    player.gravityOn = false;
  };
};

function enemyPush(player, enemy) {        ////////////////////////////// Detect COLLISION 
  if (
    player.positionX < enemy.positionX + enemy.width &&
    player.positionX + player.width > enemy.positionX &&
    player.positionY < enemy.positionY + enemy.height &&
    player.positionY + player.height > enemy.positionY
  ) {
    console.log('enemyPush: Touched enemy');
    player.onWall = true;
    player.positionX -= enemy.speed;
    player.move();
    player.gravityOn = false;
  }
}



function gameLoop() {             ///////////////////// Game loop  

  ///////////////// Character update
  player.move();
  player.gravity();

  bulletArr.forEach(bullet => bullet.move());
  playerShoot();

  enemy.moveLeft();
  obstaclesArr.forEach(obstacle=>obstacle.moveLeft());

 

  ///////////////////// Enemy/////////////////

  if (enemy.positionX < 0) {
    enemy.reappear();
  }
 

  ////////////////  Damage
  groundDamange();

  ///////////////////////////////// PUSH 
  enemyPush(player, enemy);
  obstaclesArr.forEach(obstacle=>enemyPush(player, obstacle));
  

  ///////////////////////////////////////////Update Bars
  lives.innerHTML = 'HP ' + player.lives;
  timeBar.innerHTML = 'Time ' + timeCount;


  /////////////////////////// Win condition
  if (timeCount === 0) {
    location.href = "./win.html"
  }

  
  onPlatform(player, platform);     //////////////////////   On the platform


  obstaclesArr.forEach((obstacle) => {    /////// on the obstacle
    onTop(player, obstacle);
  })
  

  

  requestAnimationFrame(gameLoop);    // This keeps the loop running
}
////////////////////////////////////////////////////

gameLoop();