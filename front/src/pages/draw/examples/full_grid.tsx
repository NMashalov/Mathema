function setup() {
    createCanvas(100, 100);
    background(255);
    fill(150);
    stroke(150);
}

function draw() {
    var r = frameCount % 200 * Math.sqrt(2);
    background(255);
    ellipse(0, 0, r, r);
}function setup() {
  w = min(windowWidth, windowHeight)
  createCanvas(w, w);
  
  pad = w/12;
   
  gridDivsX = 15
  gridDivsY = 15
	
	strokeWeight(4)
  
  gridSpacingX = (w-pad*2)/gridDivsX
  gridSpacingY = (w-pad*2)/gridDivsY
  
  grid = []
  for(let i = 0; i <= gridDivsX ; i++){
    col = []
    for(let j = 0; j <= gridDivsY ; j++){
      
      var x = map(i,0,gridDivsX, pad, w-pad) 
      var y = map(j,0,gridDivsY, pad, w-pad)
      
      col.push([x+random(-10, 10), y+random(-10, 10)])
    }
    grid.push(col)
  }
  
}

function draw() {
  background(0);
  stroke(255)
  
  
  for(let i = 0; i <= gridDivsX ; i++){
    for(let j = 0; j <= gridDivsY ; j++){
      
      var x = grid[i][j][0]
      var y = grid[i][j][1]
      
      strokeWeight(3)
      point(x, y)
    
      strokeWeight(1)
      if(i<gridDivsX){
        var xn = grid[i+1][j][0]
        var yn = grid[i+1][j][1]
        line(x,y,xn,yn)
      }
  
      if(j<gridDivsY){
        var xn = grid[i][j+1][0]
        var yn = grid[i][j+1][1]
        line(x,y,xn,yn)
      }
      
    }
  }
  
  noLoop()
}