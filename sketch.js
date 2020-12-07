var END=0;
var PLAY=1;
var gameState=PLAY;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup

var ground;
var survival_time=0; 
var score=0;
var restart;
var restartImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadAnimation('monkey_collided.png');
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 restartImage=loadImage('restart.png');
}



function setup() {
   createCanvas(500,400); 
  ground=createSprite(250,370,500,15);
    monkey=createSprite(120,320,15,15);
    monkey.addAnimation('running',monkey_running);
  monkey.addAnimation('collided',monkey_collided);
    monkey.scale=0.15
    FoodGroup= new Group();
    obstaclesGroup= new Group();
  restart=createSprite(250,200,15,15);
  restart.addImage(restartImage);
  
}


function draw() {
      background('skyblue');
      
  monkey.depth=obstaclesGroup.depth;
if(gameState===PLAY){
  restart.visible=false;
  survival_time=survival_time + Math.ceil(getFrameRate()/100)
  food();
      obstacles();
 
 ground.velocityX=-5;
      if(ground.x<250){
    ground.x=250;
      }
      monkey.collide(ground);
      if(keyDown('Space') && monkey.y>300){
        monkey.velocityY=-12;      
      }
      monkey.velocityY=monkey.velocityY+0.5;
      
      if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
        score=score+1;
      }
  if(monkey.isTouching(obstaclesGroup)){
        gameState=END;
    
     
      }
}
 else if(gameState===END){
   ground.velocityX=0;
      monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(0);
   FoodGroup.setLifetimeEach(0);
    restart.visible=true;
   monkey.changeAnimation('collided',monkey_collided);
}
  if(mousePressedOver(restart) && gameState===END){
   reset();
    score=0;
   survival_time=0;
    monkey.changeAnimation('running',monkey_running);
  }
  
 obstaclesGroup.debugEach=true;
  
      textSize(23);
      fill('blue');
      textFont('Arial Rounded MT');
      text('Survival Time:'+survival_time,30,40);
  fill('red');
  text('Score:'+score,280,40);
  //monkey.debug=true;
      
      monkey.depth=obstaclesGroup.depth;
 obstaclesGroup.setColliderEach('rectangle',0,0,60,obstaclesGroup.width,obstaclesGroup.height)
      
    drawSprites();

}
 function reset(){
    gameState=PLAY;
    
    
  }
function food(){
  if(frameCount%80===0){
    var banana=createSprite(500,Math.round(random(120,200)),15,15);
    //banana.debug=true;
banana.velocityX=-4;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    FoodGroup.add(banana);
    
    
  }  
}
 function obstacles(){
   if(frameCount%130===0){
var obstacles=createSprite(500,315,15,15);
     obstacles.velocityX=-4;
     obstacles.debug=true;
     
     obstacles.setCollider('rectangle',0,0,40,obstacles.width,obstacles.height)
     obstacles.addImage(obstaceImage);
     obstacles.scale=0.25;
   obstaclesGroup.add(obstacles);
   
   
   
   }
   
   
   
 }




