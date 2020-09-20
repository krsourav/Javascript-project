var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
var circleX = canvas.width/2 + Math.floor(Math.random() * 100);
var circleY = canvas.height - 60;
var dx = 2 ;
var dy = 2;
var radius = 15;
var paddleWidth = 150;
var paddleHeight = 20;
var paddleX = canvas.width/2 - 20;
var paddleY = canvas.height - 20; 
var rightPressed = false;
var leftPressed = false;
var bricks = [];
var brickColumnCount = 5;
var brickRowCount = 5;
var brickPadding = 20;
var brickOffsetLeft = 50;
var brickOffsetRight = 25;
var brickOffsetTop = 30;
var brickWidth = 150;
var brickHeight = 20;
var score = 0;

    for(var i=0; i < brickRowCount; i++){
        bricks[i] = [];
        for( var j=0; j < brickColumnCount  ; j++){
                bricks[i][j] = { x: 0, y: 0 , status: 1};
    } 
}

function drawBricks(){
    for( var i=0; i <  brickRowCount; i++)
    {
          for(var j=0; j < brickColumnCount;  j++)
          {
              if(bricks[i][j].status == 1){
            bricks[i][j].x = (i * (brickWidth +brickPadding ) + brickOffsetLeft);
            bricks[i][j].y = (j * ( brickHeight +brickPadding ) + brickOffsetTop);

            ctx.beginPath();
            ctx.rect(bricks[i][j].x,bricks[i][j].y,brickWidth,brickHeight);
            ctx.fillStyle = "hotpink";
            ctx.fill();
            ctx.closePath();
            }
        } 
    }
}

function drawScore(){

    ctx.font = "25px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Score:" + " " + score,10,20);
}

function checkCollision(){
    for (var i=0; i < brickRowCount; i++)
    {
        for(var j=0; j < brickColumnCount; j++)
        {
            var b = bricks[i][j];
            if(b.status == 1){
            if(( circleX > b.x)   && (circleX < b.x + brickWidth) && 
                (circleY > b.y) && (circleY < b.y + brickHeight)){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if ( score == ( brickColumnCount * brickRowCount)){

                        alert("Congratulations You Win. click ok to play again. ");
                        window.location.reload();
                        clearInterval(z);
                    }
                
            }
        }
        }
        
    }
    

}

function drawCircle(){
        
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
        ctx.fillStyle ="hotpink";
        ctx.fillStroke="blue";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

if(circleX - radius < 0 ||  circleX + radius > canvas.width)
            dx = -dx;
if(circleY - radius <= 0 || circleY + radius >=  paddleY && 
    (circleX < paddleX + 150 && circleX + radius > paddleX))
            dy= -dy;
circleX -= dx;
circleY -= dy;
}

function drawpaddle(){

    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.fillStyle = "hotpink";
    ctx.fillStroke="blue";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    
    if(rightPressed == true && paddleX + 5 < canvas.width - paddleWidth)
        paddleX += 5;
    if(leftPressed == true && paddleX > 5)
        paddleX -= 5;

}

document.addEventListener("keydown",(e) => {
    if(e.key == 'Right' || e.key == 'ArrowRight')
        rightPressed = true;
    if(e.key == 'Left' || e.key == 'ArrowLeft')
        leftPressed = true;
},false);

document.addEventListener("keyup",(e) => {
    if(e.key == 'Right' || e.key == 'ArrowRight')
        rightPressed = false;
    if(e.key == 'Left' || e.key == 'ArrowLeft')
        leftPressed = false;
},false);

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawCircle();
    drawpaddle();
    drawScore();
    checkCollision();
   
    if(circleY + radius  > canvas.height){

        alert("Game Over. Your Score is:" +" " + score + ".Click 'OK' to Play Again");
        window.location.reload();
        clearInterval(z);

    }


}

var z = setInterval(draw,5);



