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
  }
  
  const player = new Player();