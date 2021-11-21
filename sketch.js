/***
using package of gif to generate interactivities
1. load <script src="https://unpkg.com/p5.gif/dist/p5gif.min.js"></script> in index.html
2. load with p5Gif package in preload
- properties
   - gif.width / gif.height
   - gif.frames.length
   - gif.frames[val]
3. use oop class to indicate gif target
4. use nowframe and anilength to control showing frames
***/
let gifi;
let cats =[];
let numx=5;
let numy=5;

function preload() {
  gifi = new p5Gif.Gif('giphy.gif');
}

function setup() {
  //console.log(gifi)
  createCanvas(800, 800);
  for(let i = 0; i<numx;i+=1){
    for(let j = 0; j<numy;j+=1){
      cats.push(new gifobj( i*width/numx+width/numx/2,
                            j*height/numy+height/numy/2,
                            gifi,
                            3
                          ))
    }
  }
}

function draw() {
  background(0);
  cats.forEach((g)=>{
    g.display();
  })
}

class gifobj{
  constructor(x,y,gif,s=1){
    this.x=x;
    this.y=y;
    this.trigger=false;
    this.gif = gif;
    this.scale=s;
    
    this.nowframe=0;
    this.anilength = this.gif.frames.length;
  }
  display(){
    this.checkover();
    push();
      translate(this.x,this.y)
      image(this.gif.frames[int(this.nowframe)], 
            -this.gif.width*this.scale/2, -this.gif.height*this.scale/2,
            this.gif.width*this.scale,this.gif.height*this.scale
           );
    pop();
  }
  checkover(){
    if ( mouseX>this.x-this.gif.width*this.scale/2 &&
         mouseY>this.y-this.gif.height*this.scale/2 &&
         mouseX<this.x+this.gif.width*this.scale/2 &&
         mouseY<this.y+this.gif.height*this.scale/2){
      
      if (this.nowframe>=this.anilength-1){
        this.nowframe=0;
      }
      this.nowframe+=0.5;
    }
  }
}