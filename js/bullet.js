export default class Bullet {
    constructor(playerX, playerY){
        this.positionX = playerX;
        this.positionY = playerY;
        this.width = 1;
        this.height = 1;
        this.speed = 0.8;
        this.bullet = null; 
        
        this.bullet = document.createElement('div');
        this.bullet.classList.add("bullet");
        this.bullet.style.width = this.width + 'vw';
        this.bullet.style.height = this.height + 'vh';
        this.bullet.style.left = this.positionX + "vw";
        this.bullet.style.bottom  = this.positionY + "vh";


        const parentBoard = document.getElementById("board");
        parentBoard.appendChild(this.bullet);

        // console.log('I\'m bullet');
        this.move(); 
    }

    move() {
        this.positionX +=  this.speed ;
        this.bullet.style.left = this.positionX + "vw";
    }
}