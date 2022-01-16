class Paddle
{
  constructor()
  {
    this.xPosition=390;
    this.yPosition=160;
    this.widht=canvas.width/120;
    this.height=canvas.height/4;
  }
  
  display()
  {
    rect(this.xPosition, this.yPosition, this.widht, this.height);
    tint(255,127);
  }
}