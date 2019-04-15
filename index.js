const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const borderColor = '#000';
const foodColor = '#513814';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

const scoreElement = document.getElementById('score');

let dx = 20, dy = 0, score = 0, snakeSpeed = 250;


// Initial snake length
let snake = [
  { x: 180, y: 200 },
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 },
]
scoreElement.innerHTML = `Score: ${score}`;

const paintCanvas = () => {
  drawingContext.fillStyle = canvasBackgroundColor;
  drawingContext.strokestyle = canvasBorderColor;
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
  drawingContext.strokeRect(0, 0, canvas.width, canvas.height);
}

// Function that draws each snake part in the snake array
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

// Function that draws a "tongue" for the snake
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

// Initial food coordinates/position
let foodX = Math.floor(Math.random() * 20) * 20;
let foodY = Math.floor(Math.random() * 20) * 20;

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

  // Increase snake speed when it grows
  if (score !== 0 && score % 5 === 0) {
    snakeSpeed -= 10;
  }
  console.log(snakeSpeed);

  // Snake ate food logic
  if (head.x === foodX && head.y === foodY) {
    snake.push({ foodX, foodY });
    drawFood(Math.floor(Math.random() * 20) * 20, Math.floor(Math.random() * 20) * 20);
    score++;
  }
  scoreElement.innerHTML = `Score: ${score}`;

  // Snake bit itself logic
  snake.forEach(snakePart => {
    if (head.x === snakePart.x && head.y === snakePart.y) {
      if(snake.length > 3) {
        console.log('Game Over!');
        // Reset snake length to 3
        snake = snake.splice(0, 3);
        
        // Reset snake position to initial position
        head.x = 180;
        head.y = 200;
        dx = 20;
        dy = 0;
      }
      score = 0;
    }
  });

  // Allow snake to walk through walls
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

// Function for changinc the snake direction via arrow keys
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
  // Useful for testing
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
const callFunctions = () => {
  snakeMove();
  paintCanvas();
  drawSnake();
  drawSnakeTongue();
  drawFood(foodX, foodY);
  
  setTimeout(() => {
    callFunctions();
  }, snakeSpeed);
}

callFunctions();