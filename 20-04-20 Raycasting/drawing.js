let drawing = false;
let mouseOld = false;
let poligon = [];
let ISSHIFTON = true;
const tol = 5;

function mouseUpdate(){
    stroke(colour_lines);
    if(mouseX < screenWidth/2){
        if(mouseOld == true){
            if(mouseIsPressed == false){
                if(drawing == false){
                    poligon = [];
                    drawing = true;
                    let p = new Point(mouseX,mouseY);
                    poligon.push(p);
                    mouseOld = false;
                }else{
                    let p = new Point(mouseX,mouseY);
                    if(isAprox(p.x,poligon[0].x,tol) && isAprox(p.y,poligon[0].y,tol)){
                        if(keyIsDown(16) || ISSHIFTON){
                            if(isAprox(poligon[0].x,poligon[poligon.length-1].x,tol*2)){
                                poligon[poligon.length-1].x = poligon[0].x;
                            }
                            if(isAprox(poligon[0].y,poligon[poligon.length-1].y,tol*2)){
                                poligon[poligon.length-1].y = poligon[0].y;
                            }
                        }
                        poligon.push(poligon[0]);
                        mouseOld = false;
                        drawing = false;
                        shapes.push(new Shape(poligon));
                        poligon = [];
                    }else{
                        if(keyIsDown(16) || ISSHIFTON){
                            let dx = poligon[poligon.length-1].x-mouseX;
                            let dy = poligon[poligon.length-1].y-mouseY;
                            if(abs(dx) > abs(dy)) dy = 0;
                            else dx = 0;
                            console.log(dx,dy);
                            let pp = new Point(poligon[poligon.length-1].x-dx,poligon[poligon.length-1].y-dy);
                            poligon.push(pp);
                        }else{
                            poligon.push(p);
                        }
                        mouseOld = false;
                    }
                }
            }
        }else{
            if(drawing == true){
                for (let i = 0; i < poligon.length-1; i++) {
                    line(poligon[i].x,poligon[i].y,poligon[i+1].x,poligon[i+1].y);
                }
                if(keyIsDown(16) || ISSHIFTON){
                    let dx = poligon[poligon.length-1].x-mouseX;
                    let dy = poligon[poligon.length-1].y-mouseY;
                    if(abs(dx) > abs(dy)) dy = 0;
                    else dx = 0;
                    console.log(dx,dy);
                    line(poligon[poligon.length-1].x-dx,poligon[poligon.length-1].y-dy,poligon[poligon.length-1].x,poligon[poligon.length-1].y);
                }else{
                    line(poligon[poligon.length-1].x,poligon[poligon.length-1].y,mouseX,mouseY);
                }
                
            }
            
            if(mouseIsPressed) mouseOld = true;
        }
    }
}