var rows, cols;
var w = 20;

var curr;

var grid = [];
var stack = [];

var t = true;
var t2 = false;

function setup() {
	document.addEventListener('keydown', keyPush);
	createCanvas(600, 600);
	rows = floor(600/w);
	cols = floor(600/w);

	for (var   j = 0; j < cols; j++) {
	    for (var i = 0; i < rows; i++) {
	    	var cell = new Cell(i, j);
	    	grid.push(cell);
	    }
	}
	curr = grid[0];
	curr.visited = true;
	stack.push(curr)
	while (stack.length != 0){
		var next = curr.checkNear();
	  	if (next){
	  		next.visited = true;
	  		stack.push(curr);
	 		removeWalls(curr, next);
	 		curr = next;
	 	}else if (stack.length > 0){
	 		curr = stack.pop();
	 	}
	 }
}

function draw() {
	background(51);
	for (var k = 0; k < grid.length; k++) {
	    grid[k].show();
	}
	curr.lite();
	grid[grid.length-1].lite();
 }

function keyPush(evt){
	switch(evt.keyCode){
		case 37:
			if (!curr.walls[3]){
				curr = grid[index(curr.i-1, curr.j)];
			}
			break;
		case 38:
			if (!curr.walls[0]){
				curr = grid[index(curr.i, curr.j-1)];
			}
			break;
		case 39:
			if (!curr.walls[1]){
				curr = grid[index(curr.i+1, curr.j)];
			}
			break;
		case 40:
			if (!curr.walls[2]){
				curr = grid[index(curr.i, curr.j+1)];
			}
			break;
	}
}

function fun(){
	var string = "";
 	string += rows + " " + cols + "<br>";
 	for (var k = 0; k < grid.length; k++) {
 		string += grid[k].walls[0] ? "1 " : "0 ";
 		string += grid[k].walls[1] ? "1 " : "0 ";
 		string += grid[k].walls[2] ? "1 " : "0 ";
 		string += grid[k].walls[3] ? "1 " : "0 ";
 		string += "<br>";
 	}
 	document.write(string);
}

function index(i, j){
	if (i < 0 || j < 0 || i >= cols || j >= rows){
		return -1;
	}else{
		return i + j * cols;
	}
}

function removeWalls(a, b){
	x = a.i - b.i;
	y = a.j - b.j;
	if (x === 1) {a.walls[3] = false; b.walls[1] = false;}
	if (x === -1) {a.walls[1] = false; b.walls[3] = false;}
	if (y === 1) {a.walls[0] = false; b.walls[2] = false;}
	if (y === -1) {a.walls[2] = false; b.walls[0] = false;}
}

function Cell(i, j){
	this.i = i;
	this.j = j;
	this.visited = false;
	this.walls = [true, true, true, true];

	this.lite = function(){
		var x = this.i*w;
   		var y = this.j*w;
    	noStroke();
    	fill(0, 0, 255, 100);
    	rect(x, y, w, w);
	}

	this.checkNear = function(){
		var near = [];
		var top    = grid[index(i, j-1)];
		var right  = grid[index(i+1, j)];
		var left   = grid[index(i-1, j)];
		var bottom = grid[index(i, j+1)];

		if (top && !top.visited)      {near.push(top);}
		if (right && !right.visited)  {near.push(right);}
		if (bottom && !bottom.visited){near.push(bottom);}
		if (left && !left.visited)    {near.push(left);}

		if (near.length > 0) {
      		var r = floor(random(0, near.length));
      		return near[r];
    	}else{
      		return undefined;
    	}
	}
	
	this.show = function(){
		var x = this.i * w;
		var y = this.j * w;

		stroke(255);

		if (this.walls[0]){line(x,  y,  x+w,y  );}
		if (this.walls[1]){line(x+w,y,  x+w,y+w);}
		if (this.walls[2]){line(x,  y+w,x+w,y+w);}
		if (this.walls[3]){line(x,  y,  x  ,y+w);}

		if (this.visited){
			noStroke();
    	  	fill(255, 0, 255, 100);
      		rect(x, y, w, w);
		}
	}
}