window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(callBoth,1000/FPS);

    canvas.addEventListener('mousemove',function(evt){
        var mousePos = calculateMousePos(evt);
        y_paddlePostion = mousePos.y - paddle_height/2
    })

     canvas.addEventListener('mousedown',handleMouseClick);
}

function handleMouseClick(evt){
    if(showingWinScreen){
        player1Score=0;
        player2Score=0;
        showingWinScreen=false;
    }
}
var canvas;
var canvasContext;
var maxPaddleSpeed = 10;

var FPS = 30;
var x_ballPostion = 400;
var y_ballPostion = 300;
var x_ballSpeed = 5;
var y_ballSpeed = 5;

var y_paddlePostion = 250;
const paddle_height = 100;
const paddle_thickness = 10;

var y_paddlePostion1 = 250;
const paddle_height1 = 100;
const paddle_thickness1 = 10;

var player1Score = 0;
var player2Score = 0;

const WinScore = 1;
var showingWinScreen = false;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(); //zwraca rozmiar  oraz  położenie elementu względem okna widoku (viewport)
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop ;
    return{
        x:mouseX, y:mouseY
    };
}

function callBoth(){
    drawEverything();
    moveEverything();
    
}

function makePaddleMove(){

}

function computerMovement(){
    var y_paddleCenterPostion =  y_paddlePostion1 + paddle_height1/2;

    if (y_paddleCenterPostion < y_ballPostion-35){
        y_paddlePostion1+=maxPaddleSpeed;
    } else if (y_paddleCenterPostion > y_ballPostion+35){
        y_paddlePostion1-=maxPaddleSpeed;
    } 
}

function moveEverything(){
    if(showingWinScreen){
        return;
    }
    computerMovement();
    //makePaddleMove();
    x_ballPostion  =x_ballPostion  + x_ballSpeed
    y_ballPostion  =y_ballPostion  + y_ballSpeed
    if(x_ballPostion >canvas.width){
        if (y_ballPostion> y_paddlePostion1 && y_ballPostion<(y_paddlePostion1+paddle_height1))
        {
            x_ballSpeed = -x_ballSpeed;

            var y_delta = y_ballPostion - (y_paddlePostion1 + paddle_height/2)
            y_ballSpeed = y_delta * 0.5;
            
        } else {
            player1Score++;
            ballReset();
        }
    }
    if(x_ballPostion <0){
        if (y_ballPostion> y_paddlePostion && y_ballPostion<(y_paddlePostion+paddle_height))
        {
            x_ballSpeed=x_ballSpeed-5;

            if(y_ballSpeed>0) y_ballSpeed=y_ballSpeed+5
            else y_ballSpeed=y_ballSpeed-5;

            //y_ballSpeed=-5;
            
            x_ballSpeed = -x_ballSpeed;
            var y_delta = y_ballPostion - (y_paddlePostion + paddle_height/2)
            y_ballSpeed = y_delta * 0.4;
            
        } else {
            player2Score++;
            ballReset();
            
        }
        
    }

    if(y_ballPostion >canvas.height || y_ballPostion <0){
        y_ballSpeed = -y_ballSpeed;
    }
}

function drawNet(){
    for(var i=0; i<canvas.height;i+=40 ){
        colorRect((canvas.width/2)-1,i+10,2, 20, 'white' );
    }

}

function drawEverything(){
    colorRect(0,0,canvas.width, canvas.height, 'black' );

    if(showingWinScreen){

        if (player1Score >=WinScore ){
            canvasContext.fillStyle = 'green'; 
            canvasContext.fillText("You won! Congratz!", (canvas.width/2)-40, canvas.height/2);
        } else {
            canvasContext.fillStyle = 'red'; 
            canvasContext.fillText("You lost!", (canvas.width/2)-10, canvas.height/2);
        }
        canvasContext.fillStyle = 'white'; 
        canvasContext.fillText("Click to continue...", (canvas.width/2)-35, 3*canvas.height/4);
        return;
    }   
    colorRect(0,y_paddlePostion,paddle_thickness, paddle_height, 'white' );

    colorRect(canvas.width-paddle_thickness1,y_paddlePostion1,paddle_thickness1, paddle_height1, 'white' );
    drawNet();
    //colorRect(x_ballPostion,200,10, 10, 'red' );
    colorCircle(x_ballPostion, y_ballPostion, 10, 'red')
    canvasContext.fillStyle = 'green'; 
    canvasContext.fillText(player1Score, 100,100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorRect(x_left, y_top, width, height, color){
    canvasContext.fillStyle = color; 
    canvasContext.fillRect(x_left,y_top,width, height);
}

function colorCircle(x_center, y_center, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x_center,y_center,radius, 0,Math.PI*2,true);
    canvasContext.fill();
}

function ballReset(){
    if(player1Score >=WinScore || player2Score >=WinScore ) {
        showingWinScreen = true;
    }

    x_ballPostion = canvas.width/2;
    y_ballPostion = canvas.height/2;
    x_ballSpeed=5;
    y_ballSpeed=5;
}   