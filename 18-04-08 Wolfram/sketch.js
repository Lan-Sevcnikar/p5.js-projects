var w = window.innerWidth - 40;
var h = window.innerHeight - 105;

var n = 1024;
var s;
var laws;
var index = 0;

var grid = new Array(n);
var start = false;

function setup() {

	createCanvas(w, h)
	background(51);
	noStroke();

	for (let i = 0; i < n; i++){grid[i] = 0;}
	grid[n/2] = 1;
	s = w / n;

	show(0);
}

function draw()	{
	frameRate(24);

	if(start){
		if(index * s > h){start = 0;}
		index++;
		update(laws);
		show(index);
	}

}

function update(l){
	let grid2 = new Array(n);
	for (let i = 1; i < n - 1; i++){
		let j = grid[i-1] * 4 + grid[i] * 2 + grid[i+1];
		grid2[i] = l[j];
	}
	grid = grid2;
}

function show(i){
	for (let j = n / 4; j < n / 4 * 3; j++){
		if(grid[j]){
			fill(230);
		}else{
			fill(35);
		}
		rect(j * s * 2 - n / 2 * s, i * s * 2, s * 2, s * 2);
	}
}

function decToBin(v){
	let arr = new Array(8);
	let i = 0;
	for (i = 7; i >= 0; i--){
		if (v >= pow(2,i)){
			arr[i] = 1;
			v -= pow(2,i);
		}else{
			arr[i] = 0;
		}
	}
	return arr;
}
