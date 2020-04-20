var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var l = 200;

var elements = [];
var pressed = false;

function setup() {
	createCanvas(w, h);
}

function draw()	{
//	frameRate(10);
	background(51);
	stroke(230);
	mouse();
	console.log(elements.length);
	cliping();
	for (var i = 0; i < elements.length; i++){
		elements[i].show();
		elements[i].update();
	}
}

function planet(x, y) {
	this.x = x;
	this.y = y;
	this.m = 50;

	this.vx = random(-5,5);
	this.vy = random(-5,5);

	this.update = function() {
		var r;
		var F;
		var ax;
		var ay;
		for (var i = 0; i < elements.length; i++){
			if(elements[i].x != this.x && elements[i].y != this.y){
				r = pow(this.x - elements[i].x, 2) + pow(this.y - elements[i].y, 2);
				F = 5 * this.m * elements[i].m / r;
				
				F = F * elements[i].m / (this.m + elements[i].m);

				ax = F / (sqrt(r) / (this.x - elements[i].x));
				ax = -ax;
				this.vx += ax;

				ay = F / (sqrt(r) / (this.y - elements[i].y));
				ay = -ay;
				this.vy += ay;
			}
			if(this.vx  > 0) {this.vx-= 0.02;} else {this.vx+= 0.02;}
			if(this.vy  > 0) {this.vy-= 0.02;} else {this.vy+= 0.02;}
			this.x += this.vx;
			this.y += this.vy;
		}
	}
	this.show = function(){
		ellipse(this.x, this.y, this.m);
	}
}

function cliping (){
	for (var i = 0; i < elements.length; i++){
		for (var v = elements.length-1; v >= 0; v--){
			var r = sqrt(pow(elements[v].x - elements[i].x, 2) + pow(elements[v].y - elements[i].y, 2));
			if (i != v && r < (elements[i].m + elements[v].m) / 2){
				elements[i].m += elements[v].m;
				elements[i].m /= 1.5;
				elements[i].vx = (elements[i].vx * elements[i].m + elements[v].vx * elements[v].m) / (elements[v].m + elements[i].m);
				elements[i].vy = (elements[i].vy * elements[i].m + elements[v].vy * elements[v].m) / (elements[v].m + elements[i].m);
				elements.splice(v,1);
			}
		}
	}
	for (var i = 0; i < elements.length; i++){
		if (elements[i].x < -30 || elements[i].x > w + 30 || elements[i].y < -30 || elements[i].y > h + 30){
			elements.splice(i,1);
		}
	}
}

function mouse() {
	if (mouseIsPressed && !pressed){
		elements.push(new planet(mouseX, mouseY));
		pressed = true;
	}else if (!mouseIsPressed){
		pressed = false;
	}
}