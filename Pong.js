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
  
  drawnet();
  
  // Draw Scores
  textSize(16);
  text(playerScore, canvas.width - 100, 100);
  text(computerScore, 100, 100);
  
  // Start, Multiplayer & Game Over
  if(gameState === "start"){
    text("Press Space to Serve", canvas.width/2-73, windowHeight/4*2.7);
    if(multiplayer === false){
      text("Press Q for multiplayer", canvas.width/2-75, windowHeight/4*3);
      
      if(keyIsDown(81)){
        computerScore = 0;
        playerScore = 0;
        multiplayer = true;
      }
    }
    else{
      text("Press E for single player", canvas.width/2-75, windowHeight/4*3);
      
      if(keyIsDown(69)){
        computerScore = 0;
        playerScore = 0;
        multiplayer = false;
      }
    }
    text("WARNING: Score will be Reset", canvas.width/2-100, windowHeight/4*3.5);
  }
  else if (gameState === "end"){
    text("Game Over! press R to restart", canvas.width/2-100, windowHeight/4*2.7);
    
    if(keyIsDown(82)){
      playerScore = 0;
      computerScore = 0;
      gameState = "start";
    }
  }
  else if (gameState === "p1Wins"){
    text("Player 1 Wins! press R to restart", canvas.width/2-120, windowHeight/4*2.7);
    
    if(keyIsDown(82)){
      playerScore = 0;
      computerScore = 0;
      gameState = "start";
    }
  }
  else if (gameState === "p2Wins"){
    text("Player 2 Wins! press R to restart", canvas.width/2-120, windowHeight/4*2.7);
    
    if(keyIsDown(82)){
      playerScore = 0;
      computerScore = 0;
      gameState = "start";
    }
  }
  
  // P1
  playerPaddle.xPosition = canvas.width - 10;
  playerMovement();
  playerPaddle.display();
  
  // P2
  computerPaddle.xPosition = 0;
  computerMovement();
  computerPaddle.display();
  
  // Ball
  ball.display();
  
  if(keyIsDown(32) && gameState === "start"){
    serve();
  }
  
  ball.xPosition += ball_velocityX;
  ball.yPosition += ball_velocityY;
  
  bounceBall();
  
  // Add Score
  if(ball.xPosition > canvas.width){
    computerScore += 1;
    gameState = "start";
    reset();
  }
  else if (ball.xPosition < 0){
    playerScore += 1;
    gameState = "start";
    reset();
  }
  
  if(playerScore === 5 && multiplayer == false || computerScore === 5 && multiplayer == false){
    gameState = "end";
  }
  else if (playerScore === 5 && multiplayer == true || computerScore === 5 && multiplayer == true){
    if(playerScore > computerScore){
      gameState = "p1Wins";
    }
    else if (playerScore < computerScore){
      gameState = "p2Wins";
    }
  }
}

function drawnet(){
  for (var num = 5; num < canvas.height; num=num+20) {
    line(canvas.width/2, num, canvas.width/2, num+10);
  }
}

function serve(){
  ball_velocityX = random(2,5);
  ball_velocityY = random(2,5);
  gameState = "play";
}

function reset(){
  ball_velocityX = 0;
  ball_velocityY = 0;
  ball.xPosition = canvas.width/2;
  ball.yPosition = canvas.height/2;
}

function bounceBall(){
  // Bounce with Paddles
  if(ball.xPosition > canvas.width -15 && ball.yPosition > playerPaddle.yPosition && ball.yPosition < playerPaddle.yPosition + 100 && ball.xPosition < canvas.width){
    ball_velocityX = ball_velocityX * -1.03;
  }
  else if(ball.xPosition < 15 && ball.yPosition > computerPaddle.yPosition && ball.yPosition < computerPaddle.yPosition + 100 && ball.xPosition > 0){
    ball_velocityX = ball_velocityX * -1.03;
  }
  
  // Bounce with Edges
  if(ball.yPosition > canvas.height - 10 || ball.yPosition < 10){
    ball_velocityY = ball_velocityY * -1.03;
  }
}

function playerMovement(){
  if(keyIsDown(DOWN_ARROW) && playerPaddle.yPosition < canvas.height - 100)
  {
    playerPaddle.yPosition += 5;
  }
  
  if(keyIsDown(UP_ARROW) && playerPaddle.yPosition > 0)
  {
    playerPaddle.yPosition -= 5;
  }
}

function computerMovement(){
  if(multiplayer === false){
    if(ball.yPosition > 50 && ball.yPosition < canvas.height - 50){
      computerPaddle.yPosition = ball.yPosition - 50;
    }
  }
  else{
    if(keyIsDown(83) && computerPaddle.yPosition < canvas.height - 100)
    {
        computerPaddle.yPosition += 5;
    }
  
    if(keyIsDown(87) && computerPaddle.yPosition > 0)
    {
      computerPaddle.yPosition -= 5;
    }
  }
}