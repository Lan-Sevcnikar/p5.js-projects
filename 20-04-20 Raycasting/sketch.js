let colour_background;
let colour_lines;
let colour_rays;

const screenWidth = 2400;
const screenHeight = 900;
const resolution = 200;
const FOV = radianss(60);
const maxDist = screenWidth/3;

function radianss(a){
	return (a* 2*3.1415 / 360);
}

let shapes = [];
let player;



function setup() {
	colour_background = color(51,50,50);
	colour_lines = color(232,233,235);
	colour_rays = color(232,72,85);
	let p1 = new Point(5,5);
	let p2 = new Point(screenWidth/2,5);
	let p3 = new Point(screenWidth/2,screenHeight-5);
	let p4 = new Point(5,screenHeight-5);
	let o = new Shape([p1,p2,p3,p4,p1]);
	shapes.push(o);
	player = new Player(400,400,0);
	angleMode(RADIANS)
	createCanvas(screenWidth,screenHeight);
	//gen_rays(600);
	noFill();
}

function draw()	{
	console.log(1000/deltaTime);
	//console.log(-0.3%PI);
	//console.log(player);
	//console.log(player);
	frameRate(60);
	background(colour_background);
	strokeWeight(3);
	stroke(colour_lines);
	shapes.forEach(shape => {
		shape.draw();
	});
	player.update();
	player.draw();
	mouseUpdate();
	projectRay();
}