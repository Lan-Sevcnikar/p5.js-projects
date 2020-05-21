function projectRay(){
    // Code assumes screen and does equal distance between perpendicular distances
    // const n = player.rays.length;
    // const dx = screenWidth/(n*2);
    // for (let i = 0; i < n; i++) {
    //     const dist = player.rays[i].simulate();
    //     const adjustDist = cos(player.rays[i].ra) * dist;
    //     //const adjustDist = dist;
    //     //console.log(dist,0,maxDist,255,0);
    //     const c = map(min(adjustDist,maxDist),40,maxDist,255,0);
    //     const h = map(min(adjustDist,maxDist),40,maxDist,screenHeight/2,10); 
    //     //I know that theoretically, half of that, but I want more
    //     const sh = screenHeight/2-h;
    //     noStroke();;
    //     fill(c);
    //     rect(screenWidth/2 + i*dx, sh, dx, 2*h);
    // }
    //this keeps equal angle diffrence
    //fill(255);
    // /rect(screenWidth/2,0,screenWidth/2,screenHeight);
    const delta = FOV/resolution;
    const dx = screenWidth/(2*resolution);
    for (let i = 0; i < player.rays.length; i++) {
        const dist = player.rays[i].simulate();
        const adjustDist = cos(abs(player.rays[i].a-player.a)) * dist;
        //console.log(adjustDist);
        const c = 2500/adjustDist;
        const h = 2500/adjustDist;
        const sh = screenHeight/2-h;
        noStroke();
        fill(c);
        rect(screenWidth/2 + i*dx, sh, dx, 2*h)
        //console.log(screenWidth/2 + i*dx, sh, dx, 2*h);
    }
}