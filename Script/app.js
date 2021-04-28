const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let speed = 15;


// ====================== Snake ======================= //
function Snake() {
    this.x = scale * 25;
    this.y = scale * 25;
    this.xSpeed = 0;
    this.ySpeed = -scale;
    this.eaten = 1;
    this.body = [];
    this.render = function() {
        for (let i=0; i<this.body.length; i++) {
            ctx.beginPath();
             ctx.arc (this.body[i].x, this.body[i].y, scale - 5, 0, Math.PI * 2, false);
             ctx.fillStyle = 'rgb(204, 213, 230)';
             ctx.lineWidth = 10;
             ctx.closePath();
             ctx.fill();
          }
        ctx.beginPath();
        ctx.arc (this.x, this.y, scale, Math.PI * 2, false);
        ctx.strokeStyle = 'rgb(59, 84, 131';
        ctx.fillStyle = 'rgb(204, 213, 230)';
        ctx.lineWidth = 10;
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    this.loop = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed
        for (let i=0; i<this.body.length - 1; i++) {
            this.body[i] = this.body[i+1];
          }
          this.body[this.eaten - 1] =
            { x: this.x, y: this.y};
    }
    this.border = function() {
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width
        } else if (this.y > canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvas.height
        }
    }
    this.grow = function() {
        if (this.x < pellet.x + 25 && this.x + 25 > pellet.x && this.y < pellet.y + 25 && this.y + 25 > pellet.y) {
            pellet.emptyCell();
            pellet.render();
            this.eaten++;
            speed += 1;
        }
    }

}






// ====================== Grow Pellets ======================= //

function Pellet() {
    this.x;
    this.y;

    this.emptyCell = function() {
        this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale
    
    }
    
    this.render = function() {
        ctx.beginPath();
        ctx.arc (this.x, this.y, scale, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgb(250, 244, 158)';
        ctx.closePath();
        ctx.fill();
    }
    }







// ====================== Movement ======================= //



function movementHandler(e){
    if(e.which == 87 || e.which == 38){
        if(snake.ySpeed == scale && snake.eaten > 1)
        return;
        snake.xSpeed = 0;
        snake.ySpeed = -scale;
    } else if (e.which == 83 || e.which == 40){
        if(snake.ySpeed == -scale && snake.eaten > 1)
        return;
        snake.xSpeed = 0;
        snake.ySpeed = scale;
    }else if (e.which == 65 || e.which == 37){
        if(snake.xSpeed == scale && snake.eaten > 1)
        return;
        snake.xSpeed = -scale;
        snake.ySpeed = 0;
    }else if (e.which == 68 || e.which == 39){
        if(snake.xSpeed == -scale && snake.eaten > 1)
        return;
        snake.xSpeed = scale;
        snake.ySpeed = 0;
    } else if (e.which == 16){
        snake.xSpeed = 0;
        snake.ySpeed = 0;
    } else if (e.which == 27){
        snake.x = scale * 25;
        snake.y = scale * 25;
        snake.ySpeed = scale * -1;
        snake.eaten = 0;
        pellet.emptyCell();
        pellet.render();
    } 
}


// ====================== Draw Game ======================= //


function drawGame() {
    snake = new Snake();
    pellet = new Pellet();
    pellet.emptyCell();
    window.setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pellet.render();
        snake.loop();
        snake.render();
        snake.border();
        snake.grow();
    }, 1000 / speed);
};





// ====================== Obstacles ======================= //






// ====================== Game Over ======================= //

// function deadSnake() {
//         startScreen.style.zIndex = '3';

// }



// ====================== Start Button ======================= //


let startButton = document.querySelector('#startButton')
let startScreen = document.querySelector('#startScreen')

startButton.addEventListener('click', function() {
    startScreen.style.zIndex = '0';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);

});

