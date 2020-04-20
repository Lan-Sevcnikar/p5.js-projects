function mouse() {
	if (mouseIsPressed){
        var x = floor((mouseX) / l);
        var y = floor((mouseY) / l);
        //shown[x][y] = 1;
        if (grid[x][y] == -1){over = 1;}
        revel(x,y);
    }
}

function sip() {
    	if (mouseIsPressed){
        for (var i = 0; i < siz; i++){
            for (var v = 0; v < siz; v++){
                grid[i][v] = 0;
                shown[i][v] = 0;
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

        over = 0;
    }
}
