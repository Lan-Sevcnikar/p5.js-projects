
var w = 800;
var h = 800;

var g = 1;
var ar = 0.0005;

var d1 = 1.9;
var r1 = document.getElementById("r1_S").value;
var m1 = document.getElementById("m1_S").value;
//var r1 = 125;
//var m1 = 25;
var v1 = 0;
var a1 = 0;

console.log(r1, m1);

var d2 = 1.5;
var r2 = document.getElementById("r2_S").value;
var m2 = document.getElementById("m2_S").value;
//var r2 = 125;
//var m2 = 25;
var v2 = 0;
var a2 = -0;



function setup() {
	createCanvas(1000, 1000);
	strokeWeight(2);
	fill(0);
}

function draw()	{
//	frameRate(1);
	background(255);
	stroke(0);
	show();
	update();
}

function show() {
	translate(500, 400);
	console.log(r1, m1, "-", r2, m2);
	var x1 = Math.sin(d1) * r1;
	var y1 = Math.cos(d1) * r1;

	var x2 = Math.sin(d2) * r2 + x1;
	var y2 = Math.cos(d2) * r2 + y1;

	var k1 = floor(m1);
	var k2 = floor(m2);

	line(0,0,x1,y1);
	line(x1,y1,x2,y2);
	console.log(m1);
	ellipse(x1,y1,k1);
	ellipse(x2,y2,k2);
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

function change(){
	r1 = document.getElementById("r1_S").value;
	m1 = document.getElementById("m1_S").value;
	d1 = 1;
	v1 = 0;
	a1 = 0;

	d2 = 1;
	v1 = 0;
	a1 = 0;
	r2 = document.getElementById("r2_S").value;
	m2 = document.getElementById("m2_S").value;

}