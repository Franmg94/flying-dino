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