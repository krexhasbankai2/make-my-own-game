//person getting chased by ghost and they have to go through different obstacles and try to not get caught
var boy;
var ghost;
var bgImage,boyImage,ghostImage,obstaclesImage;
var ground;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var ogroup;
var gameOverImg,restartImg;
var score;
var counter=0


 





function preload(){
//add different images
bgImage=loadImage("bgImage.gif")
boyImage=loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png","m9.png")
ghostImage=loadImage("ghostImage.png")
obstaclesImage=loadImage("obstaclesImage.jpg")
restartImg = loadImage("restart.png")
gameOverImg=loadImage("gameOverImg.jpg")
boystop=loadAnimation("m1.png")

}


function setup() {
  createCanvas(1200,800);
  bg=createSprite(600,400,1500,800)
  bg.addImage(bgImage)

  bg.scale=2.4
 
//place the ghost and player at random positions.

ground=createSprite(600,750,1200,10)
boy=createSprite(300,650,20,50)
boy.addAnimation("boyImage",boyImage)
boy.addAnimation("boystop",boystop)
boy.scale=1.5
ghost=createSprite(100,630,20,50)
ghost.addImage(ghostImage)
ghost.scale=0.2




gameOver = createSprite(600,450);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;

restart = createSprite(600,490);
restart.addImage(restartImg);
restartImg.scale=0.5;


boy.setCollider("circle",0,20,20);
  boy.debug = true
  score = 0;
ogroup=new Group()

}


function draw() {
background("white")


if(gamestate===PLAY){
  score=score+Math.round(frameCount/240)

  gameOver.visible = false;
  restart.visible = false;
  bg.velocityX=-4
  console.log(boy.y)


//create an infinite scrolling background
  if(bg.x<300){
    bg.x=width/2
  }
    //make the boy jump
  if(keyDown("space")&& boy.y>684){
    boy.velocityY=-13
  }
  //gravity added when player jumps
  boy.velocityY+=0.3
  spawnObstacles()
  if(ogroup.isTouching(boy)){
    gamestate=END;
    
  }

  
}

else if(gamestate===END){
bg.velocityX=0
ogroup.setVelocityXEach(0)

  gameOver.visible = true;
  restart.visible = true;
  //ground.velocityX = 0;
      boy.velocityY = 0
      //boy.velocityX = 0
      boy.changeAnimation("boystop",boystop)
    if(counter===0){
      counter=1
     }
     if(counter==1 && mousePressedOver(restart)){
      ghost.x=ghost.x+10
      
      
     }
      

        //set lifetime of the game objects so that they are never destroyed
    ogroup.setLifetimeEach(-1);
   ogroup.setVelocityXEach(0);
     
}
//spawn obstacles
if(mousePressedOver(restart)) {
  reset();
  console.log(gamestate)

//distance reduced between ghost and player when player touches obstacles
}
//ghost won't touch the floor he should be floating from the ground
boy.collide(ground)
drawSprites()
text("Score: "+ score, 500,50);


}

function spawnObstacles(){
  if (frameCount % 110 === 0) {
     var obstacle = createSprite(1200,720,10,100);
    obstacle.addImage("obstacle",obstaclesImage)
    obstacle.scale=0.2;
    obstacle.velocityX = -(6 + score/100);
  obstacle.lifetime=600;
   obstacle.velocityX = -3;
  ogroup.add(obstacle)
  }
}

function reset(){
  gamestate=PLAY;
  counter=0
  boy.changeAnimation("boyImage",boyImage)
  ogroup.destroyEach()

}