var arjun,virus,vaccine;
var virusGroup,vaccineGroup,bg,virusimg,arjunimg,vaccineImg;
var PLAY=1,END=0,gameState=PLAY;
var SCORE=0;

function preload(){

  bg = loadImage("photos/city.png");
  virusimg = loadImage("photos/corona.png");
  arjunimg = loadImage("photos/arjun.png");
  vaccineImg = loadImage("photos/vaccine.png");

}

function setup(){

  canvas=createCanvas(1000,600);

  arjun=createSprite(50,300,20,60);
  arjun.addImage(arjunimg);
 // arjun.setCollider("rectangle",0,0,30,200);
  arjun.debug=true;
  arjun.scale=0.1;

  virusGroup=new Group();
  vaccineGroup=new Group();


}

function draw()
{

  background(bg);

  if(gameState===PLAY)
  {
    if(keyDown(UP_ARROW)){
      arjun.y=arjun.y-5;
     }
     if(keyDown(DOWN_ARROW)){
      arjun.y=arjun.y+5;
     }
     if (keyDown("space")) {
       createVaccine();  
     }
   
     spawnVirus();

     if(virusGroup.isTouching(vaccineGroup)){
      virusGroup.destroyEach();
      SCORE+=1;
      

     }

    if(virusGroup.isTouching(arjun)){
      gameState=END;
   }
   console.log(gameState);
  } 
  else if(gameState===END){
   
  arjun.destroy();
  virusGroup.destroyEach();
  textSize(32);
  strokeWeight(3);
  fill(0);  
  text("Game Over",330,250);
  text("you are infected",290,275);
  text("wear mask to protect yourself and others",150,300);
  

  }

  drawSprites();

  textSize(25)
  fill(0)
  text("Score:"+SCORE,900,20);
  

}

function spawnVirus(){
  if(frameCount % 60 === 0) {
    var virus = createSprite(1000,300,10,40);
    //obstacle.debug = true;
    virus.velocityX = -9;
    virus.y = Math.round(random(80,420));
    
    //assign scale and lifetime to the obstacle
    virus.addImage(virusimg);           
    virus.scale = 0.03;
    virus.lifetime = 300;
    //add each obstacle to the group
    virusGroup.add(virus);
  }

}

function createVaccine(){

  vaccine=createSprite(50,300,20,20);
  //vaccine.addImage(arrowImage);
  vaccine.addImage(vaccineImg);
  vaccine.y=arjun.y;
  vaccine.velocityX = +8;
  vaccine.lifetime = 300;
  vaccine.scale = 0.03;
  vaccineGroup.add(vaccine);
  return vaccine;

}



