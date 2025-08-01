
const canvas = document.getElementById("loto");
const ctx = canvas.getContext("2d");

ctx.translate(canvas.width / 2, canvas.height / 2);

function petalo(r1, r2, ang, color) {
  ctx.save();
  ctx.rotate((ang * Math.PI) / 180);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(r1 / 2, -r1, r2 / 2, -r2, 0, -r2);
  ctx.bezierCurveTo(-r2 / 2, -r2, -r1 / 2, -r1, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function capaPetalos(angulos, r1, r2, color) {
  angulos.forEach(a => petalo(r1, r2, a, color));
}

// Capa 1
capaPetalos([65, 168, 250, 327], 80, 180, "#fd2157");

// Capa 2
capaPetalos([12, 119, 216, 293], 70, 160, "#ff80b6");

// Capa 3
capaPetalos([350, 78, 137, 193, 264, 41, 112, 168, 236, 307], 60, 140, "#ff80b6");

// Capa 4
capaPetalos([3, 59, 125, 176, 247, 312, 24, 93, 152, 214, 276, 340], 50, 120, "#ffb347");

// Capa 5
capaPetalos([17, 53, 79, 102, 129, 168, 199, 234, 258, 296, 310, 345], 40, 100, "#e5e619");

// Espiral tipo semilla
const phi = 137.508 * Math.PI / 180;
ctx.fillStyle = "#ffc414";
for (let i = 0; i < 200; i++) {
  const r = 4 * Math.sqrt(i);
  const x = r * Math.cos(i * phi);
  const y = r * Math.sin(i * phi);
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fill();
}
