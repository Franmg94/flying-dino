export default class Bullet {
    constructor(playerX, playerY){
        this.positionX = playerX;
        this.positionY = playerY;
        this.width = 1;
        this.height = 1;
        this.speed = 1;
        this.bullet = null; 
        
        this.bullet = document.createElement('div');
        this.bullet.classList.add("bullet");
        this.bullet.style.width = this.width + 'em';
        this.bullet.style.height = this.height + 'em';
        this.bullet.style.left = this.positionX + "vw";
        this.bullet.style.top = this.positionY + "vh";


        const parentBoard = document.getElementById("board");
        parentBoard.appendChild(this.bullet);

        console.log('I\'m bullet');

        this.moveRight();
    }
    moveRight() {
        this.positionX += this.speed;
        this.enemy.style.left = this.positionX + "vw";
    }
}