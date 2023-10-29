class Player {
    constructor() {
      // initialize properties
      this.width = 2;
      this.height = 4;
      this.positionX = 3;
      this.positionY = 0;
  
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
        this.player.style.left = this.positionX + "em";
        this.player.style.bottom = this.positionY + "em";
        this.player.style.bottom = this.positionY + "em";
    }
  jump(){
    for(let i=0; i < 5; i++){
      this.positionY++;
    };
    this.player.style.bottom = this.positionY + "em";
  };
  gravity() {
    setInterval(() => {
      if (this.positionY > 0) {
        this.positionY--;
        this.player.style.bottom = this.positionY + "em";
      } 
    }, 100)
  };  
  }



//////////////////////  /////// Press key

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowRight":
        console.log(player.positionX)
        player.positionX++;
        player.move()         
        break;
      case "ArrowLeft":
        player.positionX--; 
        player.move()  
        break;
      case "ArrowUp":
        player.positionY++;
        player.move()  
        break;
      case "ArrowDown":
        player.positionY--;
        player.move()  
        break;
      case "Space":
        player.jump();           
        break;
    }
  });