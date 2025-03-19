// ! Initialize button and canvas elements
const button = document.getElementById("explosion-button");
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

// ? Resize canvas to full viewport and attach event listener
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// * Particle class: Creates and manages each explosion particle
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = Math.random() * 4 + 3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    this.life = 2500;
    this.elapsed = 0;
    this.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`; 
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.rotation += this.rotationSpeed;
    this.elapsed += dt;
  }

  draw(ctx) {
    // ? Calculate transparency based on remaining life
    const alpha = Math.max(1 - this.elapsed / this.life, 0);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = alpha;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      let r = i % 2 === 0 ? this.radius : this.radius * 0.5;
      let angle = (i * Math.PI) / 4;
      let x = Math.cos(angle) * r;
      let y = Math.sin(angle) * r;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// ! Animation and particle management
let particles = [];
let lastTime = 0;

// ? Animation loop for particles
function animate(time) {
  const dt = time - lastTime;
  lastTime = time;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update(dt);
    p.draw(ctx);
  });

  particles = particles.filter(p => p.elapsed < p.life);
  if (particles.length > 0) {
    requestAnimationFrame(animate);
  }
}

// TODO: Create explosion particles at provided coordinates
function createParticles(x, y) {
  const count = Math.floor(Math.random() * 30) + 50;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
  lastTime = performance.now();
  requestAnimationFrame(animate);
}

// ? Button click event triggers explosion effect
button.addEventListener("click", function (e) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 200);
  createParticles(centerX, centerY);
});
