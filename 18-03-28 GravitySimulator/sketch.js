
var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var l = 200;
var air = 0;
var elements = [];


function setup() {
	createCanvas(w, h);
	elements.clear;
}

function draw()	{
//	frameRate(10);

	background(51);
	stroke(230);
	mouse();
	//console.log(elements.length);
	cliping();
	for (var i = 0; i < elements.length; i++){
		elements[i].show();
		elements[i].update();
	}
}

function planet(x, y, vx, vy) {
	this.x = x;
	this.y = y;
	this.m = 50;

	this.vx = vx;
	this.vy = vy;

	this.ax;
	this.ay;

	this.update = function() {
		var r;
		var F;
		for (var i = 0; i < elements.length; i++){
			if(elements[i].x != this.x && elements[i].y != this.y){
				r = pow(this.x - elements[i].x, 2) + pow(this.y - elements[i].y, 2);
				F = 3 * this.m * elements[i].m / r;

				F = F * elements[i].m / (this.m + elements[i].m);

				this.ax = F / (sqrt(r) / (this.x - elements[i].x));
				this.ax = -this.ax;
				this.vx += this.ax;

				this.ay = F / (sqrt(r) / (this.y - elements[i].y));
				this.ay = -this.ay;
				this.vy += this.ay;
			}
			if(this.vx  > 0) {this.vx -= air;} else {this.vx += air;}
			if(this.vy  > 0) {this.vy -= air;} else {this.vy += air;}
			this.x += this.vx;
			this.y += this.vy;
		}
	}
	this.show = function(){
		ellipse(this.x, this.y, sqrt(this.m * 20));
	}
}

function cliping (){
	for (var i = 0; i < elements.length; i++){
		for (var v = elements.length-1; v >= 0; v--){
			var r = sqrt(pow(elements[v].x - elements[i].x, 2) + pow(elements[v].y - elements[i].y, 2));
			if (i != v && r < (sqrt(elements[i].m * 20) + sqrt(elements[v].m * 20)) / 2){
				elements[i].m += elements[v].m;
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
