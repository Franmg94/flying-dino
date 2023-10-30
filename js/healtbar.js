// class HealthBar {
//     constructor(x, y, w, h, maxHealth, color) {
//         this.x = x; 
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.maxHealth = maxHealth;
//         this.maxWidth = w;
//         this.health = maxHealth;
//         this.color = color;
//     }

//     show(context){
//         context.strokeStyle = "#333";
//         context.lineWidth = 5;
//         context.fillStyle = this.color;
//         context.fillRect(this.x, this.y, this.w, this.h);
//         context.strokeRect(this.x, this.y, this.maxWidth, this.h);
//     }
// }

// ////////////// This goes on the main js page

// let health = 100;
// const healthBarWidth = 200;
// const healthBarHeight = 30;
// const x = width / 2 - healthBarWidth / 2;
// const y = height / 2 - healthBarHeight / 2

// const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "green")

// const frame = function() {
//   context.clearRect(0,0, width, height);
//   healthBar.show(context)
//   requestAnimationFrame(frame);
// }

// frame();