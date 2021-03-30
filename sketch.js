//problem in jumping of monkey
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}




function setup() {
  createCanvas(400, 400);

  
  
  monkey = createSprite(80,180,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
 
  
  ground = createSprite(400,380,900,20);
  ground.x = ground.width /2;
  ground.velocityX=-4;
  
  
 
  
  //create Obstacle and Cloud Groups
  obstacleGroup = new Group();
  bananaGroup =  new Group();

  
  
  
  survivalTime= 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("SurvivalTime: "+ survivalTime, 500,50);
  
  


    
    
    //scoring
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    //score=Math.round(frameCount/60)
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbananas();
  
    //spawn obstacles on the ground
    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
        monkey.velocityY = 0;
        ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
       bananaGroup.setLifetimeEach(-1);
    }
  
  
    
  
 
  //stop trex from falling down
  monkey.collide(ground);


  drawSprites();
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  survivalTime=0;
}


function spawnObstacle(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,360,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage("obstacle",obstacleImage);
   
   
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,330));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX=-4
    
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
    
    //add each cloud to the group
    
  }
}


