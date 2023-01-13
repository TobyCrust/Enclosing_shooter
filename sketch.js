var mode;
let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 850/2;
let turPosY = 700/2;
let targetTimer = 0;
let balloonSpawnMultiplier = 2;
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
	gamesong = loadSound('GameTheme.mp3');
 	gameover = loadSound('gameover.mp3');

	angleMode(DEGREES);
	mainTurrent = new turrent(0,0);
	Retry = createButton('retry');
	Retry.hide();


	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}


function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
	song.play();


}

function preload() {
  rocket= loadImage('rocket.png');
	ufo= loadImage('UFO V2.png');
	for (let i = 0; i< 2; i++){
	asteroids[i] = loadImage('asteroid' + i + '.png');
	explosion = loadImage('explosion.gif')

	}
	// asteroids[0] = loadImage('asteroid 3.png');
	// asteroids[1] = loadImage('asteroid 1.png');
	sounds.push(loadSound('bangLarge.wav'));
	sounds.push(loadSound('bangMedium.wav'));
	sounds.push(loadSound('bangSmall.wav'));
}

function draw() {
clear();
spin += 0.4*balloonSizeMultiplier;
if (mode==0) {
	text('presss Enter to start', 350, 350);
}

if (mode==1) {


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
	let spawnInterval = int(100 / balloonSpawnMultiplier);
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

	balloonSpawnMultiplier += 0.001;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.0007;
	}

	//------------------------------------------HERO-AND-HERO-DED---------------------------------------a
	mainTurrent.display();
	mainTurrent.move();
	if (mainTurrent.hitScan()){
		gameOver();
	}



  fill(225);
  textAlign(LEFT);
  textSize(30);
  text(score,455,40);

  textSize(24);

  text("Score",385,40);



	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 500){
		textAlign(LEFT);
		textFont('Arial');
		textSize(14);

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
