"use strict";
// Initialize Global variables
let finalCount = 0,
	activity = 3,
	livesLeft = document.querySelector('.activity > span'),
	result = document.querySelector('.result > span');

// Enemies our player must avoid
class Enemy {
	constructor(x, y, action) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		this.x = x;
		this.y = y;
		this.action = action;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any action by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += this.action * dt;
		livesLeft.innerText = activity;

		// Restarts enemy action from the left when Player reaches the water
		if (this.x > 505) {
			this.x = -150;
			//Controls the enemy action speed
			this.action = 150 + Math.floor(Math.random() * 800);

		}

		// Checks collisons and restarts player at the bottom
		if (player.x < this.x + 60 &&
			player.x + 37 > this.x &&
			player.y < this.y + 25 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			activity--;
			livesLeft.innerText = activity;
			if (activity === 0) {
				confirm(`Game Over! Do you want to play again?`);
				activity = 3;
				finalCount = 0;
				livesLeft.innerText = activity;
				result.innerText = '';
			}
		}
	};
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, action) {
		this.x = x;
		this.y = y;
		this.action = action;
		this.sprite = 'images/char-boy.png';
	}
	update() {
		// Stops Player from moving off the left/right side of canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}

		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			finalCount++;
			result.innerText = finalCount * 100;
			if (finalCount === 5 && activity > 0) {
				confirm('congratulations..You won the game!');
				activity = 3;
				finalCount = 0;
				livesLeft.innerText = activity;
				result.innerText = '';
			}
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Moves Player with keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
				this.x -= this.action + 50;
				break;
			case 'up':
				this.y -= this.action + 30;
				break;
			case 'right':
				this.x += this.action + 50;
				break;
			case 'down':
				this.y += this.action + 30;
				break;
		}
	}
}
// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, action
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
