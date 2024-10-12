const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do jogo
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.5, lift: -10, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
const pipeWidth = 50;
const pipeGap = 100;
const pipeSpeed = 2;

// Função para desenhar o pássaro
function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Função para desenhar os canos
function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });
}

// Função para atualizar a lógica do jogo
function update() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height >= canvas.height || bird.y < 0) {
        resetGame();
    }

    // Adicionar novos canos
    if (frame % 90 === 0) {
        let top = Math.random() * (canvas.height - pipeGap - 20) + 20;
        let bottom = canvas.height - top - pipeGap;
        pipes.push({ x: canvas.width, top, bottom });
    }

    // Atualizar canos
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });

    // Remover canos fora da tela
    if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift();
        score++;
    }

    // Verificar colisões
    pipes.forEach(pipe => {
        if (bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
            resetGame();
        }
    });
}

// Função para reiniciar o jogo
function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
}

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Função principal do jogo
function gameLoop() {
    update();
    draw();
    frame++;
    requestAnimationFrame(gameLoop);
}

// Controle do pássaro
window.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

// Iniciar o jogo
gameLoop();
