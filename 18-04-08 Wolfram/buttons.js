function myFunction(){
	start = true;
	laws = document.getElementById("myField");
	laws = laws.value;
	laws = decToBin(laws);
}

function myFunction2(){
	start = false;
	background(51);
	for (let i = 0; i < n; i++){
		grid[i] = 0;
	}
	grid[n/2] = 1;
	index = 0;
	show(0);
}
