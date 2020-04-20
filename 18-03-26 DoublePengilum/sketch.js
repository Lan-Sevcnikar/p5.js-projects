
var w = 800;
var h = 800;

var g = 1;
var ar = 0.0005;

var d1 = 1.9;
var r1 = 200;
var m1 = 10;
var v1 = 0;
var a1 = 0;

var d2 = 1.5;
var r2 = 200;
var m2 = 10;
var v2 = 0;
var a2 = -0;

function setup() {
	createCanvas(800, 800);
	strokeWeight(2);
	fill(0);
}

function draw()	{
//	frameRate(5);
	background(255);
	stroke(0);
	show();
	update();
}

function show() {
	translate(400, 100);

	var x1 = Math.sin(d1) * r1;
	var y1 = Math.cos(d1) * r1;

	var x2 = Math.sin(d2) * r2 + x1;
	var y2 = Math.cos(d2) * r2 + y1;

	line(0,0,x1,y1);
	line(x1,y1,x2,y2);
	ellipse(x1,y1,m1);
	ellipse(x2,y2,m2);
}

function update() {
	var n1 = -g * (2 * m1 + m2) * Math.sin(d1) - m2 * g * Math.sin(d1 - 2 * d2);
	var n2 = -2 * Math.sin(d1 - d2) * m2 * (v2 * v2 * r2 + v1 * v1 * r1 * Math.cos(d1 - d2));
	var n3 = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * d1 - 2 * d2));

	a1 = (n1 + n2) / n3;
	v1 += a1;
	v1 *= 1 - ar;
	d1 += v1;

	n1 = 2 * Math.sin(d1 - d2) * (v1 * v1 * r1 *(m1 + m2) + g * (m1 + m2) * Math.cos(d1) + v2 * v2 * r2 * m2 * Math.cos(d1 - d2));
	n3 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * d1 - 2 * d2));
	a2 = (n1) / n3;
	v2 += a2;
	v2 *= 1 - ar;
	d2 += v2;
}