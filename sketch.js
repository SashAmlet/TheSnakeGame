var snake;
var scl = 20; // "pixel" side length
var food;

function setup(){
    createCanvas(600, 600);
    background(51);
    snake = new Snake();
    frameRate(10); //we can regulate the speed of the snake
    pickLocation();
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

}

function draw(){ //called automatically in every animation frame => the higher the frame rate, the more often it is called
    background(51);
    snake.update();
    snake.show();
    
    if (snake.eat(food)){
        pickLocation();
    }
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed(){ //automatically called when a key is pressed
    if (keyCode === UP_ARROW){
        snake.direction(0, -1);
    } else if (keyCode === DOWN_ARROW){
        snake.direction(0, 1);
    }else if (keyCode === RIGHT_ARROW){
        snake.direction(1, 0);
    }else if (keyCode === LEFT_ARROW){
        snake.direction(-1, 0);
    }
}

