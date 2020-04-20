var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var l = 200;

function setup() {
	createCanvas(w, h);
}

function draw()	{
	background(51);
	stroke(255);
	noFill();
	fun(w / 2, h / 4, h / 2);
}

function fun(x, y, l){
	if (l > 1){
		push();
		translate(x,y)
		triangle(0, 0, -(l / sqrt(3)), l, (l / sqrt(3)), l);
		fun(0, 0, l / 2);
		fun(-(l / sqrt(3)) / 2, l / 2, l / 2);
		fun( (l / sqrt(3)) / 2, l / 2, l / 2);
		pop();
	}
}