const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const borderColor = '#000';
const foodColor = '#513814';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

let dx = 20, dy = 0;

let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
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
  
  drawingContext.fillRect(snakePart.x - 20, snakePart.y, 20, 20);
  drawingContext.strokeRect(snakePart.x - 20, snakePart.y, 20, 20);
}

const drawSnake = () => {
  snake.forEach(snakePart => {
    drawSnakePart(snakePart);
  });
};

const drawFood = () => {
  let foodX = Math.floor(Math.random() * 19 + 1) * 20;
  let foodY = Math.floor(Math.random() * 19 + 1) * 20;
  
  drawingContext.fillStyle = foodColor;
  drawingContext.strokestyle = borderColor;

  drawingContext.fillRect(foodX, foodY, 20, 20);
  drawingContext.strokeRect(foodX, foodY, 20, 20);
}

const snakeMove = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
	// console.log('log: snakeMove -> head', head);
	console.log('log: snakeMove -> snake', { x: snake[0].x, y: snake[0].y });

  if (head.x === 420) {
    head.x = 20;
  } else if(head.x === 0) {
    head.x = 400;
  } else if(head.y === 400) {
    head.y = 0;
  } else if(head.y === -20) {
    head.y = 380;
  }

  snake.unshift(head);
  snake.pop();
}

paintCanvas();
drawFood();
drawSnake();
snakeMove();

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
  arrowKeyPressed(e.key)
});

// setInterval(() => {
//   paintCanvas();
//   drawSnake();
//   snakeMove();
// }, 1000);