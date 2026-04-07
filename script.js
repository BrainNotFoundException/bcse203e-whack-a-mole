const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let time = 30;
let currentMole = null;
let gameInterval, timerInterval;

for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.addEventListener("click", () => {
        if (hole === currentMole) {
            score++;
            scoreEl.textContent = score;
            hole.classList.remove("mole");
            currentMole = null;
        }
    });
    grid.appendChild(hole);
}

const holes = document.querySelectorAll(".hole");

function randomMole() {
    holes.forEach(h => h.classList.remove("mole"));
    const index = Math.floor(Math.random() * holes.length);
    currentMole = holes[index];
    currentMole.classList.add("mole");
}

function startGame() {
    score = 0;
    time = 30;
    scoreEl.textContent = score;
    timeEl.textContent = time;

    gameInterval = setInterval(randomMole, 800);

    timerInterval = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            alert("Game Over! Score: " + score);
        }
    }, 1000);
}