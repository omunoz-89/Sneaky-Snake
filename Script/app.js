const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
const grid = 40;
const scale = canvas.width / grid;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let speed = 15;
let startButton = document.querySelector('#startButton');
let startScreen = document.querySelector('#startScreen');
let resetButton = document.querySelector('#resetButton');
let resetScreen = document.querySelector('#resetScreen');
let score = document.querySelector('#pelletH2');

// ====================== Snake ======================= //
function Snake() {
    this.x = scale * 25;
    this.y = scale * 25;
    this.xSpeed = 0;
    this.ySpeed = -scale;
    this.alive = true;
    this.eaten = 1;
    this.body = [];
    this.render = function() {
        for (let i=0; i<this.body.length; i++) {

             ctx.fillStyle = 'rgb(204, 213, 230)';
             ctx.fillRect(this.body[i].x, this.body[i].y, scale - 2, scale - 2);
          }
    }
    this.loop = function() {
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
        if (this.x < pellet.x + 25&& 
            this.x + 50 > pellet.x && 
            this.y < pellet.y + 25&& 
            this.y + 50> pellet.y) {
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
        ctx.arc (this.x, this.y, scale - 12, 0, Math.PI * 2, false);
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
    } else if (e.which == 27){
        snake.alive = false
    } 
}


// ====================== Draw Game ======================= //


function drawGame() {
    snake = new Snake();
    pellet = new Pellet();
    pellet.emptyCell();
let interval = setInterval(function(event) {
    if (snake.alive == false) {
        clearInterval(interval);
        deadSnake();
        return;
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pellet.render();
        snake.loop();
        snake.render();
        snake.border();
        snake.grow();
        snake.dead();
    }
    }, 1000 / speed);
};





// ====================== Speed ======================= //








// ====================== Obstacles ======================= //





// ====================== Game Over ======================= //

function deadSnake() {

    reset.style.zIndex = '3';
}



// ====================== Start Button ======================= //




startButton.addEventListener('click', function() {
    startScreen.style.zIndex = '0';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);

});


// ====================== Reset Button ======================= //


resetButton.addEventListener('click', function() {
    resetScreen.style.zIndex = '1';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);

});
