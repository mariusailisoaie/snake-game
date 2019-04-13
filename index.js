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
  drawingContext.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

const drawSnake = () => {
  snake.forEach(snakePart => {
    drawSnakePart(snakePart);
  });
};

let foodX = Math.floor(Math.random() * 19 + 1) * 20;
let foodY = Math.floor(Math.random() * 19 + 1) * 20;

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

const drawFood = () => {
  drawingContext.fillStyle = foodColor;
  drawingContext.strokestyle = borderColor;

  drawingContext.fillRect(foodX, foodY, 20, 20);
}

const snakeMove = () => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  console.log(head);

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

  // if (head.x === foodX && head.y === foodY) {
  //   drawFood();
	// 	console.log('log: snakeMove -> drawFood()');
  // }
}

paintCanvas();
drawSnake();
drawSnakeTongue();
drawFood();

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

// setInterval(() => {
//   snakeMove();
//   paintCanvas();
//   drawSnake();
//   drawSnakeTongue();
//   drawFood();
// }, 400);