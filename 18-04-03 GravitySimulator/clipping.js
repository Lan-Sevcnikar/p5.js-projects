
function cliping (){
	for (var i = 0; i < elements.length; i++){
		for (var v = elements.length-1; v >= 0; v--){
			var r = sqrt(pow(elements[v].x - elements[i].x, 2) + pow(elements[v].y - elements[i].y, 2));
			if (i != v && r < (sqrt(elements[i].m * v_compensator) + sqrt(elements[v].m * v_compensator))){
				elements[i].m += elements[v].m;
				elements[i].vx = (elements[i].vx * elements[i].m + elements[v].vx * elements[v].m) / (elements[v].m + elements[i].m);
				elements[i].vy = (elements[i].vy * elements[i].m + elements[v].vy * elements[v].m) / (elements[v].m + elements[i].m);
				elements.splice(v,1);
			}
		}
	}
	for (var i = 0; i < elements.length; i++){
		if (elements[i].x < -30 || elements[i].x > w + 30 || elements[i].y < -30 || elements[i].y > h + 30){
			elements.splice(i,1);
		}
	}
}
