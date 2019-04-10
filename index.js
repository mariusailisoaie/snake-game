const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#95A5A6';
const snakeColor = '#006442';
const snakeBorderColor = '#000';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

drawingContext.fillStyle = canvasBackgroundColor;
drawingContext.strokestyle = canvasBorderColor;
drawingContext.fillRect(0, 0, canvas.width, canvas.height);
drawingContext.strokeRect(0, 0, canvas.width, canvas.height);

let snake = [
  { x: 400, y: 400 },
  { x: 380, y: 400 },
  { x: 360, y: 400 },
]

const drawSnakePart = snakePart => {
  drawingContext.fillStyle = snakeColor;
  drawingContext.strokestyle = snakeBorderColor;

  drawingContext.fillRect(snakePart.x, snakePart.y, 20, 20);
  drawingContext.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

const drawSnake = (() => {
  snake.forEach(snakePart => {
    console.log(snakePart);
    drawSnakePart(snakePart);
  });
})();