class Paddle
{
  constructor()
  {
    this.xPosition=390;
    this.yPosition=160;
    this.widht=10;
    this.height=100;
  }
  
  display()
  {
    rect(this.xPosition, this.yPosition, this.widht, this.height);
    tint(255,127);
  }
}