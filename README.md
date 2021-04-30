# Sneaky Snake
## About
As my Unit-1 project of General Assembly's SEI course I decided to make the classic snake game using canvas. 


# HOW TO PLAY
Use W,A,S,D or Up, Down, Left, Right arrow keys to move the snake
- Start off as a one cell snake, avoid walls and pick up grow pellets.
- As you pick up grow pellets the snake will grow and another grow pellet will randomly spawn.
- Try and collect as many grow pellets as possible while avoiding the walls and yourself.
- If the snake crashes againts the walls or itself the game is over.

## Start Up Screen:
<img src="./Images/Startup.png" alt="startup" width="800px">


# FUTURE CONSIDERATIONS
- Increase velocity the longer you're alive
- Increase velocity the longer the snake is
- Spawn random obstacles on the canvas


# Technologies
- HTML
- CSS
- Javascript

# Code Snippets

Snake factory function

```
function Snake() {
    this.x = cell * 20;
    this.y = cell * 20;
    this.xSpeed = 0;
    this.ySpeed = -cell;
    this.alive = true;
    this.eaten = 1;
    this.body = [];
    this.render = function() {
        for (let i=0; i<this.body.length; i++) {

             ctx.fillStyle = 'rgb(204, 213, 230)';
             ctx.fillRect(this.body[i].x, this.body[i].y, cell, cell);
          }
    }
    this.move = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        for (let i=0; i<this.body.length - 1; i++) {
            this.body[i] = this.body[i+1];
          }
          this.body[this.eaten - 1] =
            { x: this.x, y: this.y};
    }
    this.border = function() {
        if (this.x > canvas.width) {
            this.alive = false;
        } else if (this.x < 0) {
            this.alive = false;
        } else if (this.y > canvas.height) {
            this.alive = false;
        } else if (this.y < 0) {
            this.alive = false;
        }
    }
    this.grow = function() {
        if (this.x < pellet.x + 15&& 
            this.x + 15 > pellet.x && 
            this.y < pellet.y + 15&& 
            this.y + 15> pellet.y) {
            pellet.emptyCell();
            pellet.render();
            this.eaten++;
        }
    }
    this.dead = function() {
        for (let i=2; i<this.body.length; i++) {
        if (this.body[0].x === this.body[i].x &&
            this.body[0].y === this.body[i].y) {
            this.alive = false;
        }
    }
}

}

```

## Initial Wireframes:
<img src="./Images/WireFrame.png" alt="WireFrame" width="800px">

