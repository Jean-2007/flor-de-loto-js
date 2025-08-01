const canvas = document.getElementById("loto");
const ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);

let speed = 100;
document.getElementById("speed").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
  document.getElementById("speedVal").textContent = speed;
});

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
  return angulos.map(a => () => petalo(r1, r2, a, color));
}

function espiralSemillas(n = 200) {
  const phi = 137.508 * Math.PI / 180;
  const acciones = [];
  for (let i = 0; i < n; i++) {
    acciones.push(() => {
      const r = 4 * Math.sqrt(i);
      const x = r * Math.cos(i * phi);
      const y = r * Math.sin(i * phi);
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffc414";
      ctx.fill();
    });
  }
  return acciones;
}

function iniciarAnimacion() {
  ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  
  let acciones = [];

  acciones.push(...capaPetalos([65, 168, 250, 327], 80, 180, "#fd2157"));
  acciones.push(...capaPetalos([12, 119, 216, 293], 70, 160, "#ff80b6"));
  acciones.push(...capaPetalos([350, 78, 137, 193, 264, 41, 112, 168, 236, 307], 60, 140, "#ff80b6"));
  acciones.push(...capaPetalos([3, 59, 125, 176, 247, 312, 24, 93, 152, 214, 276, 340], 50, 120, "#ffb347"));
  acciones.push(...capaPetalos([17, 53, 79, 102, 129, 168, 199, 234, 258, 296, 310, 345], 40, 100, "#e5e619"));
  acciones.push(...espiralSemillas(200));

  let i = 0;
  function dibujarPaso() {
    if (i >= acciones.length) return;
    acciones[i++]();
    setTimeout(dibujarPaso, speed);
  }

  dibujarPaso();
}
