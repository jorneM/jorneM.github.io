// Declare global variables
let player;
let points = [];
let score = 0;
let lives = 3;
let playerImg;
let gif;
let fuelimg;
let scoresound;


function preload() {
  playerImg = loadImage('./ship.png');
  fuelimg = loadImage('./hartje.gif');
  scoresound = loadSound('./sound_effect.mp3')
  gif = loadImage('./bg5.png');

}



function setup() {
  // Create the canvas
  createCanvas(windowWidth/3, windowHeight);

  // Create the player object
  player = new Player(width/2, height-100, 50, 50, playerImg);
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
    let point = new Point(random(width), 0, 50, fuelimg);
    points.push(point);
  }

  // Move and display the points
  for (let i = points.length - 1; i >= 0; i--) {
    points[i].move();
    points[i].display();

    // Check for collision with player
    if (points[i].collides(player)) {
      points.splice(i, 1);
      score++;
      lives++; // Give the player an extra life for getting an orb
      scoresound.play();
    } else if (points[i].y > height) {
      points.splice(i, 1);
      lives--; // Subtract a life for missing an orb
    }
  }

  // Display the score
  textSize(32);
  fill(0);
  text("score: "+ score, 10, 30);

  // Display the number of lives
  text("Lives: " + lives, 10, 70);

  // Check if the player has run out of lives
  if (lives <= 0) {
    // End the game
    textAlign(CENTER);
    textSize(64);
    text("Game Over!", width/2, height/2);
    noLoop();
  }
}

class Player {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 8;
    this.image = img;
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
    image(this.image, this.x, this.y, this.w, this.h);
  }
}

class Point {
  constructor(x, y, size, img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 2;
    this.image = img;
  }

  move() {
    this.y += this.speed;
        if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y += this.speed;
    }
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
  }

  collides(player) {
    let playerCenterX = player.x + player.w / 2;
    let playerCenterY = player.y + player.h / 2;
    let pointCenterX = this.x + this.size / 2;
    let pointCenterY = this.y + this.size / 2;

    // Calculate the distance between the centers of the player and point
    let distanceX = abs(pointCenterX - playerCenterX);
    let distanceY = abs(pointCenterY - playerCenterY);

    // Check if the distance is within the sum of half the widths
    if (
      distanceX < (this.size / 2 + player.w / 2) &&
      distanceY < (this.size / 2 + player.h / 2)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

function windowResized() {
  // Resize the canvas when the window size changes
  resizeCanvas(windowWidth, windowHeight);
}
 