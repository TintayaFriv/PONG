//CREANDO VARIABLES###############################
const canvas    = document.getElementById('pong');
const context   = canvas.getContext('2d');

//-- CREAR LA PALETA ----------------------------
const paddleWidth = 10, paddleHeight = 100;
const paddleSpeed = 15;
const ballSize = 10;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 2;

//-- VARIABLES DE PUNTAJE -----------------------
let Score = 0;

//FUNCIONES######################################
function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);//limpiar canvas

    context.fillStyle = '#fff';     //dibujar la paleta izquierda
    context.fillRect(10,leftPaddleY,paddleWidth,paddleHeight);

    context.fillRect(canvas.width - 20, rightPaddleY,paddleWidth,paddleHeight);//dibuja la paleta derecha

    //dibujar la pelota
    context.beginPath();
    context.arc(ballX, ballY,ballSize,0,Math.PI * 2, false);
    context.fill();
    context.closePath();

    //dibujar puntaje
    context.font = '30px Arial';
    context.fillText(Score, canvas.width / 4, 50);
}
function update() {
    //movimiento de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //colisiones con el borde superior e inferior
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    //colision con las pelotas
   if (ballX <= 20 && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        Score++;
        ballSpeedX = -ballSpeedX;
   }
   if (ballX >= canvas.width - 20 && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        Score++;
        ballSpeedX = -ballSpeedX;
   }

   //si la pelota toca los bordes derechos izquierdo
   if (ballX<=0) {
        resetBall();
        Score = 0;
   }else if (ballX >=canvas.width) {
        resetBall();
        Score = 0;
   }

   //control de las paletas
   document.onkeydown = function (e) {
        switch (e.key) {
            case 'w':
                if (leftPaddleY > 0) leftPaddleY -= paddleSpeed;
                break;

            case 's':
                if (leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
                break;            
        }
        switch (e.key) {
            case 'ArrowUp':
                if (rightPaddleY > 0) rightPaddleY -= paddleSpeed;
                break;
            case 'ArrowDown':
                if (rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;
                break;
        }
   }
}
function resetBall() {
    ballX = canvas.width /2;
    ballY = canvas.height /2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 2;
}
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();