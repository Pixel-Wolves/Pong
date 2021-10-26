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
var hitSound;
var scoreSound;
var selectSound;
var shootSound;

function preload(){
  hitSound = loadSound("Hit.wav");
  scoreSound = loadSound("Score.wav");
  selectSound = loadSound("Select.wav");
  shootSound = loadSound("Shoot.wav");
}

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
  background("lightBlue");
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