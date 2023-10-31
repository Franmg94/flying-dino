export default class Enemy {
    constructor(){
        this.X = 80;
        this.Y = 40;
        this.width = 2;
        this.height = 3;
        this.HP = 2;
        this.speed = 0.5;
        this.enemy = null;

        this.enemy = document.createElement('div');
        this.enemy.classList.add("enemy");
        this.enemy.style.width = this.width + 'em';
        this.enemy.style.height = this.height + 'em';
        this.enemy.style.left = this.X + "vw";
        this.enemy.style.bottom = this.Y + "vh";

        const parentBoard = document.getElementById("board");
        parentBoard.appendChild(this.enemy);
        
        console.log('Im here')

        this.reappear();
        
    }
    moveUp(){
        this.Y += this.speed;
        this.enemy.style.bottom = this.Y + "vh"
    }
    moveDown(){
        this.Y -= this.speed;
        this.enemy.style.bottom = this.Y + "vh"
    }
    moveLeft(){
        this.X -= this.speed;
        this.enemy.style.left = this.X + "vw"
    }
    reappear(){
       setTimeout(()=>{this.X = 80;},1000)
    }
    push(){
        if (
            player.positionX < this.enemy.X + this.enemy.width &&
            player.positionX + player.width > this.enemy.X &&
            player.positionY < this.enemy.Y + this.enemy.height &&
            player.positionY + player.height > this.enemy.Y
          ) {
            player.onWall = true; 
            player.positionX--;
            player.move();
          } 
    }
}