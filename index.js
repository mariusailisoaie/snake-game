const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const borderColor = '#000';
const foodColor = '#513814';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

let dx = 20, dy = 0;

let snake = [
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 },
]

const paintCanvas = () => {
  drawingContext.fillStyle = canvasBackgroundColor;
  drawingContext.strokestyle = canvasBorderColor;
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
  drawingContext.strokeRect(0, 0, canvas.width, canvas.height);
}

const drawSnakePart = snakePart => {
  drawingContext.fillStyle = snakeColor;
  drawingContext.strokestyle = borderColor;
  
  drawingContext.fillRect(snakePart.x, snakePart.y, 20, 20);
  // drawingContext.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

const drawSnake = () => {
  snake.forEach(snakePart => {
    drawSnakePart(snakePart);
  });
};

const drawSnakeTongue = () => {
  let tongue = { x: snake[0].x, y: snake[0].y}
  drawingContext.fillStyle = '#344724';

  drawingContext.fillRect(
    tongue.x + (dx > 0 ? dx : (dy === 0 ? -5 : 0)),
    tongue.y + (dy < 0 ? -5 : (dx < 0 || dx > 0 ? 0 : 20)),
    (dx > 0 || dx < 0 ? 5 : 20),
    (dy < 0 || dy > 0 ? 5 : 20)
  );
}

let foodX = Math.floor(Math.random() * 19 + 1) * 20;
let foodY = Math.floor(Math.random() * 19 + 1) * 20;

const drawFood = (foodXAxis = foodX, foodYAxis = foodY) => {
  drawingContext.fillStyle = foodColor;
  drawingContext.fillRect(foodXAxis, foodYAxis, 20, 20);

  // Reassign foodX and foodY so that food will update
  // properly when called in the setInterval
  foodX = foodXAxis;
  foodY = foodYAxis; 
}

const snakeMove = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

  if (head.x === foodX && head.y === foodY) {
    snake.push({ foodX, foodY });
    drawFood(Math.floor(Math.random() * 19 + 1) * 20, Math.floor(Math.random() * 19 + 1) * 20);
  }

  if (head.x === 400) {
    head.x = 0;
  } else if(head.x === -20) {
    head.x = 380;
  } else if(head.y === 400) {
    head.y = 0;
  } else if(head.y === -20) {
    head.y = 380;
  }
  
  snake.unshift(head);
  snake.pop();
}

const arrowKeyPressed = key => {
  if (key === 'ArrowUp' && dy !== 20) {
    dx = 0;
    dy = -20;
  } else if(key === 'ArrowDown' && dy !== -20) {
    dx = 0;
    dy = 20;
  } else if(key === 'ArrowRight' && dx !== -20) {
    dx = 20;
    dy = 0;
  } else if(key === 'ArrowLeft' && dx !== 20) {
    dx = -20;
    dy = 0;
  } else if(key === 'q'){
    snakeMove();
    paintCanvas();
    drawSnake();
    drawSnakeTongue();
    drawFood();
  }
}

document.addEventListener('keydown', e => {
  arrowKeyPressed(e.key);
});

// Initiate canvas, snake, food (initial paint)
paintCanvas();
drawSnake();
drawSnakeTongue();
drawFood(foodX, foodY);

// Paint elements every n miliseconds / Update drawing of elements
setInterval(() => {
  snakeMove();
  paintCanvas();
  drawSnake();
  drawSnakeTongue();
  drawFood(foodX, foodY);
}, 500);