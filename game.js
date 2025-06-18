const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const stepSound = document.getElementById("step-sound");
const battleSound = document.getElementById("battle-sound");
const winSound = document.getElementById("win-sound");

const tileSize = 32;
const player = {
  x: 4,
  y: 4,
  hp: 10,
  color: "#00F"
};

function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  drawHUD();
}

function drawHUD() {
  ctx.fillStyle = "#FFF";
  ctx.font = "12px monospace";
  ctx.fillText(`HP: ${player.hp}`, 10, 280);
}

document.addEventListener("keydown", (e) => {
  let moved = false;
  switch (e.key) {
    case "ArrowUp": if (player.y > 0) { player.y--; moved = true; } break;
    case "ArrowDown": if (player.y < 8) { player.y++; moved = true; } break;
    case "ArrowLeft": if (player.x > 0) { player.x--; moved = true; } break;
    case "ArrowRight": if (player.x < 9) { player.x++; moved = true; } break;
  }
  if (moved) {
    stepSound.play();
    drawPlayer();
    if (Math.random() < 0.1) {
      triggerBattle();
    }
  }
});

function triggerBattle() {
  battleSound.play();
  setTimeout(() => {
    const playerWins = Math.random() > 0.5;
    if (playerWins) {
      alert("You won the battle!");
      winSound.play();
    } else {
      alert("You lost the battle...");
      player.hp = Math.max(0, player.hp - 2);
    }
    drawPlayer();
  }, 500);
}

window.onload = drawPlayer;
