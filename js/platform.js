export default class Platform {
  constructor() {
    this.width = 11;
    this.height = 8;
    this.positionY = 40;
    this.positionX = 0;
    this.platform = null;

    this.platform = document.getElementById('platform');
    this.platform.style.width = this.width + 'vw';
    this.platform.style.height = this.height + 'vh';
    this.platform.style.left = this.positionX + 'vw'
    this.platform.style.bottom = this.positionY + 'vh'
  }
  

}