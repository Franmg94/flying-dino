class Player {
    constructor(){
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
    }
    moveRight(){
      console.log('Right');
      this.positionX++;
      this.playerCharacter.style.left = this.positionX + "em";
    };
    moveLeft(){
      console.log('Left');
      this.positionX--;
      this.playerCharacter.style.left = this.positionX + "em";
    };
    moveUp(){
      console.log('Up');
      this.positionY++;
      this.playerCharacter.style.bottom = this.positionY + "em";
    };
    moveDown(){
      console.log('Down');
      this.positionY--;
      this.playerCharacter.style.bottom = this.positionY + "em";
    };
  }
  

  /////////////// Game
  const player = new Player();

  
  /////// Events

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
    }
  });