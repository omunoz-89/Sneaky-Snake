const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
const scale = 30;
const rows = canvas.height / scale;
const columns = canvas.width / scale;


// ====================== Snake ======================= //
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
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


function drawSnake() {
    snake = new Snake();
    snake.render();
    window.setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.loop();
        snake.render();
    }, 120);
};



// ====================== Grow Pellets ======================= //









// ====================== Movement ======================= //

function movementHandler(e){
    //if key press matches "w,a,s,d" move char up, down, left right
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
    } else if (e.which == 27){
        snake.x = 100;
        snake.y = 200;
        ogre.alive = true;
    }
}








// ====================== Obstacles ======================= //






// ====================== Game Over ======================= //

function deadSnake() {
        snake.clearRect();
        startScreen.style.zIndex = '2';

}



// ====================== Start Button ======================= //


let startButton = document.querySelector('#startButton')
let startScreen = document.querySelector('#startScreen')

startButton.addEventListener('click', function() {
    startScreen.style.zIndex = '0';
    drawSnake();
    window.addEventListener('keydown', movementHandler, false);

});

