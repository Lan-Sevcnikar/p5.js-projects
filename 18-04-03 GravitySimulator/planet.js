
function planet(x, y, vx, vy, m) {
	this.x = x;
	this.y = y;
	this.m = m;

	this.vx = vx;
	this.vy = vy;

	this.ax;
	this.ay;

    this.hisX = [];
    this.hisY = [];

	this.update = function() {
		var r;
		var F;
		for (var i = 0; i < elements.length; i++){
			if(elements[i].x != this.x && elements[i].y != this.y){
				r = pow(this.x - elements[i].x, 2) + pow(this.y - elements[i].y, 2);
				F = g * this.m * elements[i].m / r;

				F = F * elements[i].m / (this.m + elements[i].m);

				this.ax = F / (sqrt(r) / (this.x - elements[i].x));
				this.ax = -this.ax;
				this.vx += this.ax/3;

				this.ay = F / (sqrt(r) / (this.y - elements[i].y));
				this.ay = -this.ay;
				this.vy += this.ay/3;
			}
			if(this.vx  > 0) {this.vx -= air;} else {this.vx += air;}
			if(this.vy  > 0) {this.vy -= air;} else {this.vy += air;}
			this.x += this.vx;
			this.y += this.vy;
		}



	}

	this.show = function(){
		fill(230);

		ellipse(this.x, this.y, sqrt(this.m * v_compensator));

      	this.hisX.unshift(this.x);
        this.hisY.unshift(this.y);

       stroke(230);
	   noFill();
       strokeWeight(floor(sqrt(this.m) / 10) + 1)

        beginShape();

        for (var i = this.hisX.length; i > -1; i--){
			if (i > 55){
				this.hisX.splice(-1,1);
				this.hisY.splice(-1,1);
			}else{
            	vertex(this.hisX[i], this.hisY[i]);
			}
        }

        endShape();
    }
}
