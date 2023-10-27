const player = document.getElementById("player");
const container = document.getElementById("gameContainer");

let angle = 0; // Initial angle

function movePlayer() {
    angle -= 1; // Adjust this value to control the speed of movement
    const radians = (angle * Math.PI) / 180;
    const radius = container.clientWidth / 2;

    const x = container.clientWidth / 2 + radius * Math.cos(radians);
    const y = container.clientHeight / 2 + radius * Math.sin(radians);

    player.style.left = x - player.clientWidth / 2 + "px";
    player.style.top = y - player.clientHeight / 2 + "px";

    requestAnimationFrame(movePlayer);
}

movePlayer();
