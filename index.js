const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const snakeBorderColor = '#000';
const snakeHeadColor = '#CA6924';

let dx = 20;
let dy = 0;

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

const paintCanvas = () => {
  drawingContext.fillStyle = canvasBackgroundColor;
  drawingContext.strokestyle = canvasBorderColor;
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
  drawingContext.strokeRect(0, 0, canvas.width, canvas.height);
}

let snake = [
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 },
]

const drawSnakePart = snakePart => {
  drawingContext.fillStyle = snakeColor;
  drawingContext.strokestyle = snakeBorderColor;
  
  drawingContext.fillRect(snakePart.x, snakePart.y, 20, 20);
  drawingContext.strokeRect(snakePart.x, snakePart.y, 20, 20);
  
  drawingContext.fillStyle = snakeHeadColor;
  drawingContext.strokestyle = snakeBorderColor;
  
  drawingContext.fillRect(snake[0].x, snake[0].y, 20, 20);
  drawingContext.strokeRect(snake[0].x, snake[0].y, 20, 20);
}

const drawSnake = () => {
  snake.forEach(snakePart => {
    drawSnakePart(snakePart);
  });
};

paintCanvas();
drawSnake();

const snakeMove = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

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
    paintCanvas();
    drawSnake();
    snakeMove();
  }
}

document.addEventListener('keydown', e => {
  console.log(e.key);
  arrowKeyPressed(e.key)
});

setInterval(() => {
  paintCanvas();
  drawSnake();
  snakeMove();
}, 1000);