import Bullet from "./bullet.js ";


export default class Player {
  constructor() {
    // initialize properties
    this.width = 3;
    this.height = 8;
    this.positionX = 1;
    this.positionY = 45;
    this.speed = 0.5;
    this.player = null;
    this.lives = 100;
    this.shootPressed = false;

    this.gravityOn = true;
    this.onGround = false;
    this.onWall = false;

    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;

    //dom manipulation
    this.player = document.getElementById('player');
    this.player.classList.add("img-cover")
    this.player.style.width = this.width + "vw";
    this.player.style.height = this.height + "vh";
    this.player.style.left = this.positionX + "vw";
    this.player.style.bottom = this.positionY + "vh";

    // Bind key event handlers
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

   
    this.gravity();
  }

  move() {
    if (this.downPressed) {
      this.positionY -= this.speed;
    }
    if (this.upPressed) {
      this.positionY += this.speed;
    }
    if (this.leftPressed) {
      this.positionX -= this.speed;
    }
    if (this.rightPressed) {
      this.positionX += this.speed;
    }

    // Update player position styles
    this.player.style.left = this.positionX + "vw";
    this.player.style.bottom = this.positionY + "vh";
  }

  keydown = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = true;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = true;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = true;
    }
    if (e.code === "Space") {
      this.shoot();
    }
  };

  keyup = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "ArrowDown") {
      this.downPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  };

  jump() {
    console.log('jump')
    if(this.onGround){
      this.positionY += this.speed;
      this.player.style.bottom = this.positionY + "em";
      this.onGround = false;
    }
   
  }

  shoot() {

    this.shootPressed = true;
    // console.log("shoot " + this.shootPressed );
    setTimeout(() => {
      this.shootPressed = false
      // console.log("shoot " + this.shootPressed)
    },100)
    
  }

  gravity() {
    if (this.onGround) {
      this.gravityOn = false;
      this.onGround = true;
    } else if (this.onGround === false && this.positionY > 0) {
      this.gravityOn = true;
      this.onGround = false;
      this.positionY -= 0.7;
      this.move();
    } else if (this.positionY === 0) {
      this.onGround = true;
      this.gravityOn = false;
    }
  }
}


