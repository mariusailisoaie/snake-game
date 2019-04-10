const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const snakeBorderColor = '#000';

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

paintCanvas();

let snake = [
  { x: 400, y: 400 },
  { x: 380, y: 400 },
  { x: 360, y: 400 },
  { x: 340, y: 400 },
  { x: 320, y: 400 },
  { x: 300, y: 400 },
  { x: 280, y: 400 },
  { x: 260, y: 400 },
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

const snakeMove = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }

  drawingContext.fillStyle = '#CA6924';
  drawingContext.strokestyle = 'black';
  
  drawingContext.fillRect(head.x, head.y, 20, 20);
  drawingContext.strokeRect(head.x, head.y, 20, 20);

  if (head.x === 800) {
    head.x = -20;
  } else if(head.x === -20) {
    head.x = 780;
  } else if(head.y === 800) {
    head.y = -20;
  } else if(head.y === -20) {
    head.y = 780;
  }

  console.log(snake);
  
  snake.forEach(square => {
    if (head.x === square.x - 20) {
      snake = [];
    }
  })

  snake.unshift(head);
  snake.pop();
}

const arrowKeyPressed = (key) => {
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