const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let speed = 5;
const grid = 30;
const scale = canvas.width / grid;
const rows = canvas.height / scale;
const columns = canvas.width / scale;


// ====================== Snake ======================= //
function Snake() {
    this.x = scale * 15;
    this.y = scale * 15;
    this.xSpeed = 0;
    this.ySpeed = scale * -1;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = 'rgb(204, 213, 230)';
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    this.loop = function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed
    }
}






// ====================== Grow Pellets ======================= //

function Pellet() {
    this.x;
    this.y;
    
    this.emptyCell = function() {
        this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    
    }
    
    this.render = function() {
        ctx.fillStyle = 'rgb(250, 244, 158)';
        ctx.fillRect(this.x, this.y, scale, scale)
    }
    }







// ====================== Movement ======================= //

function movementHandler(e){
    if(e.which == 83 || e.which == 40){
        snake.xSpeed = 0;
        snake.ySpeed = scale * 1;
    } else if (e.which == 87 || e.which == 38){
        snake.xSpeed = 0;
        snake.ySpeed = -scale * 1;
    }else if (e.which == 65 || e.which == 37){
        snake.xSpeed = -scale * 1;
        snake.ySpeed = 0;
    }else if (e.which == 68 || e.which == 39){
        snake.xSpeed = scale * 1;
        snake.ySpeed = 0;
    } else if (e.which == 16){
        snake.xSpeed = 0;
        snake.ySpeed = 0;
    } else if (e.which == 27){
        snake.x = scale * 15;
        snake.y = scale * 15;
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

    }, 1000 / speed);
};





// ====================== Obstacles ======================= //






// ====================== Game Over ======================= //

function deadSnake() {
        snake.clearRect();
        startScreen.style.zIndex = '3';

}



// ====================== Start Button ======================= //


let startButton = document.querySelector('#startButton')
let startScreen = document.querySelector('#startScreen')

startButton.addEventListener('click', function() {
    startScreen.style.zIndex = '0';
    drawGame();
    window.addEventListener('keydown', movementHandler, false);

});

