console.log("snakes");
var gameCanvas = document.getElementById("snake");
var context = gameCanvas.getContext("2d");
var tileSize=20;


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


function draw(){
    console.log("interval");              

    // Clean the screen
    context.clearRect(0,0,gameCanvas.width,gameCanvas.height);

    // Draw snake 

    /*context.fillStyle="rgb(80,100,200)";
    for(var piece of snake){
        context.fillRect(tileSize*piece.x,tileSize*piece.y,tileSize,tileSize);
    } 
    */

    for(var i=0; i<snake.length;i++){
        var piece=snake[i];

        var maxBlue=255;
        var minBlue=100;
        var blue=Math.floor((maxBlue-minBlue)/(snake.length-1)*i+minBlue);

        context.fillStyle="rgba(0,0,"+blue+",0.7)";
        context.fillRect(tileSize*piece.x,tileSize*piece.y,tileSize,tileSize);
    } 
   
    // Draw food
    context.fillStyle="rgb(200,80,100)";
    /* context.fillRect(tileSize*15,tileSize*9,tileSize,tileSize);*/
    context.fillRect(tileSize*food.x,tileSize*food.y,tileSize,tileSize);


    //remove the last piece of snake
    snake.pop();


    //add a new piece to the head of the snake
    if(direction==="right"){
        snake.unshift({
            x:snake[0].x+1,
            y:snake[0].y,
        
        });
    } else if(direction==="down"){
        snake.unshift({
            x:snake[0].x,
            y:snake[0].y+1,
        });
    } else if(direction==="up"){
        snake.unshift({
            x:snake[0].x,
            y:snake[0].y-1,
        });
    } else if(direction==="left"){
        snake.unshift({
            x:snake[0].x-1,
            y:snake[0].y,
        });
    }

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

