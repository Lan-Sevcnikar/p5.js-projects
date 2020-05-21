let colour_background;
let colour_lines;
let colour_rays;

const screenWidth = 2400;
const screenHeight = 900;
const resolution = 200;

let initilized = false;
var level;

function setup() {
	createCanvas(screenWidth,screenHeight);
	colour_background = color(51,50,50);
	colour_lines = color(232,233,235);
	colour_rays = color(232,72,85);
	noFill();
}

function draw()	{
	console.log(1000/deltaTime);
	//frameRate(60);
	background(colour_background);
	if(initilized){
		level.show();
	}
	
}