function drawScores(){
    // Draw Scores
    text(playerScore, canvas.width - canvas.width/10, canvas.height/5);
    text(computerScore, canvas.width/10, canvas.height/5);
}

function drawnet(){
    for (var num = 5; num < canvas.height; num=num+20) {
      line(canvas.width/2, num, canvas.width/2, num+10);
    }
}
  
function objectDisplay(){
    strokeWeight(1);

    // P1
    playerPaddle.xPosition = canvas.width - playerPaddle.widht;
    playerMovement();
    playerPaddle.display();

    // P2
    computerPaddle.xPosition = 0;
    computerMovement();
    computerPaddle.display();

    // Ball
    ball.display();
}

function serve(){
    if(keyIsDown(32) && gameState === "start" && loading == false){
        ball_velocityX = random(canvas.width/240,canvas.width/200);
        ball_velocityY = random(canvas.height/240,canvas.height/200);
        shootSound.play();
        gameState = "play";
    }
}
  
function reset(){
    ball_velocityX = 0;
    ball_velocityY = 0;
    ball.xPosition = canvas.width/2;
    ball.yPosition = canvas.height/2;
}
  
function bounceBall(){
    // Bounce with Paddles
    if(ball.xPosition > canvas.width -15 && ball.yPosition > playerPaddle.yPosition && ball.yPosition < playerPaddle.yPosition + playerPaddle.height && ball.xPosition < canvas.width){
      ball_velocityX = ball_velocityX * -1.03;
      hitSound.play();
    }
    else if(ball.xPosition < 15 && ball.yPosition > computerPaddle.yPosition && ball.yPosition < computerPaddle.yPosition + computerPaddle.height && ball.xPosition > 0){
      ball_velocityX = ball_velocityX * -1.03;
      hitSound.play();
    }
    
    // Bounce with Edges
    if(ball.yPosition > canvas.height - ball.radius/2 || ball.yPosition < ball.radius/2){
      ball_velocityY = ball_velocityY * -1.03;
      hitSound.play();
    }
}

function ballMovement(){
    ball.xPosition += ball_velocityX;
    ball.yPosition += ball_velocityY;
}

function playerMovement(){
    if(keyIsDown(DOWN_ARROW) && playerPaddle.yPosition < canvas.height - playerPaddle.height && loading == false)
    {
      playerPaddle.yPosition += canvas.height/80;
    }
    
    if(keyIsDown(UP_ARROW) && playerPaddle.yPosition > 0 && loading == false)
    {
        playerPaddle.yPosition -= canvas.height/80;
    }
}
  
function computerMovement(){
    if(multiplayer === false){
      if(ball.yPosition > computerPaddle.height/2 && ball.yPosition < canvas.height - computerPaddle.height/2){
        computerPaddle.yPosition = ball.yPosition - computerPaddle.height/2;
      }
    }
    else{
      if(keyIsDown(83) && computerPaddle.yPosition < canvas.height - computerPaddle.height)
      {
          computerPaddle.yPosition += canvas.height/80;
      }
    
      if(keyIsDown(87) && computerPaddle.yPosition > 0)
      {
        computerPaddle.yPosition -= canvas.height/80;
      }
    }
}

function startOver(){
    if(gameState === "start"){
        text("Press Space to Serve", canvas.width/2-canvas.width/14, windowHeight/4*2.7);
        if(multiplayer === false){
        text("Press Q for multiplayer", canvas.width/2-canvas.width/13, windowHeight/4*3);
        
        if(keyIsDown(81) && loading == false){
            computerScore = 0;
            playerScore = 0;
            multiplayer = true;
            selectSound.play();
        }
        }
        else{
        text("Press E for single player", canvas.width/2-canvas.width/13, windowHeight/4*3);
        
        if(keyIsDown(69) && loading == false){
            computerScore = 0;
            playerScore = 0;
            multiplayer = false;
            selectSound.play();
        }
        }
        text("WARNING: Score will be Reset", canvas.width/2-canvas.width/9, windowHeight/4*3.5);
    }
    else if (gameState === "end"){
        text("Game Over! press R to restart", canvas.width/2-canvas.width/9, windowHeight/4*2.7);
        
        if(keyIsDown(82) && loading == false){
        playerScore = 0;
        computerScore = 0;
        selectSound.play();
        gameState = "start";
        }
    }
    else if (gameState === "p1Wins"){
        text("Player 1 Wins! press R to restart", canvas.width/2-120, windowHeight/4*2.7);
        
        if(keyIsDown(82) && loading == false){
        playerScore = 0;
        computerScore = 0;
        selectSound.play();
        gameState = "start";
        }
    }
    else if (gameState === "p2Wins"){
        text("Player 2 Wins! press R to restart", canvas.width/2-120, windowHeight/4*2.7);
        
        if(keyIsDown(82) && loading == false){
        playerScore = 0;
        computerScore = 0;
        selectSound.play();
        gameState = "start";
        }
    }
}

function addScore(){
    if(ball.xPosition > canvas.width){
        computerScore += 1;
        gameState = "start";
        scoreSound.play();
        reset();
    }
    else if (ball.xPosition < 0){
        playerScore += 1;
        gameState = "start";
        scoreSound.play();
        reset();
    }

    if(playerScore === 5 && multiplayer == false && gameState == "start" || computerScore === 5 && multiplayer == false && gameState == "start"){
        gameState = "end";
        scoreSound.play();
    }
    else if (playerScore === 5 && multiplayer == true || computerScore === 5 && multiplayer == true){
        if(playerScore > computerScore){
            scoreSound.play();
            gameState = "p1Wins";
        }
        else if (playerScore < computerScore){
            scoreSound.play();
            gameState = "p2Wins";
        }
    }
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Mexico_City");
    var responseJSON = await response.json();
    
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);

    if(hour >= 06 && hour<=14){
        bg = "cyan";
    }
    else if(hour >= 14 && hour<=18){
        bg = "orange";
        fill("black")
    }
    else{
        bg = "darkBlue";
        fill("white")
    }

    backgroundColor = bg;
}