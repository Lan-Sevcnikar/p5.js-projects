var rows, cols;
var w = 40;

var curr;

var grid = [];
var stack = [];
var queue = [];

var t = true;
var t2 = false;

var prev = 10;
var back;


function setup() {
	createCanvas(800, 800);
	rows = floor(800/w);
	cols = floor(800/w);

	for (var   j = 0; j < cols; j++) {
	    for (var i = 0; i < rows; i++) {
	    	var cell = new Cell(i, j);
	    	cell.dist = -1;
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
	 queue.push(curr);
	 curr.dist = 0;
}

function draw() {
	if (!(curr.i == rows - 1 && curr.j == cols - 1)){
		console.log(queue.length);
		background(51);
		for (var k = 0; k < grid.length; k++) {
		    grid[k].show();
		}
		grid[grid.length-1].lite();
		curr.lite();
		if (curr.visited3){
			if (!curr.walls[0]) queue.push(grid[index(curr.i, curr.j-1)]);
			if (!curr.walls[1]) queue.push(grid[index(curr.i+1, curr.j)]);
			if (!curr.walls[2]) queue.push(grid[index(curr.i, curr.j+1)]);
			if (!curr.walls[3]) queue.push(grid[index(curr.i-1, curr.j)]);
			curr.dist = prev + 1;
			curr.visited3 = false;
		}prev = curr.dist;
		curr = queue.shift();
	}else{
	//	curr = back;
		if (grid[index(curr.i, curr.j-1)] && grid[index(curr.i, curr.j-1)].dist + 1 == curr.dist){
			curr.dist = 100; console.log("2");
			curr = grid[index(curr.i, curr.j-1)];
		}
		else if (grid[index(curr.i+1, curr.j)] && grid[index(curr.i+1, curr.j)].dist + 1 == curr.dist){
			curr.dist = 100; console.log("2");
			curr = grid[index(curr.i+1, curr.j)];
			
		}
		else if (grid[index(curr.i, curr.j+1)] && grid[index(curr.i, curr.j+1)].dist + 1 == curr.dist){
			curr.dist = 100; console.log("2");
			curr = grid[index(curr.i, curr.j+1)];
			
		}
		else if (grid[index(curr.i-1, curr.j)] && grid[index(curr.i-1, curr.j)].dist + 1 == curr.dist){
			curr.dist = 100; console.log("2");
			curr = grid[index(curr.i-1, curr.j)];
			
		} 
	}

	

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

	this.dist = 9999;
	this.visited3 = true;

	this.lite = function(){
		var x = this.i*w;
   		var y = this.j*w;
    	noStroke();
    	fill(200, 200, 200, a);
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

		var a = this.dist;

		stroke(255);

		if (this.walls[0]){line(x,  y,  x+w,y  );}
		if (this.walls[1]){line(x+w,y,  x+w,y+w);}
		if (this.walls[2]){line(x,  y+w,x+w,y+w);}
		if (this.walls[3]){line(x,  y,  x  ,y+w);}

		if (this.dist != -1){
			noStroke();
    	  	fill(255, 255, 255, 30);
      		rect(x, y, w, w);
		}else if (this.visited){
			noStroke();
    	  	fill(55, 55, 55, 100);
      		rect(x, y, w, w);
		}
	}
}