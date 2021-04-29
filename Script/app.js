const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
const grid = 40;
const cell = canvas.width / grid;
const rows = canvas.height / cell;
const columns = canvas.width / cell;
let speed = 12;
let startButton = document.querySelector('#startButton');
let startScreen = document.querySelector('#startScreen');
let resetButton = document.querySelector('#resetButton');
let resetScreen = document.querySelector('#resetScreen');
let startDate = new Date();
let endDate = new Date();


// ====================== Snake ======================= //
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


// ====================== Grow Pellets ======================= //

function Pellet() {
    this.x;
    this.y;

    this.emptyCell = function() {
        this.x = (Math.floor(Math.random() * columns - 1) + 1) * cell;
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * cell;
    
    }
    
    this.render = function() {
        ctx.fillStyle = 'rgb(250, 244, 158)';
        ctx.fillRect(this.x, this.y, cell , cell);
    }
    this.respawn = function() {
        if (this.x > canvas.width - 20) {
            this.x = (Math.floor(Math.random() * columns - 1) + 1) * cell;
        } else if (this.x < 0) {
            this.x = (Math.floor(Math.random() * columns - 1) + 1) * cell;
        } else if (this.y > canvas.height - 20) {
            this.y = (Math.floor(Math.random() * rows - 1) + 1) * cell;
        } else if (this.y < 0) {
            this.y = (Math.floor(Math.random() * rows - 1) + 1) * cell;
        }
    }
    }


// ====================== Obstacles ======================= //


// function Obstacles() {

//     this.render = function() {
//         ctx.fillStyle = 'rgb(233, 143, 143)';
//         ctx.fillRect(150, 300, cell , 150);
//         ctx.fillRect(150, 300, 150 , cell);
//         ctx.fillRect(800, 500, cell , 150);
//         ctx.fillRect(800, 500, 250 , cell);
//         ctx.fillRect(1050, 500, cell , 150);
//     }
//     }



// ====================== Movement ======================= //



function movementHandler(e){
    if(e.which == 87 || e.which == 38){
        if(snake.ySpeed == cell && snake.eaten > 1)
        return;
        snake.xSpeed = 0;
        snake.ySpeed = -cell;
    } else if (e.which == 83 || e.which == 40){
        if(snake.ySpeed == -cell && snake.eaten > 1)
        return;
        snake.xSpeed = 0;
        snake.ySpeed = cell;
    }else if (e.which == 65 || e.which == 37){
        if(snake.xSpeed == cell && snake.eaten > 1)
        return;
        snake.xSpeed = -cell;
        snake.ySpeed = 0;
    }else if (e.which == 68 || e.which == 39){
        if(snake.xSpeed == -cell && snake.eaten > 1)
        return;
        snake.xSpeed = cell;
        snake.ySpeed = 0;
    } else if (e.which == 27){
        snake.alive = false
    } 
}


// ====================== Draw Game ======================= //


function drawGame() {
    startTime = new Date();
    snake = new Snake();
    pellet = new Pellet();
    // obs = new Obstacles();
    pellet.emptyCell();
let interval = setInterval(function(event) {
    if (snake.alive == false) {
        endTime = new Date();
        resetButton.disabled = false;
        clearInterval(interval);
        deadSnake();
        return;
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pellet.render();
        pellet.respawn();
        snake.border();
        snake.grow();
        snake.render();
        snake.move();
        snake.dead();
        // obs.render();
    }
    }, 1000 / speed);
};



// ====================== Speed ======================= //











// ====================== Game Over ======================= //

function deadSnake() {
    let milli = endTime - startTime;
    let minutes = Math.floor(milli / 60000);
    let seconds = ((milli % 60000) / 1000).toFixed(0);
    document.getElementById('pelletsH2').innerHTML = 'Score: ' + (snake.eaten - 1);
    document.getElementById('timeH2').innerHTML = 'Time: ' + (minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
    resetScreen.style.zIndex = '3';
}



// ====================== Start Button ======================= //


startButton.addEventListener('click', function() {
    startButton.disabled = true;
    resetButton.disabled = true;
    startScreen.style.zIndex = '0';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);
    canvas.style.border = '10px solid rgb(233, 143, 143)';
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

});


// ====================== Reset Button ======================= //


resetButton.addEventListener('click', function() {
    resetButton.disabled = true;
    resetScreen.style.zIndex = '1';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);

});


// ====================== Testing ======================= //
