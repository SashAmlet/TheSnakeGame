var snake;
var scl = 20; // "pixel" side length
var food = [];

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
    var foodV = createVector(floor(random(cols)), floor(random(rows)));
    foodV.mult(scl);
    if (!(food.includes(foodV) || snake.tail.includes(foodV))){
        food.push(foodV);
    }

}
setInterval(pickLocation, 5000);

function draw(){ //called automatically in every animation frame => the higher the frame rate, the more often it is called
    background(51);
    snake.update();
    snake.show();
    var eat = snake.eat(food);
    
    if (eat[0]){
        pickLocation();
        food.splice(eat[1], 1);
    }

    fill(255, 0, 100);
    food.forEach(e => {
        rect(e.x, e.y, scl, scl);        
    });
}

function keyPressed(){ //automatically called when a key is pressed
    if (keyCode === UP_ARROW && !snake.directionVector.equals(createVector(0, 1))){
        snake.direction(0, -1);
    } else if (keyCode === DOWN_ARROW && !snake.directionVector.equals(createVector(0, -1))){
        snake.direction(0, 1);
    }else if (keyCode === RIGHT_ARROW && !snake.directionVector.equals(createVector(-1, 0))){
        snake.direction(1, 0);
    }else if (keyCode === LEFT_ARROW && !snake.directionVector.equals(createVector(1, 0))){
        snake.direction(-1, 0);
    }
}

