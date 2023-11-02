import Player from "./player.js";
import Obstacle from "./obstacle.js";
import Enemy from "./enemy.js";
import Platform from "./platform.js";
import Bullet from "./bullet.js";


const player = new Player();
const platform = new Platform();
const obstaclesArr = [];
const bulletArr = [];
const enemyArr = [];
const parentBoard = document.getElementById("board");


////// Clouds
const cloudsDecoration = document.createElement('div');
cloudsDecoration.setAttribute("class", "clouds", "img-cover");
parentBoard.appendChild(cloudsDecoration);

////////////////////////////////////////////// HP Bar
const lives = document.createElement('div')
lives.setAttribute("class", "healthBar")
parentBoard.appendChild(lives);

////////////////////////////////////////////////////// Timer Bar
const timeBar = document.createElement('div');
timeBar.setAttribute("class", "timeBar");
parentBoard.appendChild(timeBar);
let timeCount = 60;

////////////////////////////////////////////////// Score Bar
const scoreBar = document.createElement('div');
scoreBar.setAttribute("class", "scoreBar");
parentBoard.appendChild(scoreBar);
let score = 0;


const countDown = setInterval(() => {timeCount--;}, 1000);

const playerShoot = function shootBullet() { 
  if (player.shootPressed) {
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

const bulletPush = function bulletPush(r1, r2, i) { 
  if (
    r1.positionX < r2.positionX + r2.width &&
    r1.positionX + r1.width > r2.positionX &&
    r1.positionY < r2.positionY + r2.height &&
    r1.positionY + r1.height > r2.positionY
  ) {
    r2.lives--;
    if (r2.lives <= 0) {
      r2.enemy.remove()
      enemyArr.splice(i, 1)
      score++;
    }
  }
}
const bulletDmg = function bulletDmg(bulletArr, enemyArr) { 
  for (const bullet of bulletArr) {
    enemyArr.forEach((enemy, i) => { bulletPush(bullet, enemy, i) })
  }
}

const enemyCreation = setInterval(() => {
  const newEnemy = new Enemy();
  enemyArr.push(newEnemy);
}, 3000);

const enemyReappear = function enemyReappear() {
  enemyArr.forEach((enemy) => {
    if (enemy.positionX < 0) {
      enemy.reappear();
    }
  })
};

const deadEnemy = function () { enemyArr.filter((enemy) => enemy.lives <= 0) };

const obstacleCreation = setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
}, 2000);


const obstacleRemove = setInterval(() => {
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
    player.onWall = true;
    player.positionX -= platform.speed;
    player.move();
    player.gravityOn = false;
  }
}


function gameLoop() {
  player.move();
  player.gravity();

  enemyArr.forEach(enemy => enemy.moveLeft());
  obstaclesArr.forEach(obstacle => obstacle.moveLeft());

  bulletArr.forEach(bullet => bullet.move());
  playerShoot();
  bulletDmg(bulletArr, enemyArr);

  enemyReappear()
  deadEnemy();

  groundDamage();
  enemyArr.forEach((enemy) => enemyPush(player, enemy));


  //////////////////////////Update Bars
  lives.innerHTML = 'HP ' + player.lives;
  timeBar.innerHTML = 'Time ' + timeCount;
  scoreBar.innerHTML = 'Score '     + score;

  ////////////////// Win condition
  if (timeCount === 0) {
    location.href = "./win.html"
  }

  //////////////////////   On the platform
  onPlatform(player, platform);
  obstaclesArr.forEach(obstacle => onTop(player, obstacle));
  obstaclesArr.forEach(obstacle => platformPush(player, obstacle));   // moves character while on top


  requestAnimationFrame(gameLoop);
}


gameLoop();