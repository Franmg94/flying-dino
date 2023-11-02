import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Enemy from "./enemy.js";
import Platform from "./platform.js";
import Bullet from "./bullet.js";

   

/////////////// GAME INITIALIZE   ///////////////////////////

console.log(VisualViewport)

function startGame(){
  
}

const player = new Player();
const platform = new Platform();
const obstaclesArr = [];
const bulletArr = [];
const enemyArr = [];

// const enemy = new Enemy();

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


const playerShoot = function shootBullet(){         //// Player functions
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

const bulletPush = function bulletPush(r1, r2,i) {       //// bullet TOUCH enemy
  if (
    r1.positionX < r2.positionX + r2.width &&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
  ) {
    console.log('bullet: Touched enemy');
    r2.lives--;
    if(r2.lives <= 0){
      r2.enemy.remove()
      enemyArr.splice(i,1)
    }
    console.log(r2.lives);
  }
}
const bulletDmg = function bulletDmg(bulletArr, enemyArr){      /// bullet DMG enemy   
for(const bullet of bulletArr){
  enemyArr.forEach((enemy, i)=>{bulletPush(bullet,enemy,i)})
}
}

setInterval(() => {               /////////////////////// enemy CREATION
  const newEnemy = new Enemy();
  enemyArr.push(newEnemy);
}, 3000);

const enemyReappear = function enemyReappear(){enemyArr.forEach((enemy)=>{        // enemy REAPPEAR
  if (enemy.positionX < 0) {
    enemy.reappear(); 
  }})} ;

const deadEnemy = function(){enemyArr.filter((enemy) => enemy.lives <= 0)};   //// enemy DEAD

  // function createEnemy(){
//   const newEnemy = new Enemy();
//   enemyArr.push(newEnemy);
// };

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


// function deadEnemy(){
//   if(enemy.lives === 0){
//     enemy.remove();
//   }
// };

function gameLoop() {             ///////////////////// Game loop  //////////////////////////////////////

  /////////////////  Objects Movement
  player.move();
  player.gravity();

  // createEnemy();
  enemyArr.forEach(enemy => enemy.moveLeft());
  // enemy.moveLeft();
  obstaclesArr.forEach(obstacle=>obstacle.moveLeft());


  //////////////////////// Bullet //////////////////////////
  
  bulletArr.forEach(bullet => bullet.move());
  playerShoot();

  
  bulletDmg(bulletArr, enemyArr);
  // deadEnemy();

  ///////////////////// Enemy/////////////////

    enemyReappear()
    deadEnemy();

  // enemyArr.forEach((enemy, index) => {
  //   if(enemy.lives < 0){
  //     enemy.splice(index,1)
  //   }
  // })
 
  ////////////////  Damage
  groundDamage();
  enemyArr.forEach((enemy)=>enemyPush(player, enemy));
  // enemyPush(player, enemy);


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