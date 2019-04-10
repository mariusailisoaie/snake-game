const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const snakeBorderColor = '#000';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

const paintCanvas = () => {
  drawingContext.fillStyle = canvasBackgroundColor;
  drawingContext.strokestyle = canvasBorderColor;
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
  drawingContext.strokeRect(0, 0, canvas.width, canvas.height);
}

paintCanvas();

let snake = [
  { x: 400, y: 400 },
  { x: 380, y: 400 },
  { x: 360, y: 400 },
  { x: 340, y: 400 },
  { x: 320, y: 400 },
]

const drawSnakePart = snakePart => {
  drawingContext.fillStyle = snakeColor;
  drawingContext.strokestyle = snakeBorderColor;

  drawingContext.fillRect(snakePart.x, snakePart.y, 20, 20);
  drawingContext.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

const drawSnake = () => {
  snake.forEach(snakePart => {
    // console.log(snakePart);
    drawSnakePart(snakePart);
  });
};

const snakeMove = (dx, dy) => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

  drawingContext.fillStyle = '#CA6924';
  drawingContext.strokestyle = 'black';
  
  drawingContext.fillRect(head.x - 20, head.y, 20, 20);
  drawingContext.strokeRect(head.x - 20, head.y, 20, 20);
  
  snake.unshift(head);
  snake.pop();
}

setInterval(() => {
  paintCanvas();
  drawSnake();
  snakeMove(20, 0);
}, 500);