// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 400;
canvas.height = 500;

// Player properties
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 7
};

// Falling blocks properties
const blocks = [];
const blockSpeed = 3;
const blockSize = 50;

// Game state
let gameOver = false;

// Listen for keyboard input
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

// Function to create falling blocks
function createBlock() {
    const x = Math.random() * (canvas.width - blockSize);
    const color = Math.random() < 0.5 ? "#FFD700" : "#C0C
