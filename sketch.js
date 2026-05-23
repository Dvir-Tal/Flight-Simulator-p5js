let video;
let airplane;
let slideX = 245;
let img;
let pattern;
let myRadio;
let keyType;
let keys;
let turnAngle = 0;
let adjustAngle = 0.5;
let videoSpeed = 1;
let cooldownR = 0;
let cooldownL = 0;
let audio;
let volume = 0;

function preload() {
  video = createVideo('media/sky.mp4');
  airplane = loadModel('media/airplane.obj', true);
  img = loadImage("media/israelFlag.jpg");
  audio = loadSound("media/airplaneSound.mp3");
  
}

function setup() {
  createCanvas(630, 630, WEBGL); 
  pattern = createGraphics(2048, 2048); 
  for (let x = 0; x < pattern.width; x += img.width) {
    for (let y = 0; y < pattern.height; y += img.height) {
      pattern.image(img, x, y);
    }
  }
  myRadio = createRadio();
  myRadio.position(630, 20);
  myRadio.size(60);
  myRadio.option('ARROWS');
  myRadio.option('WASD');
  myRadio.selected('ARROWS');

  video.hide();
  video.loop();
  
  audio.setVolume(0);
  audio.loop();
}

function draw() {
  // drawing the airplane
  lights(); 
  push();
  rotateX(radians(240)); 
  rotateY(radians(180 + turnAngle));
  rotateZ(radians(0));
  scale(0.75);
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
  textureMode(NORMAL);
  texture(pattern); 
  noStroke();
  model(airplane);
  pop();
  
  // showing the video
  if (video) {
    translate(0,0,-30);
    image(video, -315, -315, 630, 630, slideX, 0, 630, 630);
  }
  
  moveAirplane();
}

function moveAirplane(){
  // switching between arrows and WASD
  keyType = myRadio.value();
  if (keyType == "ARROWS")
    keys = [UP_ARROW,DOWN_ARROW,RIGHT_ARROW,LEFT_ARROW];
  else if (keyType == "WASD")
        keys = [87,83,68,65];
  
  // up
  if (keyIsDown(keys[0])){
    videoSpeed = min(videoSpeed + 0.05, 5);
    volume = min(volume + 0.001, 0.5);
    audio.setVolume(volume);
  }
  else{
    videoSpeed = max(videoSpeed - 0.05, 1);
    volume = max(volume - 0.005, 0);
    audio.setVolume(volume);
  }
  
  // // down
  // if (keyIsDown(keys[1])){
  //   videoSpeed = max(videoSpeed - 0.5, -200);
  // }
  // else{
  //   videoSpeed = min(videoSpeed + 0.5, 1);
  // }
  
  video.speed(videoSpeed);
  
  // right
  if (keyIsDown(keys[2])) {
    slideX = min(slideX + 1, 490);
    turnAngle = max(turnAngle - adjustAngle, -60);
    cooldownR = 0;
    cooldownL = -Infinity;
  }
  else if (keyIsDown(keys[2]) == false) {
    cooldownR += 1;
    if (cooldownR >= 10) {
      turnAngle = min(turnAngle + adjustAngle, 0);
    }
  }
  
  // left
  if (keyIsDown(keys[3])) {
    slideX = max(slideX - 1, 0);
    turnAngle = min(turnAngle + adjustAngle, 60);
    cooldownL = 0;
    cooldownR = -Infinity;
  }
  else if (keyIsDown(keys[3]) == false) {
    cooldownL += 1;
    if (cooldownL >= 10) {
      turnAngle = max(turnAngle - adjustAngle, 0);
    }
  }
}