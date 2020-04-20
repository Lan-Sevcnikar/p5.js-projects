var grid = [];
var shown = [];

var siz = 20;
var l = 40;
var over = 0;

function setup() {

	createCanvas(siz * l + 1, siz * l + 1);
	for (var i = 0; i < siz; i++){
		grid[i] = [];
		shown[i] = [];
		for (var v = 0; v < siz; v++){
			grid[i].push(0);
			shown[i].push(0);
		}
	}
	for (var i = 0; i < siz * 2; i++){
		var x = floor(random(siz));
		var y = floor(random(siz));
		grid[x][y] = -1;
	}

	for (var i = 0; i < siz; i++){
		for (var v = 0; v < siz; v++){
			if (grid[i][v] != -1){
				var sum = 0;
				if (i > 0 && grid[i-1][v] == -1) {sum++;}
				if (v > 0 && grid[i][v-1] == -1) {sum++;}
				if (i > 0 && v > 0 && grid[i-1][v-1] == -1) {sum++;}
				if (i < siz-1 && grid[i+1][v] == -1) {sum++;}
				if (v < siz-1 && grid[i][v+1] == -1) {sum++;}
				if (i < siz-1 && v < siz-1 && grid[i+1][v+1] == -1) {sum++;}
				if (i < siz-1 && v > 0 && grid[i+1][v-1] == -1) {sum++;}
				if (i > 0 && v < siz-1 && grid[i-1][v+1] == -1) {sum++;}
				grid[i][v] = sum;
			}
		}
	}
}

function draw()	{
	if (!over){
		show();
		mouse();
	}else{
		show2();
		sip();
	}
}

function show(){
	textSize(25);
	for (var i = 0; i < siz; i++){
		for (var v = 0; v < siz; v++){
			if (shown[i][v]){
				fill(255);
				rect(i * l, v * l, l, l);
				fill(0);
				if(grid[i][v] == -1){
					ellipse(i * l + l / 2 , v * l + l / 2, l / 2);
				}else if(grid[i][v] == -2){
					ellipse(i * l + l / 2 , v * l + l / 2, l / 2);
				}else if(grid[i][v] != 0){
					text(grid[i][v], i * l + 13, v * l + l - 12)
				}
			}else{
				fill(150);
				rect(i * l, v * l, l, l);
			}
		}
	}
}

function show2(){
	background(150);
}

function revel(x, y){
console.log("yiss");
	if (grid[x][y] == 0 && shown[x][y] == 0){
		shown[x][y] = 1;
		if (x != siz - 1) {revel(x + 1, y);}
		if (x != 0) {revel(x - 1, y);}
		if (y != siz - 1) {revel(x, y + 1);}
		if (y != 0) {revel(x, y - 1);}
	}
	shown[x][y] = 1;
}
