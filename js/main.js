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

const enemyArr = [];
const enemy = new Enemy();

// const audioOnGame = document.getElementById('onGame-music');
// audioOnGame.play();

// const audioWin = document.getElementById('win-music');
// audioWin.play();

// const audioGameover = document.getElementById('gameover-music')
// audioGameover.play();

////// Clouds
const parentBoard = document.getElementById("board");

const cloudsDecoration = document.createElement('div');
cloudsDecoration.setAttribute("class", "clouds");
parentBoard.appendChild(cloudsDecoration);

////////////////////////////////////////////// HP Bar
const lives = document.createElement('div')
lives.setAttribute("class", "healthBar")
parentBoard.appendChild(lives);

////////////////////////////////////////////////////// Timer Bar
const timeBar = document.createElement('div');
timeBar.setAttribute("class", "timeBar");
parentBoard.appendChild(timeBar);
let timeCount = 30;

setInterval(() => {    /// Countdown
  timeCount--;
}, 1000)


///////////// SETTINGS/////////////////////////////////


const playerShoot = function shootBullet(){
  if(player.shootPressed){
    const bullet = new Bullet(player.positionX, player.positionY);
    bulletArr.push(bullet);
  }
}


const groundDamage = function livesCount() {
  if (player.positionY <= 0) {
    player.lives--;
  }  
  if (player.lives === 0) {
    location.href = "./gameover.html";
  }  
}  

setInterval(() => {               //////////////// enemy CREATION
  const newEnemy = new Enemy();
  enemyArr.push(newEnemy);
}, 30);

setInterval(() => {         //////////////////////// obstacle CREATION
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
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
    // console.log('onTop: touched')
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
    // console.log('enemyPush: Touched enemy');
    player.onWall = true;
    player.positionX -= enemy.speed;
    player.lives--;
    player.move();
    player.gravityOn = false;
  }
}
////////////////////////////// Detect COLLISION 

function platformPush(player, platform) {        ////////////////////////////// Detect COLLISION 
  if (
    player.positionX < platform.positionX + platform.width &&
    player.positionX + player.width > platform.positionX &&
    player.positionY < platform.positionY + platform.height &&
    player.positionY + player.height > platform.positionY
  ) {
    // console.log('platformPush: ');
    player.onWall = true;
    player.positionX -= platform.speed;
    player.move();
    player.gravityOn = false;
  }
}

//   if (
//     bullet.positionX < enemy.positionX + enemy.width &&
//     bullet.positionX + bullet.width > enemy.positionX &&
//     bullet.positionY < enemy.positionY + enemy.height &&
//     bullet.positionY + bullet.height > enemy.positionY
//   ) {
//     console.log('bulletDmg: Touched enemy');
//     enemy.lives--;
//     console.log(enemy.lives);
//   }
// }

function bulletPush(r1, r2) {        
  if (
    r1.positionX < r2.positionX + r2.width &&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
  ) {
    console.log('bullet: Touched enemy');
    r2.lives--;
    console.log(r2.lives);
  }
}
const bulletDmg = function bulletDmg(bulletArr, enemyArr){       
for(const bullet of bulletArr){
  for(const enemy of enemyArr){
    bulletPush(bullet,enemy)
  }
}
}
function deadEnemy(){
  if(enemy.lives === 0){
    enemy.remove();
  }
};

function gameLoop() {             ///////////////////// Game loop  

  /////////////////  Objects Movement
  player.move();
  player.gravity();

  enemy.moveLeft();
  obstaclesArr.forEach(obstacle=>obstacle.moveLeft());


  //////////////////////// Bullet //////////////////////////
  
  bulletArr.forEach(bullet => bullet.move());
  playerShoot();

  bulletDmg(bulletArr, enemyArr);
  // deadEnemy();
  ///////////////////// Enemy/////////////////

  if (enemy.positionX < 0) {
    enemy.reappear();
  }
  // enemyArr.forEach((enemy) => {
  //   if(enemy.lives < 0){
  //     enemy.splice(enemy[0],1)
  //   }
  // })
 
  ////////////////  Damage
  groundDamage();
  enemyPush(player, enemy);


  ///////////////////////////////////////////Update Bars
  lives.innerHTML = 'HP ' + player.lives;
  timeBar.innerHTML = 'Time ' + timeCount;


  
  if (timeCount === 0) {          /////////////////////////// Win condition
    location.href = "./win.html"
  }

  
  onPlatform(player, platform);     //////////////////////   On the platform
  obstaclesArr.forEach(obstacle => onTop(player, obstacle)); 
  obstaclesArr.forEach(obstacle=>platformPush(player, obstacle));   // moves character while on top
  

  requestAnimationFrame(gameLoop); 
}
////////////////////////////////////////////////////

gameLoop();