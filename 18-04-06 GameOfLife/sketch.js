var w = 100;
var h = 100;
var s = 20;

var index = 0;
let grid;

function make2dArray(cols, rows){
	let arr = new Array(rows);
	for (let i = 0; i < rows; i++){
		arr[i] = new Array(cols);
	}
	return arr;
}

function setup() {
	createCanvas(w * s, h * s);
	noStroke();
	grid = make2dArray(h, w);
	for (let i = 0; i < w; i++){
		for (let j = 0; j < w; j++){
			grid[i][j] = floor(random(1.5));
		}
	}
}

function draw()	{
	frameRate(24);
	show();
	update();
}

function show(){
	for (let i = 0; i < w; i++){
		for (let j = 0; j < h; j++){
			if (grid[i][j]){
				fill(51);
			}else{
				fill(230);
			}rect(i * s, j * s, s, s);
		}
	}
}

function update(){
	let n_arr = make2dArray(h, w);
	for (let i = 0; i < w; i++){
		for (let j = 0; j < h; j++){
			let n = 0;
			if (i != 0 && j != 0 && grid[i-1][j-1]){n++;}
			if (i != 0           && grid[i-1][j  ]){n++;}
			if (          j != 0 && grid[i  ][j-1]){n++;}
			if (i!=w-1           && grid[i+1][j  ]){n++;}
			if (i!=w-1 && j!=h-1 && grid[i+1][j+1]){n++;}
			if (          j!=h-1 && grid[i  ][j+1]){n++;}
			if (i!=w-1 && j != 0 && grid[i+1][j-1]){n++;}
			if (i != 0 && j!=h-1 && grid[i-1][j+1]){n++;}

			if (grid[i][j] == 1){
				if (n > 3 || n < 2){
					n_arr[i][j] = 0;
				}else{
					n_arr[i][j] = 1;
				}
			}else if (grid[i][j] == 0){
				if(n === 3){
					n_arr[i][j] = 1;
				}else{
					n_arr[i][j] = 0;
				}
			}
		}
	}
	grid = n_arr;
}
