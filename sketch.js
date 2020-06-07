var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var tanker1_img,tanker2_img,tanker1,tanker2
var track, car1_img, car2_img, car3_img, car4_img;
var gun = [],gun1,gun2,gun1_img,gun2_img
function preload(){
  track = loadImage("../images/track.jpg");
  //car1_img = loadImage("../images/car1.png");
  //car2_img = loadImage("../images/car2.png");
  //car3_img = loadImage("../images/car3.png");
  //car4_img = loadImage("../images/car4.png");
  tanker1_img = loadImage("../PNG/Hulls_Color_A/Hull_01.png")
  tanker2_img = loadImage("../PNG/Hulls_Color_A/Hull_03.png")
  enemy_img = loadImage("../PNG/Hulls_Color_C/Hull_01.png")
  ground = loadImage("../images/ground.png");
  gun1_img = loadImage("../PNG/Weapon_Color_A/Gun_01.png")
  gun2_img = loadImage("../PNG/Weapon_Color_A/Gun_01.png")
  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
