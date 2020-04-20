
var w = window.innerWidth - 40;
var h = window.innerHeight - 40;

var l = 200;
var air = 0;
var elements = [];

var g = 0.04;
var v_compensator = 2;

function setup() {
	createCanvas(w, h);
	elements.clear;
//	elements.push(new planet(w/2, h/2, 0, 0, 4000));
}

function draw()	{
//	frameRate(4);

	background(51);
	stroke(230);
	mouse();
	//console.log(elements.length);
	cliping();
	for (var i = 0; i < elements.length; i++){
		elements[i].show();
		elements[i].update();
//		elements[i].showHis();
	}
}
