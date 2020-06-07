class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    tanker1 = createSprite(100,200);
    tanker1.addImage("tanker1",tanker1_img);
    gun1 = createSprite(100,200);
    gun1.addImage("gun1",gun1_img);
    tanker2 = createSprite(300,200);
    tanker2.addImage("tanker2",tanker2_img);
    gun2 = createSprite(300,200);
    gun2.addImage("gun2",gun2_img);
    cars = [tanker1, tanker2];
    gun = [gun1,gun2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        gun[index-1].x = x;
        gun[index-1].y = y;
       //console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4500){
      gameState = 2;
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
    }
   this.spawnenemies()
    drawSprites();
  }
 spawnenemies(){
   if(World.frameCount%200===0){
     var enemy=createSprite(random(100,displayWidth-100),-displayHeight*5)
     var Egun = createSprite(enemy.x,enemy.y)
     enemy.addImage(enemy_img)
     enemy.velocityY=7
     Egun.addImage(gun1_img)
     Egun.velocityY=7
   }
 }
  end(){
    console.log("Game Ended");
    console.log(player.rank)

  }
}
