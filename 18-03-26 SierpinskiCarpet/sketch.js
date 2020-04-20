var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var l = 200;

function setup() {
	createCanvas(w, h);
	background(51);
	stroke(255);
	noFill();
	strokeWeight(0.75)
	fun(w / 3, h / 4, h / 2);
}

function draw()	{
	
}

function fun(x, y, l){
	if (l > 0.4){
		push();
		translate(x,y)
		rect(0,0,l,l);
		fun(0,         0,         l / 3);	//1,1
		fun(l / 3,     0,         l / 3);	//1,2
		fun(2 * l / 3, 0,         l / 3);	//1,3
		fun(0,         l / 3,     l / 3);	//2,1
		fun(0,         2 * l / 3, l / 3);	//3,1
		fun(2 * l / 3, l / 3,     l / 3);	//2,3
		fun(l / 3,     2 * l / 3, l / 3);	//3,1
		fun(2 * l / 3, 2 * l / 3, l / 3);	//3,1
		pop();
	}
}