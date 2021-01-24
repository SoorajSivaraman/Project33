var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var particle;
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var divisionPos = [];
var score = 0;
var count = 0;
var gameState = "play";
var generateParticle = true;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 8, divisionHeight));

   }
    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 
function draw() {
  if(gameState === "play")
  {
  background(color(200, 227, 27));
  fill(color(156, 21, 214)); 
  textFont("Lucida Calligraphy")
  textSize(20)
  text("Score : "+score,20,30);
  fill(color(25, 74, 23))
  text("500      400      300       200      100       100       200      300      400       500", 22, 550);
  text("Shots Left: " + (5 - count), 600, 30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {

     divisions[k].display();
   }
   ground.display();
   if(particle != null)
   {
     if(particle.body.position.y > 760)
     {
       generateParticle = true;
       incrementScore(particle.body.position.x);
       particle = null;
       if(count === 5) gameState = "end";
     }
   }
}
else 
{
   background(color(255, 247, 140));
   {
     fill(color(59, 41, 18));
     textSize(30);
     text("Game Over !! You have Scored " + score + " points.", 60, 400);
   }
}
}

function mousePressed()
{
  if(generateParticle === true)
  {
    if(mouseY < 55 && (mouseX > 50 && mouseX < 775))
    {
      if(count <= 4)
      {
        generateParticle = false;
        particle = new Particle(mouseX, mouseY, 10);
        particles.push(particle);
        count = count + 1;
      } 
    }
  }
}

function incrementScore(particleXPos)
{
  if((particleXPos > divisions[0].body.position.x && particleXPos < divisions[1].body.position.x) ||
     (particleXPos > divisions[9].body.position.x && particleXPos < divisions[10].body.position.x))
  {
    score = score + 500;
  }

  else if((particleXPos > divisions[1].body.position.x && particleXPos < divisions[2].body.position.x) ||
     (particleXPos > divisions[8].body.position.x && particleXPos < divisions[9].body.position.x))
  {
    score = score + 400;
  }

  else if((particleXPos > divisions[2].body.position.x && particleXPos < divisions[3].body.position.x) ||
     (particleXPos > divisions[7].body.position.x && particleXPos < divisions[8].body.position.x))
  {
    score = score + 300;
  }

  else if((particleXPos > divisions[3].body.position.x && particleXPos < divisions[4].body.position.x) ||
     (particleXPos > divisions[6].body.position.x && particleXPos < divisions[7].body.position.x))
  {
    score = score + 200;
  }

  else if((particleXPos > divisions[4].body.position.x && particleXPos < divisions[5].body.position.x) ||
     (particleXPos > divisions[5].body.position.x && particleXPos < divisions[6].body.position.x))
  {
    score = score + 100;
  }
}