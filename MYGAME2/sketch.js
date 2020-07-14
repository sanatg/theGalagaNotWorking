var canvas;
var spacecraft,spaceCraft_Img;
var spaceCraft_Img2;
var startText,startTextI;
var playButton,playButtonI;
var chooseButton,chooseButtonI;
var spacecraftchoose1,spacecraftchoose2
var canvasImage;  
var obstacle1Group;
var obstacle2Group;
var obstacle3Group;
var obstacle1Img;
var obstacle2Img;
var obstacle3Img;
var bulletGroup;
var backButton,backButton_img;
var bullet;
var gameState;
var play = 1;
var end = 2;
var score = 0;
//var buttonImg;
function preload(){
    spaceCraft_Img = loadImage("./img/sprite_0.png");
    spaceCraft_Img2 = loadImage("./img/galaxian2.png");
    canvasImage = loadImage("./img/background.png");
    buttonImg = loadImage("./img/pngwave.png");
    obstacle1Img = loadImage("./img/enemy1.png");
    obstacle2Img = loadImage("./img/enemy2.png");
    obstacle3Img = loadImage("./img/enemy3.png");
    startTextI = loadImage("./img/galaga.png");
    playButtonI = loadImage("./img/startButton.png");
    chooseButtonI = loadImage("./img/chooseButto.png");
    backButton_img = loadImage("./img/back.png");
}
    

function setup(){
    canvas = createCanvas(displayWidth,displayHeight);
    spacecraft = createSprite(displayWidth/2,displayHeight-100,100,100);
    spacecraft.addImage(spaceCraft_Img);
    startText = createSprite(displayWidth/2,displayHeight-500,50,50);
    startText.addImage(startTextI);
    playButton = createSprite(displayWidth/2 -300,displayHeight-300,50,50);
    playButton.addImage(playButtonI);
    chooseButton = createSprite(displayWidth/2+200,displayHeight-300,50,50);
    chooseButton.addImage(chooseButtonI);
    spacecraftchoose1 = createSprite(displayWidth/2 -300,displayHeight-300,50,50);
    spacecraftchoose1.addImage(spaceCraft_Img);
    spacecraftchoose2 = createSprite(displayWidth/2+200,displayHeight-300,50,50);
    spacecraftchoose2.addImage(spaceCraft_Img2);
    backButton = createSprite(displayWidth/2-550,displayHeight-700,50,50);
    backButton.addImage(backButton_img);
    spacecraft.setCollider('circle',0,0,30);
    spacecraft.debug = true;
    buttonright = createButton("right");
    buttonleft = createButton("left");
    obstacle1Group = new Group();
    obstacle2Group = new Group();
    obstacle3Group = new Group();
    bulletGroup = new Group();
   // buttonright.addImage(buttonImg);
   // buttonleft = createSprite(displayWidth-1200,displayHeight-100,20,20);

}

function draw(){
    background(canvasImage);
    spacecraft.scale = 0.8;
    spacecraftchoose1.visible = false;
    spacecraftchoose2.visible = false;
    backButton.visible = false;
    console.log(gameState);
if(keyCode ===32){//spacebar
  gameState = play;
  startText.velocity.y = 3;
  playButton.velocity.y = 3;
  chooseButton.velocity.y=3;
}
if(keyCode ===83){//letter S
startText.visible = false;
playButton.visible = false;
chooseButton.visible = false;
spacecraft.visible = false;
spacecraftchoose1.visible = true;
spacecraftchoose2.visible = true;
backButton.visible = true;
}
if(keyCode === 66){//letter B
  spacecraftchoose1.visible = false;
  spacecraftchoose2.visible = false;
  startText.visible = true;
  playButton.visible = true;
  chooseButton.visible = true;
  spacecraft.visible = true;
}
obstacle1Group.debug = true;
obstacle2Group.debug = true;
obstacle3Group.debug = true;
    if(gameState === play){
    spawnobstacle1();
    spawnobstacle2();
    spawnobstacle3();
  //  spacecraft.position.x = mouseX;
  stroke(255);
  textSize(30);
  text("SCORE:"+score,displayWidth/2-50,displayHeight-700)
  buttonright.mousePressed(right);
  buttonleft.mousePressed(left);
  //  buttonright.scale = 0.1;
  
 if(bulletGroup.isTouching(obstacle1Group))
{
obstacle1Group.destroyEach();
score = score+100

}
if(bulletGroup.isTouching(obstacle2Group))
{
obstacle2Group.destroyEach();
score = score+60

}
if(bulletGroup.isTouching(obstacle3Group))
{
obstacle3Group.destroyEach();
score = score+30

}
if(spacecraft.position.x < 0){
  spacecraft.position.x = spacecraft.position.x+200
}
if(spacecraft.position.x > displayWidth){
  spacecraft.position.x = spacecraft.position.x-200
}
if(spacecraft.isTouching(obstacle1Group)){
  gameState = end;
}
if(spacecraft.isTouching(obstacle2Group)){
  gameState = end;
}
if(spacecraft.isTouching(obstacle3Group)){
  gameState = end;
}
}
else if(gameState === end){
  obstacle1Group.setVelocityYEach(0);
  obstacle2Group.setVelocityYEach(0);
  obstacle3Group.setVelocityYEach(0);
  obstacle1Group.setLifetimeEach(-1);
  obstacle2Group.setLifetimeEach(-1);
  obstacle3Group.setLifetimeEach(-1);
 // obstacle1Group.destroyEach();
  //obstacle2Group.destroyEach();
 // obstacle3Group.destroyEach();
 // bullet.lifetime = 0;
}
drawSprites();
//1. we want a spacecraft that should be controlled by the mouse
//2. we want a moving background 
//3. we want multiple obstacles of different types spawning at different places
}

function right(){
  spacecraft.position.x = spacecraft.position.x+60;
  //spawnbullet();
}
function left(){
  spacecraft.position.x = spacecraft.position.x-60;
 // spawnbullet();
}
function spawnbullet(){
  bullet = createSprite(spacecraft.position.x,spacecraft.position.y,2,30);
  bullet.setCollider('circle',0,0,15)
  bullet.velocity.y = -3;
  bullet.lifetime = 700;
  bulletGroup.add(bullet);
  
}
function spawnobstacle1(){
  if(frameCount % 300 === 0){
    var obstacle1 = createSprite(random(10,displayWidth),0,50,50);
    obstacle1.addImage(obstacle3Img);
    obstacle1.setCollider('circle',0,0,30)
    obstacle1.velocity.y = 3;
    obstacle1.lifetime = 1000;
    obstacle1Group.add(obstacle1);
    
  }
}
function spawnobstacle2(){
  if(frameCount % 200=== 0){
    var obstacle2 = createSprite(random(10,displayWidth),0,50,50);
    obstacle2.addImage(obstacle2Img);
    obstacle2.setCollider('circle',0,0,30)
    obstacle2.scale = 0.6;
    obstacle2.velocity.y = 3;
    obstacle2.lifetime = 1000;
    obstacle2Group.add(obstacle2);
  
  }
}

function spawnobstacle3(){
  if(frameCount % 100 === 0){
    var obstacle3 = createSprite(random(10,displayWidth),0,50,50);
    obstacle3.addImage(obstacle1Img);
    obstacle3.setCollider('circle',0,0,30)
    obstacle3.scale = 0.5
    obstacle3.velocity.y = 4;
    obstacle3.lifetime = 1000;
    obstacle3Group.add(obstacle3);

  }
}