class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
};

class Shape{
	constructor(a){
		this.points = [];
		a.forEach(element => {
			if(this.points.length == 0)this.points.push(element); 
			else if(!isSamePoint(element,this.points[this.points.length-1])) {
				this.points.push(element);
			}
		});
	}
	draw(){
		let pp = this.points[0];
		this.points.forEach(point => {
			line(pp.x,pp.y,point.x,point.y);
			pp = point;
		});
	}
};

class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	fromPoint(p){
		this.x = p.x;
		this.y = p.y;
	}
	normalize(){
		let mag = sqrt(this.x*this.x + this.y*this.y);
		if(isAprox(mag,0,0.01) == false){
			this.x = 100* this.x / mag;
			this.y = 100 * this.y / mag;
		}
	}
	magnitude(){
		return sqrt(this.x*this.x + this.y*this.y);
	}
	add(p){
		this.x += p.x;
		this.y += p.y;
	}
	subtract(p){
		this.x -= p.x;
		this.y -= p.y;
	}
	setmag(mag){
		this.normalize();
		this.x *= mag;
		this.y *= mag;
	}
	rotate(a){
		a = -a;
		let x = 0;
		let y = 0;
		x += cos(a)*this.x;
		y += sin(a)*this.x;
		x += cos(a-PI/2)*this.y;
		y += sin(a-PI/2)*this.y;
		this.x = x;
		this.y = y;
	}
};

function isAprox(a,b,c){
	let pt1 = min(a,b)+c;
	let pt2 = max(a,b)-c;
	if(pt1>pt2){
		//console.log(a,b,"isAprox");
		return true;
	}else{
		//console.log(a,b,"notAprox");
		return false;
	}
}

function intersection_ll(p1,p2,p3,p4){
	let x = ((p1.x*p2.y-p1.y*p2.x)*(p3.x-p4.x)-(p1.x-p2.x)*(p3.x*p4.y-p3.y*p4.x))/((p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x));
	let y = ((p1.x*p2.y-p1.y*p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x*p4.y-p3.y*p4.x))/((p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x));
	return new Point(x,y);
}

function getLine_pp(p1,p2){
	let a = p1.y-p2.y;
	let b = p2.x-p1.x;
	let c = - p2.x*p1.y + p2.y*p1.x;
	return [a,b,c];
}

function isSamePoint(a, b){
	let EPS = 10e-7;
	if(abs(a.x-b.x) < EPS && abs(a.y-b.y) < EPS) return true;
	return false;
}

function dist_pp(a, b){
	let dx = a.x-b.x;
	let dy = a.y-b.y;
	return sqrt(dx*dx+dy*dy);
}

function dist_pl(p1,p2,p){
	let temp = getLine_pp(p1,p2);
	let a = temp[0];
	let b = temp[1];
	let c = temp[2];
	let pt1 = abs(a*p.x + b*p.y + c);
	let pt2 = sqrt(a*a+b*b);
	return pt1/pt2;
}

function getPoint_pl(p1,p2,p){
	let temp = getLine_pp(p1,p2);
	let a = temp[0];
	let b = temp[1];
	let c = temp[2];
	let x = (b*(b*p.x-a*p.y)-a*c)/(a*a+b*b);
	let y = (a*(-b*p.x+a*p.y)-b*c)/(a*a+b*b);
	return new Point(x,y);
}

function dist_ps(s,p){
	minDist = 9999999;
	s.points.forEach(point => {
		minDist = min(minDist,dist_pp(point,p));
	});
	for (let i = 0; i < s.points.length-1; i++) {
		let pol = getPoint_pl(s.points[i],s.points[i+1],p);
		if(min(s.points[i].x,s.points[i+1].x)-1 < pol.x){
			if(max(s.points[i].x,s.points[i+1].x)+1 > pol.x){
				if(min(s.points[i].y,s.points[i+1].y)-1 < pol.y){
					if(max(s.points[i].y,s.points[i+1].y)+1 > pol.y){
						minDist = min(minDist,dist_pl(s.points[i],s.points[i+1],p));
					}
				}		
			}
		}		
	}
	return minDist;
}

function dist_pas(p){
	let minDist = 9999999;
	shapes.forEach(shape => {
		minDist = min(minDist,dist_ps(shape,p));
	});
	return minDist;
}

function triangleOrientation(p1,p2,p3){
    let vecA = new Vector(p2.x-p1.x,p2.y-p1.y);
    let vecB = new Vector(p3.x-p1.x,p3.y-p1.y);
    return cross(vecA,vecB);
}

function cross(A, B){
    return A.x*B.y - A.y*B.x;
}