const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

// Player settings
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5
};

// Falling blocks settings
const blocks = [];
const blockSpeed = 3;
const blockSize = 50;

// Game state
let gameOver = false;

// Player movement
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

// Function to create new falling blocks
function createBlock() {
    const x = Math.random() * (canvas.width - blockSize);
    blocks.push({ x, y: 0, width: blockSize, height: blockSize });
}

// Game loop
function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and draw blocks
    ctx.fillStyle = "red";
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y += blockSpeed;
        ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);

        // Collision detection
        if (
            player.x < blocks[i].x + blocks[i].width &&
            player.x + player.width > blocks[i].x &&
            player.y < blocks[i].y + blocks[i].height &&
            player.y + player.height > blocks[i].y
        ) {
            gameOver = true;
            alert("Game Over! Refresh to play again.");
        }
    }

    // Remove off-screen blocks
    while (blocks.length > 0 && blocks[0].y > canvas.height) {
        blocks.shift();
    }

    requestAnimationFrame(updateGame);
}

// Spawn blocks every 1 second
setInterval(createBlock, 1000);

// Start game loop
updateGame();
