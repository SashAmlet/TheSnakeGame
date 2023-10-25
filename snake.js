function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.tail = [];

    this.update = function(){
        this.x += this.xspeed*scl;
        this.y += this.yspeed*scl;
        //I set boundaries so that the snake does not go beyond the boundaries of the canvas.
        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
        // tail control
        this.death();
        for(var i = this.tail.length-1; i > 0 ; i--){
            this.tail[i] = this.tail[i-1];
        }
        this.tail[0] = createVector(this.x, this.y);
    }

    this.show = function(){
        fill(255);
        for(var i = 0; i < this.tail.length ; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
        }
        
    }

    this.direction = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos){
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d<1){
            this.tail.push(this.tail[this.tail.length-1]);
            this.update();
            this.show();
            return true;
        }else{
            return false;
        }
    }
    
    this.death = function(){ 
        //if the current coordinates of the snake intersect with the tail, it means it crashed into itself, which means we need to clean the tail
        for(var i = 0; i<this.tail.length; i++){
            var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
            if (d<1){
                this.tail = [];
            }
        }
    }
}