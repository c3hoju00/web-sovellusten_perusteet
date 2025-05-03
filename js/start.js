document.getElementById('startBtn').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    const difficulty = document.getElementById('difficulty').value;
  
    if (nickname !== "") {
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('difficulty', difficulty);
      localStorage.setItem('score', 0);
      window.location.href = 'quiz.html';
    } else {
      alert('Please enter a nickname!');
    }
  });