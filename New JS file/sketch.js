var w = window.innerWidth;
var h = window.innerHeight;

var arr = [];
var can;
var ctx;

function setup() {
	can = createCanvas(w,h);
	can.parent('canvas');

	background(51);
	noFill();
	stroke(255);
}

function draw()	{

	w = window.innerWidth;
	h = window.innerHeight;
	can = createCanvas(w,h);
	can.parent('canvas');

	background(51);

	arr.push(new circle(mouseX, mouseY));

	while (arr.length > 200){
		arr.shift();
	}

	for (let i = 0; i < arr.length; i++){
		arr[i].show();
		arr[i].update();
	}
}

function circle(x, y){
	let f = true;

	this.x = x + random(16) - 8;
	this.y = y + random(16) - 8;

	this.c1 = floor(random(100)) + 100;
	this.c2 = floor(random(100)) + 100;
	this.c3 = floor(random(100)) + 100;

	this.vx = random(2) - 1;
	this.vy = random(2) - 1;
	this.vs = random( w * h / 1000000) +  w * h / 500000;

	this.s = (random(15) + 10) * w * h / 100000;

	this.show = function(){
		if (f){
			stroke(this.c1,this.c2,this.c3);
			ellipse(this.x,this.y,sqrt(this.s));
		}
	}

	this.update = function(){
		this.s -= this.vs
		if (this.s < 0){
			f = false;
		}
		this.x += this.vx;
		this.y += this.vy;
	}
}
