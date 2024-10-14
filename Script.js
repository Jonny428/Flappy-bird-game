// Código do jogo Flappy Bird  
const canvas = document.getElementById('game');  
const ctx = canvas.getContext('2d');  
  
// Definir as variáveis do jogo  
let bird = {  
  x: 100,  
  y: 200,  
  vx: 0,  
  vy: 0,  
  width: 30,  
  height: 30  
};  
  
let pipes = [];  
let score = 0;  
  
// Função para desenhar o jogo  
function draw() {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  ctx.fillStyle = '#fff';  
  ctx.fillRect(0, 0, canvas.width, canvas.height);  
  
  // Desenhar o pássaro  
  ctx.fillStyle = '#ff0';  
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);  
  
  // Desenhar os canos  
  for (let i = 0; i < pipes.length; i++) {  
   ctx.fillStyle = '#0f0';  
   ctx.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);  
  }  
  
  // Desenhar o placar  
  ctx.font = '24px Arial';  
  ctx.fillStyle = '#000';  
  ctx.textAlign = 'left';  
  ctx.textBaseline = 'top';  
  ctx.fillText(`Score: ${score}`, 10, 10);  
}  
  
// Função para atualizar o jogo  
function update() {  
  // Atualizar o pássaro  
  bird.x += bird.vx;  
  bird.y += bird.vy;  
  
  // Verificar colisão com os canos  
  for (let i = 0; i < pipes.length; i++) {  
   if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipes[i].width && bird.y + bird.height > pipes[i].y && bird.y < pipes[i].y + pipes[i].height) {  
    // Game over  
    alert('Game over!');  
    return;  
   }  
  }  
  
  // Atualizar os canos  
  for (let i = 0; i < pipes.length; i++) {  
   pipes[i].x -= 2;  
   if (pipes[i].x < -pipes[i].width) {  
    pipes.splice(i, 1);  
   }  
  }  
  
  // Adicionar novos canos  
  if (Math.random() < 0.05) {  
   pipes.push({  
    x: canvas.width,  
    y: Math.random() * (canvas.height - 100),  
    width: 80,  
    height: 100  
   });  
  }  
  
  // Atualizar o placar  
  score++;  
}  
  
// Função para lidar com eventos do teclado  
function handleKeyDown(event) {  
  if (event.key === ' ') {  
   bird.vy = -10;  
  }  
}  
  
// Iniciar o jogo  
setInterval(() => {  
  update();  
  draw();  
}, 1000 / 60);  
  
document.addEventListener('keydown', handleKeyDown);
