import logo from './logo.svg';
import './App.css';

function App() {
  return (
var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 10;
var paddle1Y = 250;
var paddle2Y = 250;
var PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;

//the following code block below are the controls using the keyboard
document.addEventListener('keydown', keyDownHandler, false);
    function keyDownHandler(event) {
        if (event.keyCode == 83) {
            upPressed = true;
        }
        else if (event.keyCode == 87) {
            downPressed = true;
        }
    }
    document.addEventListener('keyup', keyUpHandler, false);
    function keyUpHandler(event) {
        if (event.keyCode == 83) {
            upPressed = false;
        }
        else if (event.keyCode == 87) {
            downPressed = false;
        }
    }

    document.addEventListener('keypress', keySpaceHandler, false);
    function keySpaceHandler(event) {
        if (showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            spacePressed = false;
            showingWinScreen = false;
        }
    }


    window.onload = function() {
        canvas = document.getElementById('paddleGame');
        canvasContext = canvas.getContext('2d');
        canvasContext.font = "25px Arial";
        canvas.style.position = "absolute";
        

        setTimeout(function() {
            drawEverything();
        }, 3000);      

        var framesPerSecond = 30;
        setInterval(function() {
            moveEverything();
            drawEverything();
        }, 750 / framesPerSecond);

        
    }

    function ballReset() {
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {            
            showingWinScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballSpeedX = 10;
        ballSpeedY = 10;
        ballX = 50;
        ballY = 50;
    }

    function computerMovement() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

        if (paddle2YCenter < ballY - 30) {
            paddle2Y += 10;
        } else if (paddle2YCenter > ballY + 30) {
            paddle2Y -= 10;
        }
    }

    function moveEverything() {
        if (showingWinScreen) {
            ballReset();
            return;
        }

        computerMovement();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX < 0) {
            if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY
                    -(paddle1Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY;
            }
            else {
                player2Score++;
                ballReset();
            }
        }

        if (ballX > canvas.width) {
                if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
                    var deltaY = ballY
                        -(paddle2Y + PADDLE_HEIGHT / 2);
                    ballSpeedY = deltaY * 0.3;
                }
                else {
                    player1Score++;
                    ballReset();
                }
        }

        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
        if (upPressed) {
            paddle1Y += 15;
        }
        else if (downPressed) {
            paddle1Y -= 15;
        }
    }
        

    function drawEverything() {
        //the line below blanks the screen with blue
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        if (showingWinScreen) {
            canvasContext.fillStyle = 'white';
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText('Player 1 wins!', canvas.width - 480, canvas.height - 300); 
                return;
            } else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText('Player 2 wins!', canvas.width - 480, canvas.height - 300);
                return;
            }
        }

            //the line below is the left paddle
            colorRect(5, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
            //the line below is the right AI paddle
            colorRect(canvas.width - 15, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
            //the line below is the drawing of the ball
            colorCircle(ballX, ballY, 10, 'white');
            //the scores of each player
            canvasContext.fillText(player1Score, 100, 100);
            canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

function colorCircle(centerX, centerY, radius, drawColor) {
		canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

function colorRect(leftX, topY, width, height, drawColor) {
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX, topY, width, height);
    }
  );
}

export default App;
