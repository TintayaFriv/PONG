// Obtener canvas y contexto
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Configuración de las paletas
const paddleWidth = 10, paddleHeight = 100;
const paddleSpeed = 15;

// Arreglo de pelotas y configuración inicial
let balls = [
    { x: canvas.width / 2, y: canvas.height / 2, speedX: 4, speedY: 2, size: 10 }
];

// Posición inicial de las paletas
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Variable de puntaje
let Score = 0;

// Variable para controlar el estado del juego (si está en curso o no)
let gameStarted = false;

// Función para dibujar
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // limpiar canvas

    context.fillStyle = '#fff'; // Dibujar la paleta izquierda
    context.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);

    // Dibujar la paleta derecha
    context.fillRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight);

    // Dibujar las pelotas
    balls.forEach(ball => {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    });

    // Dibujar puntaje
    context.font = '30px Arial';
    context.fillText(Score, canvas.width / 4, 50);
}

// Función para actualizar el estado del juego
function update() {
    balls.forEach(ball => {
        // Movimiento de la pelota
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Colisiones con el borde superior e inferior
        if (ball.y <= 0 || ball.y >= canvas.height) {
            ball.speedY = -ball.speedY;
        }

        // Colisión con las paletas
        if (ball.x <= 20 && ball.y >= leftPaddleY && ball.y <= leftPaddleY + paddleHeight) {
            Score++;
            ball.speedX = -ball.speedX;
        }
        if (ball.x >= canvas.width - 20 && ball.y >= rightPaddleY && ball.y <= rightPaddleY + paddleHeight) {
            Score++;
            ball.speedX = -ball.speedX;
        }

        // Si la pelota toca los bordes izquierdo o derecho
        if (ball.x <= 0 || ball.x >= canvas.width) {
            resetBall(ball);
        }
    });

    // Agregar nuevas pelotas al llegar a un múltiplo de 5
    if (Score > 0 && Score % 5 === 0 && balls.length === Score / 5) {
        addBall();
    }

    // Control de las paletas
    document.onkeydown = function (e) {
        switch (e.key) {
            case 'w':
                if (leftPaddleY > 0) leftPaddleY -= paddleSpeed;
                break;
            case 's':
                if (leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
                break;
            case 'ArrowUp':
                if (rightPaddleY > 0) rightPaddleY -= paddleSpeed;
                break;
            case 'ArrowDown':
                if (rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;
                break;
        }
    }
}

// Función para reiniciar una pelota específica
function resetBall(ball) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = 2;
}

// Función para agregar una nueva pelota
function addBall() {
    balls.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        speedX: 4 + Math.random() * 2,  // velocidad aleatoria en X
        speedY: 2 + Math.random() * 2,  // velocidad aleatoria en Y
        size: 10
    });
}

// Función principal del bucle del juego
function gameLoop() {
    if (gameStarted) {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar el juego cuando se presione el botón
document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('buttonContainer').style.display = 'none';

    if (!gameStarted) {
        gameStarted = true;
        gameLoop();
    }
});
