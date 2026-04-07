const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameOverEl = document.getElementById("game-over");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let selectedTime = 30;
let currentMole = null;
let gameInterval, timerInterval;
let running = false;

for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.addEventListener("click", () => {
        if (!running || hole !== currentMole) return;
        score++;
        scoreEl.textContent = score;
        hole.classList.remove("mole");
        hole.classList.add("whacked");
        setTimeout(() => hole.classList.remove("whacked"), 200);
        currentMole = null;
    });
    grid.appendChild(hole);
}

const holes = document.querySelectorAll(".hole");

document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (running) return;
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedTime = parseInt(btn.dataset.time);
        timeLeft = selectedTime;
        timeEl.textContent = timeLeft;
    });
});

function randomMole() {
    holes.forEach(h => h.classList.remove("mole"));
    const index = Math.floor(Math.random() * holes.length);
    currentMole = holes[index];
    currentMole.classList.add("mole");
}

function startGame() {
    if (running) return;
    running = true;
    score = 0;
    timeLeft = selectedTime;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    gameOverEl.textContent = "";
    startBtn.disabled = true;
    startBtn.textContent = "Playing...";

    gameInterval = setInterval(randomMole, 800);

    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    holes.forEach(h => h.classList.remove("mole"));
    currentMole = null;
    running = false;
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";
    gameOverEl.textContent = `Game over! Final score: ${score} 🎉`;
}