var img;
var w = 1280;
var h = 720;

var index = 0;
var c;
var comp;
var old;
var nold;
var qerror;

function preload(){
	img = loadImage('cat2.jpg');
}

function setup(){
	createCanvas(w,h);
	image(img, 0, 0, w , h)
	filter(GRAY);
	change();
	dithering();
//	resize(1280, 720)
	saveCanvas('png');
}
function draw(){

}

function dithering(){
	loadPixels();
	console.log("SUP");
	for (var i = 0; i < w * h * 400; i += 4){
		old = pixels[i];
		pixels[i+0] = floor(old / 128) * 255;
		pixels[i+1] = pixels[i+0]
		pixels[i+2] = pixels[i+0]
		nold = pixels[i];
		qerror = old - nold;

		pixels[i+4] += qerror * 7 / 16;
		pixels[i+w-1] += qerror * 3 / 16;
		pixels[i+w] += qerror * 5 / 16;
		pixels[i+w+1] += qerror * 1 / 16;
	}
	updatePixels();
}

function change(){
	loadPixels();
	console.log("SUP");
	for (var i = 0; i < w * h * 400; i += 4){
		c = pixels[i];
		pixels[i+0] = floor(c / 16) * 32;
		pixels[i+1] = pixels[i+0]
		pixels[i+2] = pixels[i+0]
	}
	updatePixels();

}
