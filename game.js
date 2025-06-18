const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "assets/player.png";

const tileSize = 32;
const player = {
  x: 4,
  y: 4
};

function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (playerImage.complete && playerImage.naturalWidth !== 0) {
    ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  } else {
    console.warn("⚠️ player.png not found or not loaded");
    ctx.fillStyle = "#F00";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": player.y--; break;
    case "ArrowDown": player.y++; break;
    case "ArrowLeft": player.x--; break;
    case "ArrowRight": player.x++; break;
  }
  drawPlayer();
});

window.onload = drawPlayer;
