const canvasBorderColor = '#F22613';
const canvasBackgroundColor = '#264348';

const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');

drawingContext.fillStyle = canvasBackgroundColor;
drawingContext.strokestyle = canvasBorderColor;
drawingContext.fillRect(0, 0, canvas.width, canvas.height);
drawingContext.strokeRect(0, 0, canvas.width, canvas.height);