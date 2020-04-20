var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var angle = -1.05;

function setup() {
	createCanvas(w, h);
	background(51);
	stroke(255);
	noFill();
	strokeWeight(0.4);
	translate(w / 16, h / 1.2);
	fun(w * 14 / 16);
}

function draw()	{
	
}

function fun(l){
	if (l > 0.3){
		var l2 = l / 3;

		push();
		fun(l2);

		push();
		translate(l2, 0)
		rotate(angle);
		fun(l2);

		push();
		translate(l2, 0)
		rotate(- 2 * angle);
		fun(l2);

		push();
		translate(l2, 0)
		rotate(angle);
		fun(l2);

		pop();
		pop();
		pop();
		pop();
	}else{
		line(0,0,l,0);
	}
}