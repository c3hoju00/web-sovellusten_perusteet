let timer;
let timeLeft = 5;
let score = 0;
let randomNumbers = [];

function startGame() {
    document.getElementById("numberInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").style.display = "none";

    timeLeft = 5;
    document.getElementById('timer').textContent = timeLeft;
    randomNumbers = generateSequence();
    
    const display = document.getElementById("randomNumbers");
    display.textContent = "Memorize: " + randomNumbers.join(" ");
    display.style.display = "block";

    document.getElementById("numberInput").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            
            display.style.display = "none";
            document.getElementById("numberInput").style.display = "inline";
            document.getElementById("submitBtn").style.display = "inline";
            return;
        }
    }, 1000);
}

function generateSequence() {
    return Array.from({ length: score + 1 }, () =>
        Math.floor(Math.random() * 9) + 1
    );
}

function submitInput() {
    const input = document.getElementById("numberInput").value;
    const userArray = input.split("").map(Number);
    
    if (arraysEqual(userArray, randomNumbers)) {
        document.getElementById("feedback").textContent = "Correct!";
        score++;
        document.getElementById("next-btn").style.display = "inline";
    } else {
        document.getElementById("feedback").textContent = "Wrong! Game over.";
        document.getElementById("score").textContent = "Your score is: " + score;
    }

    document.getElementById("numberInput").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
}

window.addEventListener("DOMContentLoaded", () => {
    score = parseInt(localStorage.getItem("score")) || 0;
    startGame();
});