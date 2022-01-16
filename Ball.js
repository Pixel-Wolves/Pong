class Ball
{
  constructor()
  {
    this.xPosition=200;
    this.yPosition=200;
    this.radius=canvas.width/80;
  }
  
  display()
  {
    circle(this.xPosition, this.yPosition, this.radius);
  }
}