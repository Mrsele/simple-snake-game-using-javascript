document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const gameOverMessage = document.getElementById('gameOverMessage');
  
    const gridSize = 20;
    const gridSizeX = canvas.width / gridSize;
    const gridSizeY = canvas.height / gridSize;
  
    let snake = [
      { x: 5, y: 5 }, // Head
      { x: 4, y: 5 }, // Tail
    ];
  
    let food = generateFood();
  
    let direction = 'right';
    let isPaused = true;
    let score = 0;
  
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw the snake
      ctx.fillStyle = 'green';
      snake.forEach((segment, index) => {
        // Head
        if (index === 0) {
          ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
        // Tail
        else {
          ctx.fillStyle = 'lightgreen';
          ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
      });
  
      // Draw the food
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  
      // Display score
      scoreDisplay.textContent = `Score: ${score}`;
    }
  
    function update() {
      if (isPaused) {
        return;
      }
  
      const head = { ...snake[0] };
      switch (direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }
  
      if (head.x < 0 || head.x >= gridSizeX || head.y < 0 || head.y >= gridSizeY || collisionWithItself(head)) {
        gameOver();
        return;
      }
  
      if (head.x === food.x && head.y === food.y) {
        snake.unshift({ ...food });
        food = generateFood();
        score++;
      } else {
        snake.unshift(head);
        snake.pop();
      }
    }
  
    function collisionWithItself(head) {
      return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }
  
    function generateFood() {
      const foodX = Math.floor(Math.random() * gridSizeX);
      const foodY = Math.floor(Math.random() * gridSizeY);
      return { x: foodX, y: foodY };
    }
  
    function startGame() {
      isPaused = false;
      startButton.textContent = 'Pause';
      restartButton.classList.add('hidden');
      gameOverMessage.textContent = '';
      scoreDisplay.style.color = 'black';
    }
  
    function pauseGame() {
      isPaused = true;
      startButton.textContent = 'Resume';
      restartButton.classList.remove('hidden');
    }
  
    function gameOver() {
      isPaused = true;
      startButton.textContent = 'Start';
      restartButton.classList.remove('hidden');
      scoreDisplay.textContent = '';
      gameOverMessage.textContent = `Game Over! Your final score is: ${score}`;
      scoreDisplay.style.color = 'red';
    }
  
    function restartGame() {
      snake = [
        { x: 4, y: 4 }, // Head
        { x: 4, y: 5 }, // Tail
      ];
      food = generateFood();
      direction = 'right';
      score = 0;
      startGame();
    }
  
    function togglePause() {
      isPaused ? startGame() : pauseGame();
    }
  
    function gameLoop() {
      update();
      draw();
    }
  
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (!isPaused && direction !== 'down') {
            direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (!isPaused && direction !== 'up') {
            direction = 'down';
          }
          break;
        case 'ArrowLeft':
          if (!isPaused && direction !== 'right') {
            direction = 'left';
          }
          break;
        case 'ArrowRight':
          if (!isPaused && direction !== 'left') {
            direction = 'right';
          }
          break;
        case ' ':
          togglePause();
          break;
      }
    });
  
    startButton.addEventListener('click', togglePause);
    restartButton.addEventListener('click', restartGame);
  
    setInterval(gameLoop, 100);
  });
  



























// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');
  
//     const gridSize = 20;
//     const gridSizeX = canvas.width / gridSize;
//     const gridSizeY = canvas.height / gridSize;
  
//     let snake = [
//       { x: 5, y: 5 }, // Head
//       { x: 4, y: 5 }, // Tail
//     ];
  
//     let food = generateFood();
  
//     let direction = 'right';
//     let isPaused = false;
//     let score = 0;
  
//     function draw() {
//       // Clear the canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//       // Draw the snake
//       ctx.fillStyle = 'green';
//       snake.forEach((segment, index) => {
//         // Head
//         if (index === 0) {
//           ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
//         }
//         // Tail
//         else {
//           ctx.fillStyle = 'lightgreen';
//           ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
//         }
//       });
  
//       // Draw the food
//       ctx.fillStyle = 'red';
//       ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  
//       // Display score
//       ctx.fillStyle = 'black';
//       ctx.font = '20px Arial';
//       ctx.fillText(`Score: ${score}`, 10, 20);
//     }
  
//     function update() {
//       if (isPaused) {
//         return;
//       }
  
//       const head = { ...snake[0] };
//       switch (direction) {
//         case 'up':
//           head.y--;
//           break;
//         case 'down':
//           head.y++;
//           break;
//         case 'left':
//           head.x--;
//           break;
//         case 'right':
//           head.x++;
//           break;
//       }
  
//       if (head.x < 0 || head.x >= gridSizeX || head.y < 0 || head.y >= gridSizeY || collisionWithItself(head)) {
//         resetGame();
//         return;
//       }
  
//       if (head.x === food.x && head.y === food.y) {
//         snake.unshift({ ...food });
//         food = generateFood();
//         score++;
//       } else {
//         snake.unshift(head);
//         snake.pop();
//       }
//     }
  
//     function collisionWithItself(head) {
//       return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
//     }
  
//     function generateFood() {
//       const foodX = Math.floor(Math.random() * gridSizeX);
//       const foodY = Math.floor(Math.random() * gridSizeY);
//       return { x: foodX, y: foodY };
//     }
  
//     function resetGame() {
//       alert(`Game Over! Your final score is: ${score}`);
//       snake = [
//         { x: 5, y: 5 }, // Head
//         { x: 4, y: 5 }, // Tail
//       ];
//       food = generateFood();
//       direction = 'right';
//       score = 0;
//     }
  
//     function togglePause() {
//       isPaused = !isPaused;
//     }
  
//     function gameLoop() {
//       update();
//       draw();
//     }
  
//     document.addEventListener('keydown', (event) => {
//       switch (event.key) {
//         case 'ArrowUp':
//           if (direction !== 'down') {
//             direction = 'up';
//           }
//           break;
//         case 'ArrowDown':
//           if (direction !== 'up') {
//             direction = 'down';
//           }
//           break;
//         case 'ArrowLeft':
//           if (direction !== 'right') {
//             direction = 'left';
//           }
//           break;
//         case 'ArrowRight':
//           if (direction !== 'left') {
//             direction = 'right';
//           }
//           break;
//         case ' ':
//           togglePause();
//           break;
//       }
//     });
  
//     setInterval(gameLoop, 100);
//   });
  