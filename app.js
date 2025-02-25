const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Body {
    constructor(x, y, mass, color) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.mass * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    attract(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (this.mass * other.mass) / (distance * distance);

        const angle = Math.atan2(dy, dx);
        const fx = Math.cos(angle) * force;
        const fy = Math.sin(angle) * force;

        return { fx, fy };
    }

    update(forces) {
        this.vx += forces.fx / this.mass;
        this.vy += forces.fy / this.mass;
        this.x += this.vx;
        this.y += this.vy;
    }
}

const earth = new Body(canvas.width / 2, canvas.height / 2, 100, 'blue');
const blackHole = new Body(canvas.width / 4, canvas.height / 4, 1000, 'red');

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const forceOnEarth = blackHole.attract(earth);
    const forceOnBlackHole = earth.attract(blackHole);

    earth.update(forceOnEarth);
    blackHole.update(forceOnBlackHole);

    earth.draw();
    blackHole.draw();

    requestAnimationFrame(animate);
}

animate();
