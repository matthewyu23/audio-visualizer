var song;
var fft; 
var visualizerWidth = window.innerWidth/3;
var visualizerHeight = window.innerHeight/5;
var r = [41, 47, 255, 251, 208];
var g = [49, 85, 203, 230, 73];
var b = [62, 103, 63, 192, 49];
var specialNumber = 0; 


function preload(){

    song = loadSound("music.mp3")

}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    fft = new p5.FFT(0.8, 64);
    specialNumber = Math.trunc(Math.random()*5)
    
}

    

function draw() {
    background(r[specialNumber], g[specialNumber], b[specialNumber]);
    var spectrum = fft.analyze();
   console.log(spectrum);
   stroke(255);
    for(var i = 0; i < spectrum.length - 20; i++){
        var amp = spectrum[i];
        var y = map(amp, 0, 255, 0, visualizerHeight);
        var x = map(i, 0, spectrum.length, 0, visualizerWidth);
        //line(x, window.innerHeight, x, window.innerHeight - y);
        rect(x + visualizerWidth + ( visualizerWidth / spectrum.length)* 10, 2.5 * visualizerHeight - y, visualizerWidth / spectrum.length / 2, y, 20);
    }
    fill(255);
    rect(visualizerWidth + ( visualizerWidth / spectrum.length)* 10, 2.55 * visualizerHeight, map(song.currentTime(), 0, song.duration(), 0, visualizerWidth /1.35), visualizerHeight/30, 20);
}

function toggleSong(){
    if(song.isPlaying()){
        song.pause(); 
    } else{
        song.play(); 
    }

}

function keyPressed() {
    if (keyCode == 32) {
        toggleSong();
    }
    if (keyCode == 39) {
        specialNumber = Math.trunc(Math.random()*5)
    }
    
  }

  function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    visualizerWidth = window.innerWidth/3;
    visualizerHeight = window.innerHeight/5;
}