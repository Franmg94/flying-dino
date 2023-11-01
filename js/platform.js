export default class Platform {
  constructor() {
    this.width = 11;
    this.height = 8;
    this.positionY = 25;
    this.positionX = 0;
    this.platform = null;

    this.platform = document.getElementById('platform');
    this.platform.style.width = this.width + 'em';
    this.platform.style.height = this.height + 'em';
    this.platform.style.left = this.positionX + 'vw'
    this.platform.style.bottom = this.positionY + 'vh'

   // this.ground();
  }
  ground() {
    if (platformCollision(player, this.platform)) {
      console.log('ground')
    }
  }

}