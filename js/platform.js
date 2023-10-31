export default class Platform {
  constructor() {
    this.width = 4;
    this.height = 1;
    this.positionY = 23;
    this.positionX = 0;
    this.platform = null;

    this.platform = document.getElementById('platform');
    this.platform.style.width = this.width + 'vw';
    this.platform.style.height = this.height + 'vw';

   // this.ground();
  }
  ground() {
    if (platformCollision(player, this.platform)) {
      console.log('ground')
    }
  }

}