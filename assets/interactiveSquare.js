const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to be proportional to the screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust the dots positions proportionally to the canvas size
const dots = [
  { x: canvas.width * 0.3, y: canvas.height * 0.3 },
  { x: canvas.width * 0.7, y: canvas.height * 0.3 },
  { x: canvas.width * 0.7, y: canvas.height * 0.7 },
  { x: canvas.width * 0.3, y: canvas.height * 0.7 }
];

const calculateArea = () => {
  const area = calculatePolygonArea(dots);
  document.getElementById('areaDisplay').textContent = `${area.toFixed(2)} ft2`;
};

const calculatePolygonArea = vertices => {
  let sum = 0;
  for (let i = 0; i < vertices.length; i++) {
    const x1 = vertices[i].x;
    const y1 = vertices[i].y;
    const x2 = vertices[(i + 1) % vertices.length].x;
    const y2 = vertices[(i + 1) % vertices.length].y;
    sum += (x1 * y2 - x2 * y1);
  }
  return Math.abs(sum) / 2;
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(dots[0].x, dots[0].y);
  dots.forEach(dot => {
    ctx.lineTo(dot.x, dot.y);
    ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // 10% opacity white
  ctx.fill();

  ctx.strokeStyle = 'white'; // White lines
  ctx.stroke();

  ctx.fillStyle = 'white'; // White dots
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  calculateArea();
};

let dragging = false;
let selectedDot = null;
let offset = { x: 0, y: 0 };

canvas.addEventListener('mousedown', e => {
  const { clientX, clientY } = e;
  selectedDot = dots.find(dot => {
    return Math.sqrt(Math.pow(dot.x - clientX, 2) + Math.pow(dot.y - clientY, 2)) < 10;
  });
  if (selectedDot) {
    offset = {
      x: clientX - selectedDot.x,
      y: clientY - selectedDot.y
    };
    dragging = true;
  }
});

canvas.addEventListener('mousemove', e => {
  if (dragging && selectedDot) {
    selectedDot.x = e.clientX - offset.x;
    selectedDot.y = e.clientY - offset.y;
    draw();
  }
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
  selectedDot = null;
});

draw();
