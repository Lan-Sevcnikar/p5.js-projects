var cols = 60;
var rows = 40;

var s = 24;

var grid;

function setup() {
	createCanvas(1460,880);
	background(255);
	//noStroke();
	fill(135, 200, 25);

	grid = make2dArray(cols, rows, true);
	show();
}

function draw()	{
	frameRate(2);
	update();
	show();
}

function polygon(x, y, r, n){
	push();

	translate(x,y);

	let a = TWO_PI / n;
	beginShape();
	for (let i = 0; i < TWO_PI; i += a){
		vertex(sin(i) * r, cos(i) * r);
	}
	endShape();

	pop();
}

function make2dArray(col, row, r){
	let arr = new Array(col);
	for (let i = 0; i < col; i++){
		arr[i] = new Array(row);
		if (r){
			for (let j = 0; j < row; j++){
				arr[i][j] = floor(random(2));
			}
		}
	}
	return arr;
}

function show(){
	for (let i = 0; i < cols; i++){
		for (let j = 0; j < rows; j++){
			fill(grid[i][j] ? 120 : 220);
			polygon(j % 2 == 0 ? i * s + s/2: i * s + s,j * s + s - j * 3, s / 2, 6);
		}
	}
}

function update(){
	arr = make2dArray(cols, rows, false);
	for (let i = 0; i < cols; i++){
		for (let j = 0; j < rows; j++){
			let n = 0;
			if (i != 0 &&              grid[i-1][j  ]){n++;}
			if (i != cols-1 &&         grid[i+1][j  ]){n++;}

			if(j % 2 == 0){
				if (i != 0 && j!=rows-1 && grid[i-1][j+1]){n++;}
				if (j != 0 && i != 0 &&    grid[i-1][j-1]){n++;}
			}else{
				if (i!=cols-1 && j!=rows-1 && grid[i+1][j+1]){n++;}
				if (j != 0 && i!=cols-1 &&    grid[i+1][j-1]){n++;}
			}

			if (j != 0 &&              grid[i  ][j-1]){n++;}
			if (j != rows-1 && 	       grid[i  ][j+1]){n++;}

			if (grid[i][j]){
				if (n > 4 || n < 3){
					arr[i][j] = 0;
				}else{
					arr[i][j] = 1;
				}
			}else{
				if (n == 2){
					arr[i][j] = 1;
				}else{
					arr[i][j] = 0;
				}
			}
		}
	}
	grid = arr;
}
