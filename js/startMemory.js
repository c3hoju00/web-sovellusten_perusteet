document.getElementById('startBtn').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
  
    if (nickname !== "") {
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('score', 0);
      window.location.href = 'memoryGame.html';
    } else {
      alert('Please enter a nickname!');
    }
  });