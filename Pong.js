var canvas;
var playerPaddle;
var computerPaddle;
var ball;
var ball_velocityX = 0;
var ball_velocityY = 0;
var gameState = "start";
var multiplayer = false;
var playerScore = 0;
var computerScore = 0;

function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  playerPaddle = new Paddle();

  playerPaddle.yPosition = windowHeight/2 - 50;

  computerPaddle = new Paddle();
  ball = new Ball();
  
  ball.xPosition = canvas.width/2;
  ball.yPosition = canvas.height/2;
}

function draw() 
{
  // Background
  background("darkGray");
  textSize(16);
  drawnet();
  drawScores();
  startOver();
  objectDisplay();
  serve();
  ballMovement();
  bounceBall();
  addScore();
}