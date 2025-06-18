const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;

const map = [
  ['G','G','P','P','P','B','B','G','G','G'],
  ['G','F','P','C','C','C','P','F','G','G'],
  ['G','F','P','C','C','C','P','F','G','G'],
  ['G','F','P','P','P','P','P','F','G','G'],
  ['G','F','G','G','G','G','G','F','G','G'],
  ['G','F','F','F','F','F','F','F','G','G'],
  ['G','G','G','G','G','G','G','G','G','G'],
  ['G','G','G','G','G','G','G','G','G','G'],
  ['G','G','G','G','G','G','G','G','G','G']
];

const tileImages = {
  'G': new Image(),
  'P': new Image(),
  'B': new Image(),
  'F': new Image(),
  'C': new Image()
};

tileImages['G'].src = 'assets/tiles/grass.png';
tileImages['P'].src = 'assets/tiles/path.png';
tileImages['B'].src = 'assets/tiles/barn.png';
tileImages['F'].src = 'assets/tiles/fence.png';
tileImages['C'].src = 'assets/tiles/cow.png';

const tileFallbackColors = {
  'G': '#3cba54',
  'P': '#f4e842',
  'B': '#964B00',
  'F': '#8B8B8B',
  'C': '#fffacd'
};

const playerImage = new Image();
playerImage.src = 'assets/player.png';

const player = {
  x: 4,
  y: 4,
  hp: 10
};

function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const img = tileImages[tile];
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
      } else {
        ctx.fillStyle = tileFallbackColors[tile] || '#000';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
}

function drawHUD() {
  ctx.fillStyle = "#FFF";
  ctx.font = "12px monospace";
  ctx.fillText(`HP: ${player.hp}`, 10, 280);
}

function drawPlayer() {
  drawMap();
  if (playerImage.complete && playerImage.naturalWidth !== 0) {
    ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  } else {
    ctx.fillStyle = "#00F";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
  }
  drawHUD();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": player.y = Math.max(0, player.y - 1); break;
    case "ArrowDown": player.y = Math.min(map.length - 1, player.y + 1); break;
    case "ArrowLeft": player.x = Math.max(0, player.x - 1); break;
    case "ArrowRight": player.x = Math.min(map[0].length - 1, player.x + 1); break;
  }
  drawPlayer();
});

window.onload = drawPlayer;
