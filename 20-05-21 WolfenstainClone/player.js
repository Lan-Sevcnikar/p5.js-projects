class Player{
	constructor(x, y, a){
		this.x = x;
		this.y = y;
		this.a = a;
		
		this.v = 2.5;
		this.rv = 4;
		this.r = [];
		this.fov = 90;
		this.res = 200;
	}
	update(){
		this.move();
		this.rotate();
		this.r.forEach(r => {
			r.show();
		});
	}

	show(){
		ellipse(0,0,5);
		this.r[floor(this.res/2)].show_special();
	}

	move(){
		let d = new Vector(this.v*deltaTime/1000,0);
		d.rotate(this.a);
		let x = this.x
		let y = this.y;
		if(keyIsDown(UP_ARROW)){
			d = d;
		}else if(keyIsDown(DOWN_ARROW))  {
			d = new Vector(-d.x,-d.y);
		}else{
			d = new Vector(0,0);
		}

		x = this.x + d.x;
		y = this.y + d.y;

		let fx = floor(x);
		let fy = floor(y);
		if(level.grid[fy][fx] == '0'){
			this.x = x;
			this.y = y;
		}else{
			//check vertical only
			y = this.y;
			fy = floor(y);
			if(level.grid[fy][fx] == '0'){
				this.x = x;
				this.y = y;
			}

			y = this.y + d.y;
			x = this.x;
			fy = floor(y);
			fx = floor(x);
			if(level.grid[fy][fx] == '0'){
				this.x = x;
				this.y = y;
			}
		}

		this.r.forEach(r => {
			r.x = this.x;
			r.y = this.y;
		});
	}

	rotate(){
		if(keyIsDown(LEFT_ARROW)){
			this.a += this.rv * deltaTime/1000;
			this.r.forEach(r => {
				r.a += this.rv * deltaTime/1000;;
				if(r.a > PI) r.a -= 2*PI;
				if(r.a < -PI) r.a += 2*PI;
			});
		}else if(keyIsDown(RIGHT_ARROW))  {
			this.a -= this.rv * deltaTime/1000;
			this.r.forEach(r => {
				r.a -= this.rv * deltaTime/1000;;
				if(r.a > PI) r.a -= 2*PI;
				if(r.a < -PI) r.a += 2*PI;
			});
		}
		if(this.a > PI) this.a -= 2*PI;
		if(this.a < -PI) this.a += 2*PI;
	}

	inicialize(){
		for (let i = -tan(radians(this.fov/2)); i < tan(radians(this.fov/2)); i+=2*tan(radians(this.fov/2))/this.res) {
			const angle = atan(i);
			//console.log(angle);
			this.r.push(new Ray(this.x,this.y,angle,abs(angle)));
		}
		this.r.reverse();
	}
};