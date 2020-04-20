//background (230, 230, 250)
//rain (138, 43, 226)

var drops = [];

var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

function setup() {
	createCanvas(w, h);
	for (var i = 0; i < 1000; i++){
		drops[i] = new Drop;
	}
}

function draw()	{
	background(230, 230, 250);
	for (var i = 0; i < 1000; i++){
		drops[i].show();
		drops[i].move();
	}
}

function Drop(){
	this.x = floor(random(0, w));
	this.y = floor(random(-300, 50));
	this.z = floor(random(5, 50));

	var x = this.x;
	var y = this.y;
	var z = this.z;

	this.move = function(){
		y += z;
		if (y > h){
			y = floor(random(-300, 50));
		}
	}

	this.show = function(){
		stroke(138, 43, 226);
		strokeWeight(floor(z/5));
		line(x,y,x,y+z);
	}
}