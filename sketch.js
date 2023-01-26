var mode;
var pxlfont;
let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 850/2;
let turPosY = 700/2;
let targetTimer = 0;
let balloonSpawnMultiplier = 1; //speed
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;
var sounds = [];
let highScore = 0;
var stars = [];
var playerSpeed = 2;
let angle = 0;
let asteroids = [];
let wen;
let spin =0;
let enemyAmount = 200;
let Start;
var deathPhrase = ["YOU DIED", "GAME OVER", "YOU BLEW UP", "BETTER LUCK NEXT TIME", "YOU SUCK"];
var gameVolume = 1;

function setup() {

	wen = 0;

	// wen = floor(random(0,1));
	createCanvas(850, 700);
	rectMode(CENTER);
	imageMode(CENTER);
	mode = 0;

	for (var i = 0; i < 500; i++) {
			stars[i] = new Star();
		}

	song = loadSound('shoot_effect.mp3');

 	gameover = loadSound('gameover.mp3');

	angleMode(DEGREES);
	mainTurrent = new turrent(0,0);

	Retry = createButton('Respawn');
	Retry.hide();
	Start =  createButton('Start');
	Start.size(320,100);
	Start.style('background-color', '#ff000000');
	Start.position(265, height/2+70);
	// Start.style()


	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}

// function words(){
// 	createP('words');
// }

function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
	song.play();


}

function preload() {
	titlepage = loadImage('Homepage.png');
  rocket= loadImage('rocket.png');
	ufo= loadImage('UFO V2.png');
	pxlfont = loadFont('PressStart2P.ttf');
	for (let i = 0; i< 2; i++){
	asteroids[i] = loadImage('asteroid' + i + '.png');
	explosion = loadImage('explosion.gif')
	gamesong = loadSound('GameTheme.mp3');


	}
	// asteroids[0] = loadImage('asteroid 3.png');
	// asteroids[1] = loadImage('asteroid 1.png');
	sounds.push(loadSound('bangLarge.wav'));
	sounds.push(loadSound('bangMedium.wav'));
	sounds.push(loadSound('bangSmall.wav'));
}

function draw() {
clear();
image(titlepage, width/2, height/2, 850, 700);
Start.mousePressed(startGame); // butto to start game. will have to hide it under the other buttons
spin += 0.4*balloonSizeMultiplier;
textFont(pxlfont);
textSize(30);
gamesong.setVolume(gameVolume-0.3);
if (mode==0) {
	text('Press Enter to start', 150, 350);
	Start.show();
}

if (mode==1) {
Start.hide();


	background(27,26,26);

	for (var i = 0; i < stars.length; i++) {
			stars[i].draw();
		}

	// push();
  // translate(100, 100);
  // rotate(angle);
  // fill('red');
  // rect(0, 0, 50, 50);
  // pop();
	// angle += 1;

let s = second();

	drawReticle();

	// rocket ship with mouse example
// push();
// 	angleMode(DEGREES);
// 	       imageMode(CENTER)
// 	       let a = atan2(mouseY - height / 2, mouseX - width / 2);
// 	       translate(width/2, height/2);
// 	       rotate(a);
// 	       image(rocket, 0, 0, 48, 26);
// pop();
  print(score);

	//----------------------------------------BALLOONS-SPAWN--------------------------------------
	targetTimer += 1;
	let spawnInterval = int(enemyAmount / balloonSpawnMultiplier);
	//print(spawnInterval)
	if (targetTimer % spawnInterval == 0){
		let newBalloon = new balloon();
		targetBalloons.push(newBalloon);

		score += 5;
	}


	//----------------------------------------------BULLETS----------------------------------------
	for (var i = 0; i < bulletsFired.length; i++){
		bulletsFired[i].display();
		bulletsFired[i].update();
		if (bulletsFired[i].outOfBounds()){
      		bulletsFired.splice(i,1);
    	}
		else if (bulletsFired[i].hitScan()){
      		bulletsFired.splice(i,1);
    	}
	}


	//-------------------------------------------EVIL-BALLOONS----------------------------------------
	for (var i = 0; i < targetBalloons.length; i++){
		targetBalloons[i].display();
		targetBalloons[i].update();
		if (targetBalloons[i].outOfBounds()){
      		targetBalloons.splice(i,1);
    	}
	}

	balloonSpawnMultiplier += 0.0005; //speed
	enemyAmount -= 0.015;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.0002;
		gameVolume = 1;
	}

	//------------------------------------------HERO-AND-HERO-DED---------------------------------------a
	mainTurrent.display();
	mainTurrent.move();
	if (mainTurrent.hitScan()){
		gameOver();
	}

	//------------------------------------------Score---------------------------------------a

	textFont(pxlfont);
	textSize(18);
	fill(225);
	textAlign(CENTER);
	text(score,425,70,);
	textSize(24);
	text("Score",425,40);


	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 500){
		textAlign(LEFT);
		textFont('Arial');
		textSize(68);
		text("arrow keys or wasd: move", 35, 35);
		text("mouse: aim", 35, 50);
		text("left click: fire", 35, 65);
	}

	}
}

// draw ends -----------------------------------------------------


function keyPressed(){
	if (keyCode==ENTER){
		mode=1;
		// setTimeout(words,3000);

		gamesong.play();
		gameover.stop();
	}
}



	class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}

	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 1;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

//------------------------------------------Score------------------------------------------------
