let canvas = document.getElementById('canvas');
let sideCanvas = document.getElementById('sideCanvas');
let ctx = canvas.getContext('2d');
let sideCtx = sideCanvas.getContext('2d');
canvas.width = 480;//window.innerWidth;
canvas.height = 480;// window.innerHeight;
sideCanvas.width = 200;
sideCanvas.height = 480;

const snakeImg = new Image();

snakeImg.src = "snake.png";

let rows = 20;
let cols = 20;
let snake = [
  {x: 2, y: 3},
];
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "LEFT";
let death = true;
let foodCollected = false;
let snakeLen = 1;

snakeImg.onload = function () {
  sidebarDraw();
};
placeFood();
draw();
setInterval(gameLoop, 200);
document.addEventListener('keydown', keyDown);
document.addEventListener('keydown', restartGame);



function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (death == false) {
    ctx.fillStyle = 'yellow';
    addElement(food.x, food.y);
    ctx.fillStyle = 'green';
    snake.forEach(part => addElement(part.x, part.y));
  }
  else
    drawDeathMessage();
  requestAnimationFrame(draw);
}

function addElement(x, y) {
  ctx.fillRect((x * cellWidth), (y * cellHeight), (cellWidth - 1), (cellHeight - 1));
}

function shiftSnake() {
  for (let i = (snake.length - 1); i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];

    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}
function gameLoop() {
  checkForGameTermination();
  replaceFood();
  addToSnake();
  shiftSnake();
  changeDirection();
  updateSidebar();
}


function restartGame() {
  if (death == true) {
    death = false;
    resetSnake();
  }
}

function keyDown(keybord) {
  if (keybord.keyCode == 37) {
    direction = 'LEFT';
  }
  else if (keybord.keyCode == 38) {
    direction = 'UP';
  }
  else if (keybord.keyCode == 39) {
    direction = 'RIGHT';
  }
  else if (keybord.keyCode == 40) {
    direction = 'DOWN';
  }
}

function changeDirection() {
  if (direction == 'LEFT') {
    snake[0].x--;
  }
  else if (direction == 'RIGHT') {
    snake[0].x++;
  }
  else if (direction == 'UP') {
    snake[0].y--;
  }
  else if (direction == 'DOWN') {
    snake[0].y++;
  }
}

function placeFood() {
  let randomX = Math.floor(Math.random() * cols);
  let randomY = Math.floor(Math.random() * rows);

  food = {x: randomX, y: randomY};
}

function addToSnake() {
  if (foodCollected == false)
    return;
  snake = [{x: snake[0].x, y: snake[0].y}, ...snake]
  foodCollected = false;
  snakeLen++;
}

function replaceFood() {
  if (snake[0].x == food.x &&
    snake[0].y == food.y) {
    foodCollected = true;
    placeFood();
  }
}

function checkForGameTermination() {
  if (isHittinWall() == true)
    death = true;
  else if (isBitingItSelf() == true)
    death = true;
}

function resetSnake() {
  placeFood();
  snake = [
    {x: 10, y: 10}
  ]
  snakeLen = 1;
}

function isHittinWall() {
  if (snake[0].x < 0 ||
    snake[0].x > cols - 1 ||
    snake[0].y < 0 ||
    snake[0].y > rows - 1)
    return (true);
  return (false)
}

function isBitingItSelf() {
  let firtsPart = snake[0];
  let otherParts = snake.slice(1);

  if (otherParts.find(part => part.x == firtsPart.x && part.y == firtsPart.y) != undefined)
    return (true);
  return (false);
}

function drawDeathMessage() {
  if (death == false)
    return;
        ctx.fillStyle = "red";
  ctx.fillRect(0, (canvas.height / 4), canvas.width, (canvas.height / 2));
  ctx.fillStyle = "black";
  ctx.font = "30px 'ArcadeClassic'";
  var textString = "GAME IS  OVER";
  var textWidth = ctx.measureText(textString).width;
  ctx.fillText(textString, (canvas.width / 2) - (textWidth / 2), 250);
  ctx.font = "20px 'ArcadeClassic'";
  textString = "Press any key to restart";
  textWidth = ctx.measureText(textString).width;
  ctx.fillText(textString, (canvas.width / 2) - (textWidth / 2), ((canvas.height / 2) + 35));
}

function sidebarDraw() {
  sideCtx.fillStyle = '#808080';
  sideCtx.fillRect(0, 0, 200, 480);

  sideCtx.strokeStyle = "#403b3b";
  sideCtx.lineWidth = 10;
  sideCtx.strokeRect(0, 0, 200, 479);

  sideCtx.drawImage(snakeImg, 39, 226, 122, 226);

  sideCtx.fillStyle = "black";
  sideCtx.font = "20px 'ArcadeClassic'";
  var lenText = "Snake   Lenght:   " + snakeLen.toString();
  sideCtx.fillText(lenText, 10, 30);
}

function updateSidebar() {
  sideCtx.fillStyle = '#808080';
  sideCtx.fillRect(0, 0, 200, 120);

  sideCtx.strokeStyle = "#403b3b";
  sideCtx.lineWidth = 10;
  sideCtx.strokeRect(0, 0, 200, 479);

  sideCtx.fillStyle = "black";
  sideCtx.font = "20px 'ArcadeClassic'";
  var lenText = "Snake   Lenght:   " + snakeLen.toString();
  sideCtx.fillText(lenText, 10, 30);
}
