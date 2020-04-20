var pressed = false;
var x11;
var y11;
var x21;
var y21;
var m1 = 10

function mouse() {
	if (mouseIsPressed && !pressed){
		x11 = mouseX;
		y11 = mouseY;
		pressed = true;
		m1 = 10;
	}else if (mouseIsPressed && pressed){
		x21 = mouseX;
		y21 = mouseY;
		m1 += 13;
		ellipse(x11,y11,sqrt(m1 * v_compensator))
		line(x11,y11,x21,y21);
	}else if (!mouseIsPressed && pressed){
		var vx1 = x11 - x21;
		var vy1 = y11 - y21;
		//console.log("bamm");
		elements.push(new planet(x11, y11, vx1 / 55, vy1 / 55, m1));
		pressed = false;
	}
}
