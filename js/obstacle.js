export default class Obstacle {
  constructor() {
    this.width = 7;
    this.height = 5;
    this.positionX = 80;
    this.positionY = Math.floor(Math.random() * (25 - 1) + 1);
    this.speed = 0.2;
    this.obstacle = null;



    this.obstacle = document.createElement("div");

    this.obstacle.classList.add("obstacle", "img-cover");
    this.obstacle.style.width = this.width + "vw";
    this.obstacle.style.height = this.height + "vh";
    this.obstacle.style.left = this.positionX + "vw";
    this.obstacle.style.bottom = this.positionY + "vh";

    const parentBoard = document.getElementById("board");
    parentBoard.appendChild(this.obstacle);
  }
  moveLeft() {
    this.positionX -= this.speed;
    this.obstacle.style.left = this.positionX + "vw";
  }
}