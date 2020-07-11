console.log("snakes");
var gameCanvas = document.getElementById("snake");
var context = gameCanvas.getContext("2d");
var tileSize=20;
var tileWidth=25;
var tileHeight=20;


var snake=[
    {x:9,y:5},
    {x:8,y:5},
    {x:7,y:5},
    {x:6,y:5},
]

var direction="right"; //up,down,left,right

var food={
    x:0,
    y:0,
};

function snakeFood(){
    food.y=Math.round(Math.random()*tileHeight);
    food.x=Math.round(Math.random() * tileWidth);
}
snakeFood();

var alertNeverShown = true;

function drawSnake(){
    for(var i=0; i<snake.length;i++){
        var piece=snake[i];

        var maxBlue=255;
        var minBlue=100;
        var blue=Math.floor((maxBlue-minBlue)/(snake.length-1)*i+minBlue);

        context.fillStyle="rgba(0,0,"+blue+",0.7)";
        context.fillRect(tileSize*piece.x,tileSize*piece.y,tileSize,tileSize);
    } 
}
drawSnake();

function drawFood(){
    context.fillStyle="rgb(200,80,100)";
    /* context.fillRect(tileSize*15,tileSize*9,tileSize,tileSize);*/
    context.fillRect(tileSize*food.x,tileSize*food.y,tileSize,tileSize); 
}

function getNextPiece() {
    if(direction==="right"){
        return {
            x:snake[0].x+1,
            y:snake[0].y,
        
        };
    } else if(direction==="down"){
        return {
            x:snake[0].x,
            y:snake[0].y+1,
        };
    } else if(direction==="up"){
        return {
            x:snake[0].x,
            y:snake[0].y-1,
        };
    } else if(direction==="left"){
        return {
            x:snake[0].x-1,
            y:snake[0].y,
        };
    }
}

function draw(){
    // Clean the screen
    context.clearRect(0,0,gameCanvas.width,gameCanvas.height);
   
    
    //add a new piece to the head of the snake
    snake.unshift(getNextPiece());


    //remove the last piece of snake
    if (snake[0].x===food.x && snake[0].y===food.y){
        snakeFood();
    }
    else {snake.pop();}
   
    drawFood();
    drawSnake();
    
    /* for(var i=1; i<snake.length;i++){
        if (snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            alert("LOSER");
        }
    }*/    
    
    
    if (outOfBounds()||jiaMa()) {
        if(alertNeverShown){
            alertNeverShown = false;
            alert("LOSER");
        }
    }
}

function outOfBounds() {
    return snake[0].x>=25 || snake[0].x<-1 || snake[0].y>=20 || snake[0].y<-1;
}

   

function jiaMa(){
    for(var i=1; i<snake.length;i++){
        if (snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            return true;
        }
    }
    return false
   
}


function handleKeyDown(event){
    if(event.key==="ArrowUp"){
        direction="up";
    } else if(event.key==="ArrowDown"){
        direction="down";
    } else if(event.key==="ArrowLeft"){
        direction="left";
    } else if(event.key==="ArrowRight"){
        direction="right";
    }

    draw();
  
}

document.addEventListener("keydown",handleKeyDown);
 
window.setInterval(draw,400);

