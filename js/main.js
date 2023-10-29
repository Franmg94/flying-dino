///////////////////////// PLAYER

class Player {
  constructor() {
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

    this.gravity();
  }
  moveRight() {
    console.log(`Position X : ${this.positionX}`);
    this.positionX++;
    this.playerCharacter.style.left = this.positionX + "em";
  };
  moveLeft() {
    console.log(`Position X : ${this.positionX}`);
    this.positionX--;
    this.playerCharacter.style.left = this.positionX + "em";
  };
  moveUp() {
    console.log(`Position Y : ${this.positionY}`);
    this.positionY++;
    this.playerCharacter.style.bottom = this.positionY + "em";
  };
  moveDown() {
    console.log(`Position Y : ${this.positionY}`);
    this.positionY--;
    this.playerCharacter.style.bottom = this.positionY + "em";
  };
  jump(){
    console.log(`Jump : ${this.positionY}`);
    for(let i=0; i < 5; i++){
      this.positionY++;
    };
    this.playerCharacter.style.bottom = this.positionY + "em";
  };
  gravity() {
    setInterval(() => {
      if (this.positionY > 0 || collisionCheck()) {
        console.log(`Gravity : ${this.positionY}`)
        this.positionY--;
        this.playerCharacter.style.bottom = this.positionY + "em";
      } 
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
    case "Space":
      player.jump();
      console.log(`Jump : ${this.positionY}`);
      break;
  }
});

///////////////////////////////////////////////////////Check the key code
document.addEventListener("keydown", (e) => {
  console.log("Key code:", e.code); // Log the key code
  console.log("Key:", e.key); // Log the key

  // Your key event handling logic here
});


///////////////////////////////////////////// Obstacles CREATION
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle)
}, 5000);

////////////////////////////////////////////// Obstacle MOVEMENT and STOP obstacle
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (!collisionCheck(obstacle)) {
      obstacle.moveLeft();
    }
  });
}, 200);

/////////////////////////////////////////////////////// Obstacle mov and PUSH player
setInterval(() => {
  obstaclesArr.forEach((obstacle) => {
    if (collisionCheck(obstacle)) {
      console.log("trying to push")
      player.moveLeft();
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
    console.log('collision');
    return true;
  } else {
    return false;
  }
};



////////////////////////// GRAVITY
//  const gravity = setInterval(() => {
//   console.log("I'm gravity")
//   player.positionY--;
//  },10)