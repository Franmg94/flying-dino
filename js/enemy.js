export default class Enemy {
    constructor() {
        this.positionX = 80;
        this.positionY = 24;
        this.width = 2;
        this.height = 3;
        this.HP = 2;
        this.speed = 0.1;
        this.enemy = null;

        this.enemy = document.createElement('div');
        this.enemy.classList.add("enemy");
        this.enemy.style.width = this.width + 'em';
        this.enemy.style.height = this.height + 'em';
        this.enemy.style.left = this.positionX + "vw";
        this.enemy.style.bottom = this.positionY + "vh";


        const parentBoard = document.getElementById("board");
        parentBoard.appendChild(this.enemy);

        
    
        this.reappear();
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


}
