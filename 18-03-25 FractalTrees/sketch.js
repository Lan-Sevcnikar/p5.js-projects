//down (200, 204, 210);
//up (55, 55, 55);

var w = 800;
var h = 800;

var r = 0.4;
var l = 1.4;

function setup(){
	createCanvas(w, h);
}

function draw(){
	background(55, 55, 55);
	translate(floor(w/2),h)
	strokeWeight(2);
	stroke(200, 204, 210);
	branch(200);
}

function branch(len) {
	if (len > 1){
		line(0,0,0,-len);

		translate(0,-len)
		rotate(r);
		branch(floor(len/l));

		rotate(-r * 2);
		branch(floor(len/l));

		rotate(r);
		translate(0,len)
	}
	
}