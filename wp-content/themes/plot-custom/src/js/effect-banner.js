const canvas = document.getElementById('blurryGuys');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#c5a9fd', '#eea5a5', '#a5b0ee', '#40E0D0', '#9370DB']; // Array of colors
const circles = [];

// Function to create a circle object
function createCircle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 160 + 20, // Random radius between 20 and 70
        vx: (Math.random() * 2 - 1) * 2, // Horizontal velocity
        vy:(Math.random() * 2 - 1) * 2, // Vertical velocity
        color: colors[Math.floor(Math.random() * colors.length)]
    };
}

// Initialize circles
for (let i = 0; i < 8; i++) {
    circles.push(createCircle());
}

function drawCircle(circle) {
    ctx.globalAlpha = 0.8; // Adjust for desired transparency
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'blur(100px)'; // Apply blur effect

    circles.forEach(circle => {
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Reverse direction if the circle hits the canvas boundary
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.vx *= -1;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.vy *= -1;
        }

        drawCircle(circle);
    });

    requestAnimationFrame(update);
}

update();
