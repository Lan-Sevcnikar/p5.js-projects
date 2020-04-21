class Player{
	constructor(x1,y1,a){
		this.x = x1;
		this.y = y1;
		this.a = a;
		this.v = 1;
		this.rs = 2;
		this.rays = [];
		this.gen_rays();
		this.size = 10;
	}
	update(){
		let w = new Vector(0,0);
		if(keyIsDown(UP_ARROW))    w.y -= 1;
		if(keyIsDown(DOWN_ARROW))  w.y += 1; 
		w.normalize();
		w.rotate(this.a);
		w.setmag(deltaTime*this.v/1000);
		const wps = new Vector(w.x,w.y);
		wps.x += sin(this.a)*this.size;
		wps.y += cos(this.a)*this.size;
        if(!this.collided(wps)){
            this.x += w.x;
            this.y += w.y;
            this.rays.forEach(ray => {
                ray.set(this.x,this.y,ray.a);
            });
        }else{
			let wx = new Vector(w.x,0);
			let wy = new Vector(0,w.y);
			if(!this.collided(wx)){
				this.x += wx.x;
				this.y += wx.y;
				this.rays.forEach(ray => {
					ray.set(this.x,this.y,ray.a);
				});
			}else if(!this.collided(wy)){
				this.x += wy.x;
				this.y += wy.y;
				this.rays.forEach(ray => {
					ray.set(this.x,this.y,ray.a);
				});
			}else{
				console.log("no wat");
			}
		}
		let da = 0;
		if(keyIsDown(LEFT_ARROW)) da -= this.rs;
		if(keyIsDown(RIGHT_ARROW)) da += this.rs;
		this.a += da*deltaTime/1000;
		this.fixA();
		this.rays.forEach(ray => {
			ray.a += da*deltaTime/1000;
			ray.fixA();
		});
	}
	draw(){
		let dists = [];
		fill(244);
		stroke(colour_lines);
		ellipse(this.x,this.y,this.size*2);
		stroke(colour_rays);
		// this.rays.forEach(ray => {
		// 	dists.push(ray.simulate());
		// });
		return dists;
	}
	// this code simulates aplane and then lines through it
	// gen_rays(){
	// 	let maxDist = tan(FOV/2);
	// 	for (let i = 1; i < resolution/2; i++) {
	// 		let x = maxDist*2*i/resolution;
	// 		let a = (-atan(x)+2*PI)%(2*PI);
	// 		this.rays.push(new Ray(this.x,this.y,a,a-this.a));
	// 	}
	// 	this.rays.reverse();
	// 	this.rays.push(new Ray(this.x,this.y,this.a,0));
	// 	for (let i = 1; i < resolution/2; i++) {
	// 		let x = maxDist*2*i/resolution;
	// 		let a = (atan(x)+2*PI)%(2*PI);
	// 		this.rays.push(new Ray(this.x,this.y,a,a+this.a));
	// 	}
	// }
	// this code simulates lines by equal angle thingies
	gen_rays(){
		const fov2 = FOV/2;
		const delta = FOV/resolution;
		for (let i = 0; i < resolution; i++) {
			const angle = i * delta-FOV/2;
			this.rays.push(new Ray(this.x,this.y,angle,0));
			this.rays[i].fixA();
		}
	}
	fixA(){
		this.a = (this.a+2*PI)%(2*PI);
    }
    collided(w){
		//return false;
		let result = 0;
        const curr = new Point(this.x,this.y);
        const next = new Point(this.x + w.x, this.y + w.y);
        shapes.forEach(shape => {
            for (let i = 0; i < shape.points.length-1; i++) {
                const p1 = shape.points[i];
				const p2 = shape.points[i+1];
				const inter = intersection_ll(curr,next,p1,p2);
				if(inter != NaN){
					if(min(curr.x,next.x)-1 < inter.x){
						if(max(curr.x,next.x)+1 > inter.x){
							if(min(curr.y,next.y)-1 < inter.y){
								if(max(curr.y,next.y)+1 > inter.y){
									if(min(p1.x,p2.x)-1 < inter.x){
										if(max(p1.x,p2.x)+1 > inter.x){
											if(min(p1.y,p2.y)-1 < inter.y){
												if(max(p1.y,p2.y)+1 > inter.y){
													result = result  + 1;
												}
											}
										}
									}
								}
							}
						}
					}
				}
            }
        });
        return result;
    }
};