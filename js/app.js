// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // reset enemy with new speed after going offscreen 
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision();
};

// Speed Multiplier
var speedMultiplier = 40;

// Random speed generator
Enemy.prototype.randomSpeed = function (){
    // Speed is a random number from 1-10 times speedMultiplier
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen
// Write lives that player has
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("Lives: " + player.playerLives, 255, 70);
};

// Check for collision
Enemy.prototype.checkCollision = function() {
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects enemyBox, we have one
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Collision detected, decrement playerLives and reset the player
Enemy.prototype.collisionDetected = function() {
    player.playerLives -= 1;
    player.characterReset();
};


/***** Lives  *****/


var Heart = function(x,y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
    this.heartWaitTime = undefined;
};

// Update heart, call checkCollision
Heart.prototype.update = function() {
    "use strict";
    this.checkCollision();
};

// Draw the heart on the screen
Heart.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision
Heart.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var heartBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects heartBox, we have one
    if (playerBox.x < heartBox.x + heartBox.width &&
        playerBox.x + playerBox.width > heartBox.x &&
        playerBox.y < heartBox.y + heartBox.height &&
        playerBox.height + playerBox.y > heartBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Heart collision detected, hide the heart off canvas,
// Increment player lives, wait 10 seconds, then reset the heart
Heart.prototype.collisionDetected = function() {
    "use strict";
    this.x = 900;
    this.y = 900;
    player.playerLives += 1;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
Heart.prototype.wait = function() {
    this.heartWaitTime = setTimeout( function() {
        heart.heartReset(); 
    }, 10000);
};

// Reset the heart to a new location
Heart.prototype.heartReset = function() {
    "use strict";
    //Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    //Hearts appear at one of the following Y positions: 70, 155, 240
    this.y = (70 + (85 * Math.floor(Math.random() * 3) + 0));
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


/***** Player *****/


var Player = function() {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/girl3.png';
    this.playerLives = 3;
};

// if playerLives = 0, reset() 
Player.prototype.update = function() {
    if (this.playerLives === 0) {
        reset();
    }
};

// Reset player position to the start position 
Player.prototype.characterReset = function() {
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
};

// Draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player according to keys pressed
Player.prototype.handleInput = function(allowedKeys) {
    'use strict';
    switch (allowedKeys) {
        case "left":
            //check for wall, otherwise move left
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":
            //check for wall, otherwise move right
            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":
            //check if player reached water, reset his position
            // otherwise move up
            if (this.y < 0) {
                this.x = 200;
                this.y = 400;
                alert("YOU WON!");
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            //check for bottom, otherwise move down
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];

//startSpeed is a random number from 1-10 times speedMultiplier
//enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
for (var i = 0 ; i < 3 ; i++) {
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
// And at one of the following Y positions: 70, 155, 240
var heart = new Heart (101 * Math.floor(Math.random() * 4) + 0, 70 +
    (85 * Math.floor(Math.random() * 3) + 0));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var input = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', input);