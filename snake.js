function Snake(){
    //head coordinates
    this.x = 0;
    this.y = 0;
    //
    this.directionVector = createVector(1, 0);
    this.tail = [];

    /*  *** UPDATE *** */
    this.update = function(){
        this.x += this.directionVector.x*scl;
        this.y += this.directionVector.y*scl;
        //I set boundaries so that the snake does not go beyond the boundaries of the canvas.
        if (this.x > width - scl){
            this.x = 0;
        }else if (this.y > height - scl){
            this.y = 0;
        }else if(this.x < 0){
            this.x = width - scl;
        }else if(this.y < 0){
            this.y = height - scl;
        }
        // tail control
        this.death();
        for(var i = this.tail.length-1; i > 0 ; i--){
            this.tail[i] = this.tail[i-1];
        }
        this.tail[0] = createVector(this.x, this.y);
    }

    /*  *** SHOW *** */
    this.show = function(){
        fill(255);
        for(var i = 0; i < this.tail.length ; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
        }
        
    }

    /*  *** DIRECTION *** */
    this.direction = function(x, y){
        this.directionVector = createVector(x, y);
    }
    /*  *** EAT *** */
    this.eat = function(posArr){
        var d = [];
        posArr.forEach(e => {
            d.push(dist(this.x, this.y, e.x, e.y));
        });

        for (var i = 0; i < d.length; i++){
            if (d[i]<10){
                this.tail.push(this.tail[this.tail.length-1]);
                this.update();
                this.show();
                return [true, i];
            }
        }
        return [false, -1];
        
    }

    /*  *** DEATH *** */
    this.death = function(){ 
        //if the current coordinates of the snake intersect with the tail, it means it crashed into itself, which means we need to clean the tail
        for(var i = 0; i<this.tail.length; i++){
            var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
            if (d<1){
                this.tail = [];
                this.x = 0;
                this.y = 0;
            }
        }
    }
}