class Ray{
	constructor(x, y, a, ra){
		this.x = x;
		this.y = y;
		this.a = a;
		this.ra = ra;
	}

	simulate(){
		//line(this.x,this.y,p2.x,p2.y);
		let best = new Point(this.x,this.y);
		let p1 = new Point(this.x,this.y);
		let p2 = new Point(this.x+sin(this.a)*100,this.y+cos(this.a)*100);
		let minDist = 99999;
		shapes.forEach(shape => {
			for (let i = 0; i < shape.points.length-1; i++) {
				let p3 = shape.points[i];
				let p4 = shape.points[i+1];
				let intersection = intersection_ll(p1,p2,p3,p4);
				if(min(p3.x,p4.x)-1 < intersection.x){
					if(max(p3.x,p4.x)+1 > intersection.x){
						if(min(p3.y,p4.y)-1 < intersection.y){
							if(max(p3.y,p4.y)+1 > intersection.y){
								let a1 = atan2(-intersection.x+this.x,-intersection.y+this.y);
								let a2 = atan2(sin(this.a+PI)*10,cos(this.a+PI)*10);
								//console.log(a1,a2);
								if(isAprox(a1,a2,0.1)){
									let dist = dist_pp(new Point(this.x,this.y),intersection);
									//ellipse(intersection.x,intersection.y,10);
									if(dist <= minDist){
										minDist = dist;
										best.x = intersection.x;
										best.y = intersection.y;
									}
								}
								// problem, it finds intersactions on both sides, so bad. It needs to only look in one direction
							}
						}
					}
				}
			}
		});
		stroke(colour_rays);
		line(this.x,this.y,best.x,best.y);
		return this.adjustDist(dist_pp(new Point(this.x,this.y), new Point(best.x,best.y)));
	}

	adjustDist(dist){
		return dist;
	}

	set(x,y,a){
		this.x = x;
		this.y = y;
		this.a = a;
	}

	fixA(){
		this.a = (this.a+2*PI)%(2*PI);
	}
};