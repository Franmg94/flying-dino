export default class Enemy {
    constructor() {
        this.positionX = 80;
        this.positionY = Math.floor(Math.random() * 32 - 10) + 10;
        this.width = 2;
        this.height = 6;
        this.lives = 2;
        this.speed = 0.2;
        this.enemy = null;

        this.enemy = document.createElement('div');
        this.enemy.classList.add("enemy");
        this.enemy.style.width = this.width + 'vw';
        this.enemy.style.height = this.height + 'vh';
        this.enemy.style.left = this.positionX + "vw";
        this.enemy.style.bottom = this.positionY + "vh";


        const parentBoard = document.getElementById("board");
        parentBoard.appendChild(this.enemy);

        
    
        
    }

    moveUp() {
        this.positionY += this.speed;
        this.enemy.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY -= this.speed;
        this.enemy.style.bottom = this.positionY + "vh";
    }

    moveLeft() {
        this.positionX -= this.speed;
        this.enemy.style.left = this.positionX + "vw";
    }

    reappear() {
        setTimeout(() => {
            this.positionX = 80;
        }, 1000);
    }

    die(){
        this.enemy.remove()
    }


}
