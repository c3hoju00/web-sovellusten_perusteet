window.onload = function() {
    const nickname = localStorage.getItem('nickname') || 'Unknown';
    const score = parseInt(localStorage.getItem('score')) || 0;
  
    document.getElementById('finalScore').textContent = `${nickname}, you scored ${score} points!`;
  
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ nickname, score });
  
    highscores.sort((a, b) => b.score - a.score);
    const top5 = highscores.slice(0, 5);
  
    localStorage.setItem('highscores', JSON.stringify(top5));
  
    const highScoresList = document.getElementById('highScores');
    highScoresList.innerHTML = '';
    top5.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.nickname}: ${entry.score}`;
      highScoresList.appendChild(li);
    });
  }
  