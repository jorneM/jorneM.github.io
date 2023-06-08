let player;
let points = [];
let score = 0;
let lives = 3;
let playerImg;
let gif;
let fuelimg;
let scoresound;



function preload() {
  playerImg = loadImage('./8_bit_racer.png');
  fuelimg = loadImage('./hartje.gif');
  scoresound = loadSound('./sound_effect.mp3')
  gif = loadImage('./bg.gif');

}


function setup() {
  createCanvas(windowWidth /3 , windowHeight);

  // Create the player object
  player = new Player(width/2, height-100, 50, 50);
}

function draw() {
  // Set the background color
  background(gif);
  
  // Move the player
   player.move();
  
  // Display the player
  player.display();
  
  // Spawn points randomly
  if (frameCount % 60 === 0) {
    let point = new Point(random(width), 0, 20);
    points.push(point);
  }
  
  // Move and display the points
  for (let i = 0; i < points.length; i++) {
    points[i].move();
    points[i].display();
    // Check for collision with player
    if (points[i].collides(player)) {
      points.splice(i, 1);
      score++;
      //geluidjes
      lives++; // Give the player an extra life for getting an orb
      scoresound.play();
    } else if (points[i].y > height) {
      points.splice(i, 1);
      lives--; // Subtract a life for missing an orb
    }
  }
  
  // Display score
  textSize(32);
  fill(0);
  text("score: "+ score, 10, 30);
  
  // Display lives
  text("Lives: " + lives, 10, 70);
  
  //player has run out of lives
  if (lives <= 0) {
    // End the game
    textAlign(CENTER);
    textSize(64);
    text("Game Over!", width/2, height/2);
    noLoop();
  }
}
// waggie code
class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y - 50;
    this.w = w+20;
    this.h = h+30;
    this.speed = 8;
  }
  
  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += this.speed;
    }
  }
  
  display() {
    image(playerImg, this.x, this.y, this.w, this.h);
  }
}

class Point {
  constructor(x, y, w,h) {
    this.x = x;
    this.y = y;
    //this.r = r;
    this.w = w+50;
    this.h = h+50;
    this.speed = 2;
  }
  
  move() {
    this.y += this.speed;
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y += this.speed;
    }
  }
  
  display() {
    // image(fuelimg,this.x, this.y, this.r)

    image(fuelimg, this.x, this.y, this.w, this.h);
  }
  
  collides(player) {
    if (dist(this.x, this.y, player.x + player.w/2, player.y + player.h/2) <= (this.r + player.w/2)/2) {
      return true;
    } else {
      return false;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


