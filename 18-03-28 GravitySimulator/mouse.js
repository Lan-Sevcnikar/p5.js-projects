var pressed = false;
var x11;
var y11;
var x21;
var y21;


function mouse() {
	if (mouseIsPressed && !pressed){
		x11 = mouseX;
		y11 = mouseY;
		pressed = true;
	}else if (mouseIsPressed && pressed){
		x21 = mouseX;
		y21 = mouseY;
		line(x11,y11,x21,y21);
	}else if (!mouseIsPressed && pressed){
		var vx1 = x11 - x21;
		var vy1 = y11 - y21;
		//console.log("bamm");
		elements.push(new planet(x11, y11, vx1 / 25, vy1 / 25));
		pressed = false;
	}
}
