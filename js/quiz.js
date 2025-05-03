let timer;
let timeLeft = 15;

function startTimer() {
  document.getElementById('timer').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
}

function handleTimeout(correct) {
  clearInterval(timer);

  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === decodeHTML(correct)) {
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
    }
  });

  endGame();
}

function fetchQuestion() {
  const difficulty = localStorage.getItem('difficulty') || 'easy';
  fetch(`https://opentdb.com/api.php?amount=1&category=12&difficulty=${difficulty}&type=multiple`)
    .then(response => response.json())
    .then(data => showQuestion(data.results[0]));
}

function showQuestion(questionData) {
  document.getElementById('next-btn').style.display = 'none';
  timeLeft = 15;
  startTimer();

  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');

  questionEl.innerHTML = decodeHTML(questionData.question);
  answersEl.innerHTML = '';

  const answers = [...questionData.incorrect_answers, questionData.correct_answer];
  shuffleArray(answers);

  answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = decodeHTML(answer);
    button.addEventListener('click', () => checkAnswer(answer, questionData.correct_answer));
    answersEl.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  clearInterval(timer);

  const buttons = document.querySelectorAll('#answers button');
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === decodeHTML(correct)) {
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
    } else if (button.textContent === selected) {
      button.style.backgroundColor = 'red';
      button.style.color = 'white';
    }
  });

  if (selected === correct) {
    let score = parseInt(localStorage.getItem('score')) || 0;
    localStorage.setItem('score', score + 1);
    document.getElementById('next-btn').style.display = 'block';
  } else {
    endGame();
  }

  function endGame() {
    const resultBtn = document.getElementById('resultBtn');
    resultBtn.style.display = 'block';
    resultBtn.onclick = () => {
      window.location.href = 'result.html';
    };
  }
  
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

fetchQuestion();